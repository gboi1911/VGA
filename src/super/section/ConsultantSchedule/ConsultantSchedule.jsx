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
  Header,
} from "zmp-ui";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { getTimeSlot, createSchedule, deleteTimeSlot } from "api/super";
import {
  getBookingConsul,
  getTimeslotSelected,
  getCompleteBooking,
} from "api/expert";
import BookingCardConsultant from "../../../components/bookingCardConsultant";
import { useLocation } from "react-router-dom";

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
  const [dayHasSlot, setDayHasSlot] = useState([]);
  console.log("booking:", bookings);
  const [responseCreate, setResponseCreate] = useState("");
  console.log("completeSchedule:", completeSchedule); // Kiểm tra xem completeSchedule có thay đổi khi chọn slot không
  console.log("idConsultantTime:", idConsultantTime); // Kiểm tra xem idConsultantTime có thay đổi khi chọn slot không
  console.log("slotBooked:", slotBooked); // Kiểm tra xem slotBooked có thay đổi khi chọn slot không
  console.log("selectedTimeSlots:", selectedTimeSlots); // Kiểm tra xem selectedTimeSlots có thay đổi khi chọn slot không
  const location = useLocation();
  const initialTab = location.state?.tab || "tab1";

  const handleDelete = async (idConsultantTime) => {
    try {
      const response = await deleteTimeSlot(idConsultantTime);
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
    console.log("handleCreate được gọi"); // Kiểm tra xem hàm có chạy
    const formData = {
      consultantId: userid,
      day: selectedDate || new Date(),
      consultationTimes: selectedTimeSlots.map((slot) => ({
        timeSlotId: slot.id,
        note: googleMeetLink,
      })),
    };
    try {
      const response = await createSchedule(formData);
      if (response.status === 200) {
        setDialogVisible("CreateSuccess"); // Show success modal
        setResponseCreate(response.message);
        // Gọi lại các API để làm mới dữ liệu
        fetchTimeSlots();
        fetchBookings();
        getCompleteSchedule();
        fetchTimeSlotSelected();
      } else {
        setDialogVisible("CreateFail"); // Show fail modal if response is not successful
        setResponseCreate(response.message);
      }
      console.log("Tạo lịch thành công:", response.data);
      setSlotBooked((prevSlots) => [
        ...prevSlots,
        ...selectedTimeSlots.map((slot) => ({
          id: slot.id,
          timeSlotId: slot.id,
          status: 0,
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
      ]);
      setSelectedTimeSlots([]); // Clear selected slots
      setGoogleMeetLink(""); // Reset Google Meet link
    } catch (error) {
      console.error("Error creating consultation:", error);
      setDialogVisible("CreateFail"); // Show fail modal in case of error
      setSelectedTimeSlots([]);
    }
    console.log("message:", responseCreate);
  };

  const slotGroups = slotBooked.reduce(
    (acc, booked) => {
      if (!acc[booked.status]) acc[booked.status] = [];
      acc[booked.status].push(booked);
      return acc;
    },
    { 0: [], 1: [], 2: [] }
  );

  const fetchTimeSlots = async () => {
    try {
      const response = await getTimeSlot();
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
  const getCompleteSchedule = async () => {
    try {
      const response = await getCompleteBooking(selectedDate);
      setcompleteSchedule(response.data.bookings);
    } catch (error) {
      console.error("Error fetching time slot:", error);
    }
  };
  const fetchTimeSlotSelected = async () => {
    try {
      const response = await getTimeslotSelected(userid, selectedDate);

      const consultationDay = response.data.consultationDay;

      if (consultationDay && consultationDay.length > 0) {
        // Lấy consultationTimes từ phần tử đầu tiên của consultationDay
        setSlotBooked(consultationDay[0].consultationTimes);
        setDayHasSlot(consultationDay);
        console.log("consultationDay:", consultationDay[0].consultationTimes);
        console.log("consultationDay:", consultationDay);
      } else {
        // Không có dữ liệu cho ngày đã chọn
        setSlotBooked([]);
      }
    } catch (error) {
      console.error("Error fetching time slot:", error);
    }
  };

  const reloadPage = () => {
    fetchTimeSlots();
    fetchBookings();
    getCompleteSchedule();
    fetchTimeSlotSelected();
  };

  useEffect(() => {
    fetchBookings();
    fetchTimeSlots();
  }, []);
  useEffect(() => {
    if (selectedDate) {
      getCompleteSchedule();
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchTimeSlotSelected();
  }, [selectedDate]);

  let eventDates = [
    // new Date(2024, 11, 20), // 20 tháng 12 năm 2024
    // new Date(2024, 11, 22), // 22 tháng 12 năm 2024
  ];

  // console.log(eventDates);

  dayHasSlot.forEach((slot) => {
    if (slot.day) {
      eventDates.push(slot.day);
    }
  });

  console.log(eventDates);

  const formattedDates = eventDates.map((dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed
  });

  console.log(formattedDates);

  // Hàm render cell
  const cellRender = (currentDate) => {
    const isEventDay = formattedDates.some(
      (eventDate) =>
        currentDate.getDate() === eventDate.getDate() &&
        currentDate.getMonth() === eventDate.getMonth() &&
        currentDate.getFullYear() === eventDate.getFullYear()
    );

    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {/* <span>{currentDate.getDate()}</span> */}
        {isEventDay && (
          <div
            style={{
              position: "absolute",
              bottom: 18,
              right: 4,
              width: 8,
              height: 8,
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          ></div>
        )}
      </div>
    );
  };

  return (
    <>
      <Box
        style={{
          position: "relative",
          height: "42px",
          backgroundColor: "#0369a1",
        }}
      ></Box>
      <Page className="page">
        <Header title="Tạo lịch" showBackIcon={false} />
        <Tabs id="contact-list" defaultActiveKey={initialTab}>
          <Tabs.Tab key="tab1" label="Lịch">
            <List>
              <Typography variant="h6" sx={{ pb: 2, textAlign: "center" }}>
                Tạo lịch tư vấn
              </Typography>
              <Calendar
                onSelect={handleDateChange}
                cellRender={cellRender}
                disabledDate={(currentDate) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return currentDate < today;
                }}
              />
              <Grid
                space="1rem"
                columnCount={3}
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
                  console.log("bookedSlot", bookedSlot);
                  const completedSlot = slotGroups[1].find(
                    (booked) => booked.timeSlotId === slot.id
                  ); // Hoàn thành
                  console.log("completedSlot", completedSlot);
                  const canceledSlot = slotGroups[2].find(
                    (booked) => booked.timeSlotId === slot.id
                  ); // Bị hủy
                  console.log("canceledSlot", canceledSlot);
                  return (
                    <Button
                      onClick={() => {
                        if (bookedSlot) {
                          // Nếu slot đã được đặt, mở modal Delete
                          setDialogVisible("Delete");
                          console.log("haha", bookedSlot);
                          setIdConsultantTime(bookedSlot?.id);
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
                        marginRight: "9px",
                        marginLeft: "9px",
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
                  marginTop: "10%",
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
                  onClose={() => {
                    setDialogVisible(false);
                    setGoogleMeetLink("");
                  }}
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
                    clearable
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
                >
                  {" "}
                  <Text>{responseCreate}</Text>
                </Modal>
                <Modal
                  visible={dialogVisible === "CreateFail"}
                  title="Đặt lịch thất bại"
                  onClose={() => setDialogVisible(false)}
                  actions={[
                    {
                      text: "Đóng",
                      close: true,
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Text>{responseCreate}</Text>
                </Modal>
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
              {bookings?.map((booking, index) => (
                <BookingCardConsultant
                  key={index}
                  studentId={booking.studentId}
                  studentName={booking.studentName}
                  startTime={booking.startTime}
                  endTime={booking.endTime}
                  consultationDay={booking.consultationDay}
                  status={booking.status}
                  dayId={booking.consultationTimeId}
                  id={booking.id}
                  onStatusChange={reloadPage} // Truyền hàm reloadPage
                />
              ))}
            </Box>
          </Tabs.Tab>
          {/* <Tabs.Tab key="tab3" label="Tab 3">
          Tab 3 content
        </Tabs.Tab> */}
        </Tabs>
      </Page>
    </>
  );
}
