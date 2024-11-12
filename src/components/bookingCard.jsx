import React, { useEffect, useState } from "react";
import { Box, Text, Icon } from "zmp-ui";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getTimebyId } from "api/expert"; // Import the API method

const BookingCard = ({
  consultantName,
  studentName,
  startTime,
  endTime,
  status,
  consultationDay,
  dayId,
}) => {
  const [link, setLink] = useState(""); // Store the link state

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await getTimebyId(dayId); // Fetch data using dayId
        // Assuming the note contains the Google Meet link
        const meetLink = response.data.data.note;
        setLink(meetLink); // Set the Google Meet link to state
      } catch (error) {
        console.log("Error in fetch link: ", error);
      }
    };
    fetchLink();
  }, [dayId]);

  return (
    <Box className="booking-card rounded-lg shadow-md" mt={2}>
      <div className="p-2 ml-2">
        <Text bold>Tư vấn viên: {consultantName}</Text>
        <Text>
          Thời gian: {startTime} - {endTime}
        </Text>
        <Text>Ngày: {consultationDay}</Text>
        {link && (
          <div className="flex items-center">
            <Text>Link Google Meet: </Text>
            <Text
              className="ml-2 text-blue-500 cursor-pointer"
              // Optional: Show an alert when copied
            >
              {link}
            </Text>
            <CopyToClipboard text={link}>
              <Icon icon="zi-copy" onClick={() => alert("Đã sao chép link!")} />
            </CopyToClipboard>
          </div>
        )}
        <Text
          bold
          className={status ? "text-green-600" : "text-red-600"}
          style={{ marginTop: "5px" }}
        >
          {status ? "Thành công" : "Thất bại"}
        </Text>
      </div>
    </Box>
  );
};

export default BookingCard;
