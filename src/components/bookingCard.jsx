import React from 'react';
import { Box, Text } from 'zmp-ui';

const BookingCard = ({ consultantName, studentName, startTime, endTime, status }) => {
  return (
    <Box
      className="booking-card p-4 mb-4 rounded-lg shadow-md"
      style={{
        backgroundColor: status ? 'lightgreen' : 'lightcoral',
      }}
    >
      <Text className="font-bold">Tư vấn viên: {consultantName}</Text>
      <Text>Người đặt lịch: {studentName}</Text>
      <Text>Thời gian: {startTime} - {endTime}</Text>
      <Text className={status ? 'text-green-600' : 'text-red-600'}>
        {status ? 'Thành công' : 'Thất bại'}
      </Text>
    </Box>
  );
};

export default BookingCard;
