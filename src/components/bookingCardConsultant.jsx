import React, { useEffect, useState } from "react";
import { Box, Text, Icon, Modal, Button } from "zmp-ui"; // Import Modal and Button
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getTimebyId } from "api/expert";
import { getHistoryTest } from "api/personal";

const BookingCardConsultant = ({
  studentName,
  startTime,
  endTime,
  status,
  consultationDay,
  dayId,
  studentId,
}) => {
  const [link, setLink] = useState(""); // Store the Google Meet link
  const [dataStudent, setDataStudent] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await getTimebyId(dayId);
        const meetLink = response.data.data.note;
        setLink(meetLink);
      } catch (error) {
        console.error("Error in fetching link: ", error);
      }
    };

    const fetchDataStudent = async () => {
      try {
        const response = await getHistoryTest(studentId);
        setDataStudent(response.data);
      } catch (error) {
        console.error("Error in fetching student data:", error);
      }
    };

    fetchLink();
    fetchDataStudent();
  }, [dayId, studentId]);

  const handleModalOpen = () => setIsModalVisible(true);
  const handleModalClose = () => setIsModalVisible(false);

  return (
    <Box className="booking-card rounded-lg shadow-md" mt={2}>
      <div className="p-2 ml-2">
        <Text bold>Học sinh: {studentName}</Text>
        <Text>
          Thời gian: {startTime} - {endTime}
        </Text>
        <Text>Ngày: {consultationDay}</Text>
        {link && (
          <div className="flex items-center">
            <Text>Link Google Meet: </Text>
            <Text className="ml-2 text-blue-500 cursor-pointer">{link}</Text>
            <CopyToClipboard text={link}>
              <Icon icon="zi-copy" onClick={() => alert("Đã sao chép link!")} />
            </CopyToClipboard>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text>Kết quả kiểm tra tính cách:&nbsp;</Text>
          <Text
            className="text-blue-500 cursor-pointer"
            onClick={handleModalOpen}
          >
            Xem thông tin
          </Text>
        </div>

        <Text
          bold
          className={status ? "text-green-600" : "text-red-600"}
          style={{ marginTop: "5px" }}
        >
          {status ? "Thành công" : "Thất bại"}
        </Text>
      </div>

      {/* Modal for displaying student details */}
      <Modal
        visible={isModalVisible}
        onClose={handleModalClose}
        title="Thông tin học sinh"
      >
        <Box p={2}>
          {dataStudent.historyTests?.map((test, index) => (
            <Box key={test.personalTestId} mb={2}>
              <Text bold>Tên bài kiểm tra: {test.personalTestName}</Text>
              <Text>Mã nhóm: {test.personalGroupCode}</Text>
              <Text>
                Nhóm: {test.personalGroupName} - {test.personalGroupDescription}
              </Text>
              <Text>Ngày làm: {new Date(test.date).toLocaleString()}</Text>
            </Box>
          ))}
          {dataStudent.historyMajor?.length === 0 && (
            <Text>Chưa có thông tin ngành nghề.</Text>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default BookingCardConsultant;
