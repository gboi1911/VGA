import React from "react";
import { Box, Text } from "zmp-ui";

const BookingCard = ({
  consultantName,
  studentName,
  startTime,
  endTime,
  status,
  consultationDay,
}) => {
  return (
    <Box className="booking-card rounded-lg shadow-md" mt={2}>
      <div className="p-2 ml-2">
        <Text bold>Tư vấn viên: {consultantName}</Text>
        <Text>
          Thời gian: {startTime} - {endTime}
        </Text>
        <Text>Ngày: {consultationDay} </Text>
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
