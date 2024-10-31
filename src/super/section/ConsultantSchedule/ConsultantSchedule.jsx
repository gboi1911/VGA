import React, { useState, useEffect } from "react";
import { Button, Grid, Modal, Box, Text, Page, Calendar, Icon } from "zmp-ui";
import axios from "axios";
import { getTimeSlot } from "api/super";



export default function ConsultantSchedule({ userid }) {
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dialogVisible, setDialogVisible] = useState("");
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [slotBooked, setSlotBooked] = useState([]);
    const [idConsultantTime, setIdConsultantTime] = useState("");
    console.log('idConsultantTime:', idConsultantTime); // Kiểm tra xem idConsultantTime có thay đổi khi chọn slot không
    console.log("slotBooked:", slotBooked); // Kiểm tra xem slotBooked có thay đổi khi chọn slot không
    console.log('selectedTimeSlots:', selectedTimeSlots); // Kiểm tra xem selectedTimeSlots có thay đổi khi chọn slot không

    useEffect(() => {
        const fetchTimeSlots = async () => {
            try {
                const response = await axios.get('https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/timeslots');
                setTimeSlots(response.data.timeSlots);
            } catch (error) {
                console.error('Error fetching time slot:', error);
            }
        };
        fetchTimeSlots();
    }, []);
    useEffect(() => {
        const fetchTimeSlotSelected = async () => {
            try {
                const response = await axios.get('https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/consultation-days', {
                    params: {
                        day: selectedDate,
                        "consultant-id": userid
                    }
                });


                const consultationDay = response.data.consultationDay;

                if (consultationDay && consultationDay.length > 0) {
                    // Lấy consultationTimes từ phần tử đầu tiên của consultationDay
                    setSlotBooked(consultationDay[0].consultationTimes);
                    console.log("consultationDay:", consultationDay[0].consultationTimes);
                } else {
                    // Không có dữ liệu cho ngày đã chọn
                    setSlotBooked([]);
                }
            } catch (error) {
                console.error('Error fetching time slot:', error);
            }
        };

        fetchTimeSlotSelected();
    }, [selectedDate]);

    const handleDelete = async (idConsultantTime) => {
        try {
            debugger
            const response = await axios.delete(`https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/consultation-time/${idConsultantTime}`);
            console.log("Xóa lịch thành công:", response.data);
            setSlotBooked(prevSlots => prevSlots.filter(s => s.id !== idConsultantTime));
            setDialogVisible(false);
        } catch (error) {
            console.error('Error deleting consultation:', error);
        }
    };



    const handleDateChange = (date) => {
        setSelectedDate(date.toLocaleDateString('en-CA')); // Định dạng yyyy-MM-dd
    };

    const toggleTimeSlot = (slot) => {
        setSelectedTimeSlots((prevSlots) => {
            if (prevSlots.includes(slot)) {
                return prevSlots.filter(s => s !== slot);
            } else {
                return [...prevSlots, slot];
            }
        });
    };

    const handleCreate = async () => {
        // Dữ liệu với nhiều slot chọn
        console.log('handleCreate được gọi'); // Kiểm tra xem hàm có chạy
        debugger
        const formData = {
            "consultantId": userid,
            "day": selectedDate,
            "consultationTimes": selectedTimeSlots.map(slot => ({
                "timeSlotId": slot.id,
                "note": "string"
            }))
        };

        try {
            const response = await axios.post('https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/consultation-days', formData);
            if (response.status === 200) {
                debugger
                setDialogVisible("CreateSuccess");
            }
            console.log("Tạo lịch thành công:", response.data);
            // Cập nhật slotBooked với các slot vừa chọn
            setSlotBooked(prevSlots => [
                ...prevSlots,
                ...selectedTimeSlots.map(slot => ({
                    id: slot.id,                  // Đảm bảo có id để tìm kiếm slot dễ hơn
                    timeSlotId: slot.id,           // timeSlotId của slot mới
                    status: 0,                     // Đặt trạng thái thành 0 nếu slot được đặt mới
                    startTime: slot.startTime,     // Thêm thời gian bắt đầu
                    endTime: slot.endTime          // Thêm thời gian kết thúc
                }))
            ]);
            // set lại selectedTimeSlots về rỗng
            setSelectedTimeSlots([]);
            setDialogVisible(false);
        } catch (error) {
            console.error('Error creating consultation:', error);
            setSelectedTimeSlots([]);
        }
    };

    return (
        <Page hideScrollbar={false} style={{ marginTop: '0px', marginBottom: '0px', backgroundColor: "#f5f5f5", borderRadius: "8px" }} className='section-container'>
            <Calendar onSelect={handleDateChange} />
            <Grid space='1rem' columnCount={3} style={{ marginTop: '10px', justifyContent: 'center', textAlign: 'center' }}>
                {timeSlots.map(slot => {
                    // const bookedSlot = slotBooked.find(booked => booked.timeSlotId === slot.id);
                    const bookedSlot = slotBooked.find(booked => booked.timeSlotId === slot.id && booked.status === 0);
                    console.log('bookedSlot:', bookedSlot); // Kiểm tra xem bookedSlot có thay đổi khi chọn slot không
                    return (
                        <Button
                            onClick={() => {

                                if (bookedSlot?.status === 0) {
                                    // Nếu slot đã được đặt, mở modal Delete và lưu id
                                    setDialogVisible("Delete");
                                    setIdConsultantTime(bookedSlot.id); // Lấy id của slot đã đặt
                                } else {
                                    // Nếu slot chưa được đặt, chọn/bỏ chọn slot
                                    toggleTimeSlot(slot);
                                }
                            }}
                            key={slot.id}
                            style={{
                                borderRadius: '10px',
                                backgroundColor: selectedTimeSlots.includes(slot) ? '#e0e0e0' : '#FFFFFF', // nền sáng khi chọn
                                color: '#000000',  // chữ đen
                                padding: '10px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                border: '1px solid #ccc',
                                transition: 'background-color 0.2s',
                                marginRight: '10px',
                                marginLeft: '10px',
                                marginBottom: '10px',
                                opacity: (bookedSlot?.status === 0) ? 0.5 : 1,
                            }}
                            size="medium"
                        // disabled={slotBooked.some(booked => booked.timeSlotId === slot.id)}
                        >
                            <Text>{`${slot.startTime.slice(0, 5)}`}</Text>
                        </Button>
                    )
                })}
            </Grid>
            <Grid space='1rem' style={{ marginTop: '10px', justifyContent: 'end', display: 'flex' }}>
                <Box>
                    <Button
                        onClick={() => setDialogVisible("Create")}
                        size="medium"
                        style={{
                            width: '10px',
                            height: '50px',
                            borderRadius: '',
                        }}
                    // prefixIcon={<Icon icon="zi-plus" />}
                    >
                        <Icon icon="zi-plus" />
                    </Button>

                </Box>
            </Grid>
            <Box>
                <Modal
                    visible={dialogVisible === "Create"}
                    title="Ban có chắc chắn muốn Tạo lịch không?"
                    onClose={() => setDialogVisible(false)}
                    actions={[
                        {
                            text: "Hủy bỏ",
                            close: true,
                        },
                        {
                            text: "Tạo mới",
                            // close: true,
                            highLight: true,
                            onClick: () => {
                                handleCreate(); // Gọi handleCreate khi bấm "Tạo mới"
                            },
                        },
                    ]}
                    description={`Bạn đã chọn lịch vào ngày ${selectedDate} cho các khung giờ ${selectedTimeSlots.map(slot => `${slot.startTime.slice(0, 5)} - ${slot.endTime.slice(0, 5)}`).join(', ')}`}
                />
                <Modal
                    visible={dialogVisible === "CreateSuccess"}
                    title="Chúc mừng bạn đã tạo lịch thành công"
                    onClose={() => setDialogVisible(false)}
                    actions={[
                        {
                            text: "Đóng",
                            close: true,
                            justifyContent: 'center',
                        },
                    ]}
                />
                <Modal
                    visible={dialogVisible === "Delete"}
                    title="Bạn có chắc chắn muốn xóa lịch không?"
                    onClose={() => setDialogVisible(false)}
                    actions={[
                        {
                            text: "Hủy bỏ",
                            close: true,
                        },
                        {
                            text: "Xóa",
                            highLight: true,
                            onClick: () => {
                                handleDelete(idConsultantTime); // Gọi handleDelete khi bấm "Xóa"
                            },
                        },
                    ]}
                    description="Bạn đã chọn lịch đã đặt, bạn có chắc chắn muốn xóa không?"
                />
            </Box>
            <Box style={{ marginTop: '10px', borderTop: '1px dashed' }} />
            <Box >
                <Text.Header size='large'>
                    Lịch sử đặt lịch đã hoàn thành với học sinh ở ngày {selectedDate}
                </Text.Header>
                <Box
                    height="60px"
                    justifyContent="space-between"
                    style={{
                        borderLeft: "10px solid #22c55e", display: "flex", marginTop: "10px"
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: "column", // Sửa từ "collum" thành "column"
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '5px',
                            textAlign: 'center' // Căn giữa văn bản
                        }}
                    >
                        <Text size="medium" style={{ fontWeight: 'bold' }}>
                            Nguyen Van F
                        </Text>
                        <Text size="medium">
                            {selectedDate}
                        </Text>
                    </Box>

                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '5px',
                            padding: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        <Text style={{ backgroundColor: "#0284c7", padding: '10px', borderRadius: '10px', color: '#f9fafb' }} size="medium">
                            08:00 - 09:00
                        </Text>
                    </Box>
                </Box>
                <Box
                    height="60px"
                    justifyContent="space-between"
                    style={{
                        borderLeft: "10px solid #22c55e", display: "flex", marginTop: "10px"
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: "column", // Sửa từ "collum" thành "column"
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '5px',
                            textAlign: 'center' // Căn giữa văn bản
                        }}
                    >
                        <Text size="medium" style={{ fontWeight: 'bold' }}>
                            Nguyen Van A
                        </Text>
                        <Text size="medium">
                            {selectedDate}
                        </Text>
                    </Box>

                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '5px',
                            padding: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        <Text style={{ backgroundColor: "#0284c7", padding: '10px', borderRadius: '10px', color: '#f9fafb' }} size="medium">
                            10:00 - 11:00
                        </Text>
                    </Box>
                </Box>
                <Box
                    height="60px"
                    justifyContent="space-between"
                    style={{
                        borderLeft: "10px solid #22c55e", display: "flex", marginTop: "10px"
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: "column", // Sửa từ "collum" thành "column"
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '5px',
                            textAlign: 'center' // Căn giữa văn bản
                        }}
                    >
                        <Text size="medium" style={{ fontWeight: 'bold' }}>
                            Nguyen Van B
                        </Text>
                        <Text size="medium">
                            {selectedDate}
                        </Text>
                    </Box>

                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '5px',
                            padding: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        <Text style={{ backgroundColor: "#0284c7", padding: '10px', borderRadius: '10px', color: '#f9fafb' }} size="medium">
                            13:00 - 14:00
                        </Text>
                    </Box>
                </Box>
                <Box
                    height="60px"
                    justifyContent="space-between"
                    style={{
                        borderLeft: "10px solid #22c55e", display: "flex", marginTop: "10px"
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: "column", // Sửa từ "collum" thành "column"
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '5px',
                            textAlign: 'center' // Căn giữa văn bản
                        }}
                    >
                        <Text size="medium" style={{ fontWeight: 'bold' }}>
                            Nguyen Van C
                        </Text>
                        <Text size="medium">
                            {selectedDate}
                        </Text>
                    </Box>

                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '5px',
                            padding: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        <Text style={{ backgroundColor: "#0284c7", padding: '10px', borderRadius: '10px', color: '#f9fafb' }} size="medium">
                            17:00 - 18:00
                        </Text>
                    </Box>
                </Box>

            </Box>
        </Page >
    );
}
