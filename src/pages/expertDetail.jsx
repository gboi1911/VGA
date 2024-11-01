import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Page, Box, Text, Calendar, Button, Modal } from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faStar, faEnvelope, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { getDay, postBook, getBooking } from "api/expert"; // Ensure getBooking is imported
import moment from "moment";
import BookingCard from '../components/bookingCard'; // Import the BookingCard component

const ExpertDetailPage = ({ studentId }) => {
  const location = useLocation();
  const { expert } = location.state || {};
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [availableDays, setAvailableDays] = useState([]);
  const [consultationTimes, setConsultationTimes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [bookings, setBookings] = useState([]); // State for bookings

  if (!expert) {
    return <Text>Error: Expert not found</Text>;
  }

  useEffect(() => {
    let isMounted = true; 
  
    const fetchExpertDay = async () => {
      try {
        const data = await getDay(expert.id);
        console.log("Get data consultant day successful", data);
  
        const days = data.consultationDay.map((day) => ({
          id: day.id,
          date: day.day,
          consultationTimes: day.consultationTimes,
        }));
  
        if (isMounted) {
          setAvailableDays(days);
          setTime("");
        }
      } catch (error) {
        console.log("Error in fetch expert day:", error);
      }
    };
  
    const fetchBookings = async () => {
      try {
        const response = await getBooking(studentId, expert.id);
        if (isMounted) {
          setBookings(response.data.bookings);
        }
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };
  
    if (expert && expert.id) { 
      fetchExpertDay();
      fetchBookings();
    }
  
    return () => {
      isMounted = false; 
    };
  }, [expert]);
  

  const isDateAvailable = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return availableDays.some((day) => day.date === formattedDate);
  };

  const handleDateSelect = (newDate) => {
    setDate(newDate);
    const formattedDate = moment(newDate).format("YYYY-MM-DD");
    const selectedDayData = availableDays.find(
      (day) => day.date === formattedDate
    );

    if (selectedDayData) {
      setConsultationTimes(selectedDayData.consultationTimes);
      setTime("");
    } else {
      setConsultationTimes([]);
      setTime("");
    }
  };

  const handleConfirm = () => {
    setModalOpen(true);
  };

  const handleBook = async () => {
    try {
      const timeId = consultationTimes.find(
        (slot) => `${slot.startTime} - ${slot.endTime}` === time
      ).id;
      const response = await postBook(studentId, timeId);
      setBookingConfirmation(response.data); // Set booking confirmation data
      setModalOpen(false);
    } catch (error) {
      console.error("Error during booking:", error);
    }
  };

  return (
    <Page className="page" style={{ padding: "10px" }}>
      <Text
        className="text-center text-3xl font-extrabold mb-6 mt-2"
        style={{ fontFamily: "Serif", color: "#0066CC", fontSize: "2em" }}
      >
        Thông tin tư vấn viên
      </Text>

      <Box
        className="section-container bg-white rounded-lg shadow-md p-4"
        style={{ display: "flex" }}
      >
        <img
          src={expert.image_Url}
          alt={expert.name}
          className="w-90 h-32 object-cover rounded-md mt-3"
        />
        <Box style={{ marginLeft: "10px" }}>
          <Text
            className="text-orange-700"
            size="xLarge"
            bold
            style={{ textAlign: "center" }}
          >
            {expert.name}
          </Text>
          <Text className="text-gray-600 mt-2">
            <FontAwesomeIcon icon={faBirthdayCake} style={{ marginRight: "5px" }} />{" "}
            {new Date(expert.dateOfBirth).toLocaleDateString("en-GB")}
          </Text>
          <Text className="text-gray-600 mt-2">
            <FontAwesomeIcon icon={faStar} style={{ marginRight: "5px" }} />{" "}
            {expert.consultantLevel.id}
          </Text>
          <Text className="text-gray-600 mt-2">
            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "5px" }} />{" "}
            {expert.email}
          </Text>
          <Text className="text-base text-gray-700 mt-2">
            <FontAwesomeIcon
              icon={faAddressCard}
              style={{ marginRight: "5px" }}
            />
            {expert.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </Text>
        </Box>
      </Box>

      <Text
        className="text-center text-3xl font-extrabold mb-6 mt-2"
        style={{ fontFamily: "Serif", color: "#0066CC", fontSize: "2em" }}
      >
        Đặt lịch hẹn
      </Text>

      <Box className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <Text
          className="text-center text-2xl font-semibold mb-2 mt-4"
          style={{
            color: "#0066CC",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
            letterSpacing: "0.05em",
          }}
        >
          Chọn ngày thích hợp để đặt lịch hẹn
        </Text>

        <Calendar
          value={date}
          onSelect={handleDateSelect}
          className="calendar"
          tileClassName={({ date }) =>
            isDateAvailable(date) ? "bg-green-200" : "bg-red-200"
          }
          disabledDate={(date) => !isDateAvailable(date)}
        />

        <Box style={{ display: "flex" }}>
          <Text className="mt-4 ml-4 text-lg font-semibold text-[#007BFF] tracking-wide ">
            Chọn Thời Gian:
          </Text>
          <select
            className="mt-2 ml-10 p-2 border rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="" disabled>
              {date ? "Chọn Thời Gian" : "Chưa có ngày nào được chọn"}
            </option>
            {consultationTimes.length > 0 ? (
              consultationTimes.map((slot, index) => (
                <option
                  key={index}
                  value={`${slot.startTime} - ${slot.endTime}`}
                >
                  {`${slot.startTime} - ${slot.endTime}`}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Không có thời gian nào
              </option>
            )}
          </select>
        </Box>

        <div className="mt-4 mb-4 flex justify-center">
          <Button className="w-80" onClick={handleConfirm} color="primary">
            Xác Nhận
          </Button>
        </div>
      </Box>

      {/* Modal for confirmation */}
      <Modal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Xác Nhận Đặt Lịch"
      >
        <div className="p-4">
          <Text
            className="text-lg"
            style={{
              textAlign: "center",
            }}
          >
            Bạn có chắc chắn muốn đặt lịch hẹn vào ngày {date.toDateString()}{" "}
            vào lúc {time}?
          </Text>
          <div className="flex justify-end mt-4">
            <Button
              className="mr-2"
              onClick={() => setModalOpen(false)}
              type="danger"
            >
              Hủy
            </Button>
            <Button className="mr-2" onClick={handleBook} type="primary">
              Xác Nhận
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal for booking confirmation */}
      {bookingConfirmation && (
        <Modal
          visible={!!bookingConfirmation}
          onClose={() => setBookingConfirmation(null)}
          title="Đặt Lịch Thành Công"
        >
          <div className="p-4">
            <Text className="text-lg" style={{ textAlign: "center" }}>
              {bookingConfirmation.message}
            </Text>
            <Text className="mt-2">
              Ngày tư vấn: {bookingConfirmation.data.consultationDay}
            </Text>
            <Text>
              Thời gian: {bookingConfirmation.data.startTime} -{" "}
              {bookingConfirmation.data.endTime}
            </Text>
            <Text>Tư vấn viên: {bookingConfirmation.data.consultantName}</Text>
            <Text>
              Số điện thoại: {bookingConfirmation.data.consultantPhone}
            </Text>
          </div>
        </Modal>
      )}

      <Text
        className="text-center text-3xl font-extrabold mb-6 mt-2"
        style={{ fontFamily: "Serif", color: "#0066CC", fontSize: "2em" }}
      >
        Lịch đã đặt
      </Text>

      <Box className="mt-6 p-4 bg-white rounded-lg shadow-md">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            consultantName={booking.consultantName}
            studentName={booking.studentName}
            startTime={booking.startTime}
            endTime={booking.endTime}
            status={booking.status}
          />
        ))}
      </Box>
    </Page>
  );
};

export default ExpertDetailPage;
