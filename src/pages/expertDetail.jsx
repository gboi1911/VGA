import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Page,
  Box,
  Text,
  Calendar,
  Button,
  Modal,
  Header,
  ImageViewer,
  Spinner,
} from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBirthdayCake,
  faStar,
  faEnvelope,
  faAddressCard,
  faDollarSign,
  faCoins,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { getDay, postBook, getBooking } from "api/expert";
import { getExpertById } from "api/expert";
import moment from "moment";

const ExpertDetailPage = ({ studentId }) => {
  const { id } = useParams();
  const [date, setDate] = useState(new Date());
  const [datevisal, setDatevisal] = useState(new Date());
  console.log("date", date);
  const [time, setTime] = useState("");
  const [availableDays, setAvailableDays] = useState([]);
  const [consultationTimes, setConsultationTimes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [expert, setExpert] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState([]);
  console.log("image", image);

  const filterImage = image?.map((img, index) => ({
    src: img.imageUrl,
    alt: img.description,
    key: img.id,
  }));

  // useEffect(() => {
  //   const fetchExpert = async () => {
  //     try {
  //       const response = await getExpertById(id);
  //       setExpert(response.data.data);
  //       console.log(expert);
  //     } catch (error) {
  //       console.error("Error in fetch expert by id: ", error);
  //     }
  //   };

  //   let isMounted = true;

  //   const fetchExpertDay = async () => {
  //     try {
  //       console.log("expert.id", expert);
  //       const data = await getDay(expert.id);
  //       console.log("Get data consultant day successful", data);

  //       const days = data.consultationDay.map((day) => ({
  //         id: day.id,
  //         date: day.day,
  //         consultationTimes: day.consultationTimes,
  //       }));

  //       if (isMounted) {
  //         setAvailableDays(days);
  //         setTime("");
  //       }
  //     } catch (error) {
  //       console.log("Error in fetch expert day:", error);
  //     }
  //   };
  //   fetchExpert();
  //   fetchExpertDay();

  //   // return () => {
  //   //   isMounted = false;
  //   // };
  // }, [id]);

  // Hàm định dạng ngày

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const response = await getExpertById(id);
        setExpert(response.data.data);
        setImage(response.data.data.certifications);
      } catch (error) {
        console.error("Error in fetch expert by id: ", error);
      }
    };
    fetchExpert();
  }, [id]);

  const fetchExpertDay = async () => {
    try {
      const data = await getDay(expert.id); // Ensure expert.id is available here
      console.log("Get data consultant day successful", data);

      const days = data.consultationDay.map((day) => ({
        id: day.id,
        date: day.day,
        consultationTimes: day.consultationTimes,
      }));

      setAvailableDays(days);
      setTime("");
    } catch (error) {
      console.log("Error in fetch expert day:", error);
    }
  };

  useEffect(() => {
    if (!expert) return; // Only run if expert is defined

    fetchExpertDay();
  }, [expert]); // Only runs when expert is set

  const isDateAvailable = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const selectedDayData = availableDays.find(
      (day) => day.date === formattedDate
    );

    // If the day exists in availableDays and all slots are booked, disable the day
    if (selectedDayData) {
      const allSlotsBooked = selectedDayData.consultationTimes.every(
        (slot) => slot.status === 1
      );
      return !allSlotsBooked; // Disable the day if all slots are booked
    }

    return false; // Return false if the day isn't available in the list
  };
  const handleDateSelect = async (newDate) => {
    setDate(newDate);
    setDatevisal(newDate);

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

    // Fetch updated time slots for the selected day
    await fetchExpertDay();
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

      // Display booking confirmation
      setBookingConfirmation(response.data);
      setBookingError(null); // Clear any previous error
      setModalOpen(false);

      // Reload time slots for the selected day
      setDate(moment(date).toDate()); // This will trigger the Calendar to update
      await handleDateSelect(date);
      await fetchExpertDay();
    } catch (error) {
      console.error("Error during booking:", error);
      setBookingError(error.response?.data?.message || "Đặt lịch thất bại");
      setModalOpen(false);
    }
  };

  const disablePastSlots = (slot) => {
    const currentTime = moment();
    const slotStart = moment(
      `${moment(date).format("YYYY-MM-DD")} ${slot.startTime}`,
      "YYYY-MM-DD HH:mm"
    );
    return slotStart.isBefore(currentTime, "minute");
  };

  if (!expert) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner />
        <Text>Loading...</Text>
      </Box>
    );
  }

  console.log(image);

  return (
    <>
      <Page className="page">
        <Header
          style={{ display: "flex", textAlign: "initial" }}
          title="Thông tin & Đặt lịch"
        />
        <Box style={{ padding: "10px" }}>
          <Text
            className="text-center mb-6 mt-2"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Thông tin tư vấn viên
          </Text>
          <Box
            className="section-container bg-white rounded-lg shadow-md"
            style={{ padding: 10 }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ justifyContent: "center" }}>
                <img
                  // src={expert.image_Url}
                  src={
                    expert.image_Url ||
                    "https://img.freepik.com/premium-photo/business-woman-standing-with-pen-clipboard-her-hands_28586-86.jpg?w=1060"
                  }
                  alt={expert.name}
                  // className="w-90 h-32 object-cover rounded-md mt-3"
                  style={{
                    width: "130px",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <Box style={{ marginLeft: "10px" }}>
                <Text
                  className="text-orange-700"
                  size="xLarge"
                  bold
                  style={{ textAlign: "center" }}
                >
                  {expert.name}
                </Text>
                <div style={{ display: "flex", gap: "26px" }}>
                  <Text className="text-gray-600 mt-2">
                    <FontAwesomeIcon
                      icon={faBirthdayCake}
                      style={{ marginRight: "5px" }}
                    />{" "}
                    {new Date(expert.dateOfBirth).toLocaleDateString("en-GB")}
                  </Text>
                  <Text className="text-gray-600 mt-2">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ marginRight: "5px" }}
                    />{" "}
                    {expert.consultantLevel.id}
                  </Text>
                </div>
                <Text
                  className="text-gray-600 mt-2"
                  style={{
                    display: "inline-flex",
                    wordBreak: "break-word",
                    lineHeight: "0.8",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ marginRight: "5px", flexShrink: 0 }}
                  />
                  {expert.email}
                </Text>

                <Text className="text-base text-gray-700 mt-2">
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    style={{ marginRight: "5px" }}
                  />
                  {expert.description}
                </Text>
                <Text className=" text-gray-700 mt-2">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    style={{ marginRight: "5px" }}
                  />
                  {`${expert.consultantLevel.priceOnSlot} điểm / slot`}
                </Text>
              </Box>
            </div>
            <Text
              className="text-center mb-3 mt-2"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "20px",
                color: "#0066CC",
              }}
            >
              Chứng chỉ
            </Text>
            <Text>
              Những chứng chỉ dưới đây để xác nhận trình độ và độ uy tín của tư
              vấn viên
            </Text>
            <Box mt={2}>
              <Box flex flexDirection="row" flexWrap="nowrap" mt={2}>
                {expert?.certifications.map((img, index) => (
                  <Box
                    mr={1}
                    key={img.id}
                    style={{
                      width: "68px",
                      height: "69px",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      role="presentation"
                      onClick={() => {
                        setActiveIndex(index);
                        setVisible(true);
                      }}
                      src={img.imageUrl}
                      alt={img.description}
                    />
                  </Box>
                ))}
              </Box>
              <ImageViewer
                onClose={() => setVisible(false)}
                activeIndex={activeIndex}
                images={filterImage}
                visible={visible}
              />
            </Box>
          </Box>

          <Text
            className="text-center mb-6 mt-2"
            style={{ fontSize: "24px", fontWeight: "bold" }}
          >
            Đặt lịch hẹn
          </Text>

          <Box
            className="bg-white rounded-lg shadow-md"
            style={{ marginBottom: "20px", padding: "10px" }}
          >
            <Text
              className="text-center"
              style={{
                color: "#0066CC",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
                letterSpacing: "0.05em",
                padding: "10px",
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
              disabledDate={(date) => {
                const today = moment().startOf("day");
                const selectedDate = moment(date).startOf("day");
                return selectedDate.isBefore(today) || !isDateAvailable(date);
              }}
            />

            <Box style={{ display: "flex" }}>
              <Text className="mt-4 ml-4 text-lg font-semibold text-[#007BFF] tracking-wide ">
                Chọn slot:
              </Text>
              <select
                className="mt-2 ml-2 border rounded"
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
                      style={{
                        backgroundColor:
                          disablePastSlots(slot) || slot.status === 1
                            ? "#f8d7da"
                            : "white",
                        color:
                          disablePastSlots(slot) || slot.status === 1
                            ? "#721c24"
                            : "black",
                      }}
                      disabled={disablePastSlots(slot) || slot.status !== 0}
                    >
                      {`${slot.startTime} - ${slot.endTime}`}{" "}
                      {slot.status === 1
                        ? "(Đã đặt)"
                        : disablePastSlots(slot)
                        ? "(Đã quá hạn!)"
                        : ""}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Không có thời gian nào
                  </option>
                )}
              </select>
            </Box>
            <div className="mt-4 mb-4 p-4 flex justify-center">
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
              <Text className="text-lg" style={{ textAlign: "center" }}>
                Bạn có chắc chắn muốn đặt lịch hẹn vào ngày{" "}
                {moment(datevisal).format("DD/MM/YYYY")} vào lúc {time}?
              </Text>
              <Text className="text-lg" style={{ textAlign: "center" }}>
                Đặt lịch sẽ tốn {expert.consultantLevel.priceOnSlot}{" "}
                <FontAwesomeIcon
                  icon={faCoins}
                  style={{ marginRight: "5px" }}
                />
              </Text>
              <div className="flex justify-end mt-4 gap-2">
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
                <Text>
                  Tư vấn viên: {bookingConfirmation.data.consultantName}
                </Text>
                <Text>
                  Số điện thoại: {bookingConfirmation.data.consultantPhone}
                </Text>
              </div>
            </Modal>
          )}

          {/* Modal for booking error */}
          {bookingError && (
            <Modal
              visible={!!bookingError}
              onClose={() => setBookingError(null)}
              title="Đặt Lịch Thất Bại"
            >
              <div className="p-4">
                <Text className="text-lg" style={{ textAlign: "center" }}>
                  {bookingError}
                </Text>
              </div>
            </Modal>
          )}
        </Box>
      </Page>
    </>
  );
};

export default ExpertDetailPage;
