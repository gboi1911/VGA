import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Modal,
  Box,
  Text,
  Page,
  Calendar,
  Icon,
  Input,
  Tabs,
  List,
  Avatar,
} from "zmp-ui";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { getTimeSlot } from "api/super";
import { getBookingConsul } from "api/expert";
import BookingCardConsultant from "../../../components/bookingCardConsultant";

import "./ConsultantSchedule.css";

export default function ConsultantSchedule({ userid }) {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dialogVisible, setDialogVisible] = useState("");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [slotBooked, setSlotBooked] = useState([]);
  const [idConsultantTime, setIdConsultantTime] = useState("");
  const [completeSchedule, setcompleteSchedule] = useState([]);
  const [googleMeetLink, setGoogleMeetLink] = useState("");
  const [bookings, setBookings] = useState([]);
  console.log("completeSchedule:", completeSchedule); // Kiểm tra xem completeSchedule có thay đổi khi chọn slot không
  console.log("idConsultantTime:", idConsultantTime); // Kiểm tra xem idConsultantTime có thay đổi khi chọn slot không
  console.log("slotBooked:", slotBooked); // Kiểm tra xem slotBooked có thay đổi khi chọn slot không
  console.log("selectedTimeSlots:", selectedTimeSlots); // Kiểm tra xem selectedTimeSlots có thay đổi khi chọn slot không

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get(
          "https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/timeslots"
        );
        setTimeSlots(response.data.timeSlots);
      } catch (error) {
        console.error("Error fetching time slot:", error);
      }
    };
    const fetchBookings = async () => {
      try {
        const response = await getBookingConsul(userid);
        setBookings(response.data.bookings);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };
    fetchBookings();
    fetchTimeSlots();
  }, []);
  useEffect(() => {
    const getCompleteSchedule = async () => {
      try {
        const response = await axios.get(
          "https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/bookings",
          {
            params: {
              day: selectedDate,
            },
          }
        );
        setcompleteSchedule(response.data.bookings);
      } catch (error) {
        console.error("Error fetching time slot:", error);
      }
    };
    if (selectedDate) {
      getCompleteSchedule();
    }
  }, [selectedDate]);

  useEffect(() => {
    const fetchTimeSlotSelected = async () => {
      try {
        const response = await axios.get(
          "https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/consultation-days",
          {
            params: {
              day: selectedDate,
              "consultant-id": userid,
            },
          }
        );

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
        console.error("Error fetching time slot:", error);
      }
    };

    fetchTimeSlotSelected();
  }, [selectedDate]);

  const handleDelete = async (idConsultantTime) => {
    try {
      const response = await axios.delete(
        `https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/consultation-time/${idConsultantTime}`
      );
      console.log("Xóa lịch thành công:", response.data);
      setSlotBooked((prevSlots) =>
        prevSlots.filter((s) => s.id !== idConsultantTime)
      );
      setDialogVisible(false);
    } catch (error) {
      console.error("Error deleting consultation:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.toLocaleDateString("en-CA")); // Định dạng yyyy-MM-dd
  };

  const toggleTimeSlot = (slot) => {
    setSelectedTimeSlots((prevSlots) => {
      if (prevSlots.includes(slot)) {
        return prevSlots.filter((s) => s !== slot);
      } else {
        return [...prevSlots, slot];
      }
    });
  };

  const handleCreate = async () => {
    // Dữ liệu với nhiều slot chọn
    console.log("handleCreate được gọi"); // Kiểm tra xem hàm có chạy
    const formData = {
      consultantId: userid,
      day: selectedDate,
      consultationTimes: selectedTimeSlots.map((slot) => ({
        timeSlotId: slot.id,
        note: googleMeetLink,
      })),
    };

    try {
      const response = await axios.post(
        "https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/consultation-days",
        formData
      );
      if (response.status === 200) {
        setDialogVisible("CreateSuccess");
      }
      console.log("Tạo lịch thành công:", response.data);
      // Cập nhật slotBooked với các slot vừa chọn
      setSlotBooked((prevSlots) => [
        ...prevSlots,
        ...selectedTimeSlots.map((slot) => ({
          id: slot.id, // Đảm bảo có id để tìm kiếm slot dễ hơn
          timeSlotId: slot.id, // timeSlotId của slot mới
          status: 0, // Đặt trạng thái thành 0 nếu slot được đặt mới
          startTime: slot.startTime, // Thêm thời gian bắt đầu
          endTime: slot.endTime, // Thêm thời gian kết thúc
        })),
      ]);
      // set lại selectedTimeSlots về rỗng
      setSelectedTimeSlots([]);
      setDialogVisible(false);
    } catch (error) {
      console.error("Error creating consultation:", error);
      setSelectedTimeSlots([]);
    }
  };
  const slotGroups = slotBooked.reduce(
    (acc, booked) => {
      if (!acc[booked.status]) acc[booked.status] = [];
      acc[booked.status].push(booked);
      return acc;
    },
    { 0: [], 1: [], 2: [] }
  );

  return (
    <Page className="custom-page">
      <Tabs id="contact-list">
        <Tabs.Tab key="tab1" label="Lịch">
          <List>
            <Typography variant="h6" sx={{ pb: 2, textAlign: "center" }}>
              Tạo lịch tư vấn
            </Typography>
            <Calendar onSelect={handleDateChange} />
            <Grid
              space="1rem"
              columnCount={2}
              style={{
                marginTop: "10px",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {timeSlots.map((slot) => {
                // const bookedSlot = slotBooked.find(booked => booked.timeSlotId === slot.id && booked.status === 0);
                const bookedSlot = slotGroups[0].find(
                  (booked) => booked.timeSlotId === slot.id
                ); // Đã đặt
                const completedSlot = slotGroups[1].find(
                  (booked) => booked.timeSlotId === slot.id
                ); // Hoàn thành
                const canceledSlot = slotGroups[2].find(
                  (booked) => booked.timeSlotId === slot.id
                ); // Bị hủy
                return (
                  <Button
                    onClick={() => {
                      if (bookedSlot) {
                        // Nếu slot đã được đặt, mở modal Delete
                        setDialogVisible("Delete");
                        setIdConsultantTime(bookedSlot.id);
                      } else if (completedSlot) {
                        // Nếu slot đã hoàn thành, không làm gì cả
                      } else if (canceledSlot) {
                        // Nếu slot bị hủy, cho phép chọn lại slot đó
                        toggleTimeSlot(slot);
                      } else {
                        // Các trường hợp khác
                        toggleTimeSlot(slot);
                      }
                    }}
                    key={slot.id}
                    style={{
                      borderRadius: "10px",
                      backgroundColor: completedSlot
                        ? "#4caf50"
                        : selectedTimeSlots.includes(slot)
                        ? "#e0e0e0"
                        : "#FFFFFF", // nền sáng khi chọn, trắng khi chưa đặt hoặc đã hủy
                      color: "#000000",
                      padding: "10px",
                      textAlign: "center",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                      transition: "background-color 0.2s",
                      marginRight: "10px",
                      marginLeft: "10px",
                      marginBottom: "10px",
                      opacity: bookedSlot ? 0.5 : completedSlot ? 0.1 : 1, // Đặt opacity mặc định là 1 cho các trạng thái chưa đặt và đã hủy
                    }}
                    size="medium"
                  >
                    <Text>{`${slot.startTime.slice(
                      0,
                      5
                    )} - ${slot.endTime.slice(0, 5)}`}</Text>
                  </Button>
                );
              })}
            </Grid>
            <Grid
              space="1rem"
              style={{
                marginTop: "25%",
                justifyContent: "end",
                display: "flex",
              }}
            >
              <Box>
                <button
                  onClick={() => setDialogVisible("Create")}
                  size="small"
                  style={{
                    width: "50px", // Đảm bảo chiều rộng và chiều cao bằng nhau
                    height: "50px",
                    borderRadius: "50%", // Tạo viền tròn
                    padding: 0, // Loại bỏ khoảng đệm mặc định
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden", // Đảm bảo hình tròn không bị lệch
                    border: "1px solid #ccc", // Viền xám
                    marginRight: "10px",
                  }}
                >
                  <Icon icon="zi-plus" />
                </button>
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
                description={`Bạn đã chọn lịch vào ngày ${selectedDate} cho các khung giờ ${selectedTimeSlots
                  .map(
                    (slot) =>
                      `${slot.startTime.slice(0, 5)} - ${slot.endTime.slice(
                        0,
                        5
                      )}`
                  )
                  .join(", ")}`}
              >
                <Input
                  type="text"
                  placeholder="Nhập link Google Meet"
                  value={googleMeetLink}
                  onChange={(e) => setGoogleMeetLink(e.target.value)}
                  style={{ width: "100%", marginTop: "10px" }}
                />
              </Modal>
              <Modal
                visible={dialogVisible === "CreateSuccess"}
                title="Chúc mừng bạn đã tạo lịch thành công"
                onClose={() => setDialogVisible(false)}
                actions={[
                  {
                    text: "Đóng",
                    close: true,
                    justifyContent: "center",
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
          </List>
        </Tabs.Tab>
        <Tabs.Tab key="tab2" label="Lịch đã đặt">
          <Box mb={10} className="p-4 bg-white rounded-lg shadow-md">
            {bookings.map((booking) => (
              <BookingCardConsultant
                key={booking.id}
                studentId={booking.studentId}
                studentName={booking.studentName}
                startTime={booking.startTime}
                endTime={booking.endTime}
                consultationDay={booking.consultationDay}
                status={booking.status}
                dayId={booking.consultationTimeId}
              />
            ))}
          </Box>
        </Tabs.Tab>
        {/* <Tabs.Tab key="tab3" label="Tab 3">
          Tab 3 content
        </Tabs.Tab> */}
      </Tabs>
    </Page>
  );
}
