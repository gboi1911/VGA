import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Page, Box, Avatar, Text, Calendar, Button } from 'zmp-ui';

const ExpertDetailPage = () => {
  const location = useLocation();
  const { expert } = location.state || {};

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  if (!expert) {
    return <Text>Error: Expert not found</Text>;
  }

  const availableDays = ['2024-09-29', '2024-09-30', '2024-10-01'];
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const isDateAvailable = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return availableDays.includes(formattedDate);
  };

  const handleConfirm = () => {
    alert(`Appointment confirmed for ${date.toDateString()} at ${time}`);
  };

  return (
    <Page className="page">
      <Text
        className="text-center text-3xl font-extrabold mb-6 mt-2"
        style={{ fontFamily: 'Serif', color: '#0066CC', fontSize: '2em' }}
      >
        Thông tin tư vấn viên
      </Text>

      <Box className="section-container bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:w-1/3 flex justify-center items-center">
          <Avatar
            src={expert.image}
            size={120}
            alt={expert.name}
          />
        </div>

        <div className="flex-1 md:ml-4">
          <Text size="xLarge" bold>{expert.name}</Text>
          <Text className="text-gray-600 mt-2">Level: {expert.level}</Text>
          <Text className="text-gray-600 mt-2">Contact: {expert.contact}</Text>
          <Text className="text-base text-gray-700 mt-2">
            {expert.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </Text>
        </div>
      </Box>

      <Text
        className="text-center text-3xl font-extrabold mb-6 mt-2"
        style={{ fontFamily: 'Serif', color: '#0066CC', fontSize: '2em' }}
      >
        Đặt lịch hẹn
      </Text>

      <Box className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <Text
          className="text-center text-2xl font-semibold mb-2 mt-4"
          style={{
            color: '#0066CC', 
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)', 
            letterSpacing: '0.05em', 
          }}
        >
          Chọn ngày thích hợp để đặt lịch hẹn
        </Text>
        
        <Calendar
          value={date}
          onChange={setDate}
          className="calendar"
          tileClassName={({ date }) => isDateAvailable(date) ? 'bg-green-200' : 'bg-red-200'}
        />
        
        <Text className="mt-4 ml-2 text-lg font-semibold text-[#007BFF] tracking-wide ">
            Ngày Đã Chọn: 
            <span className="font-normal text-gray-700"> {date.toDateString('vi-VN')}</span>
        </Text>

        <Text className="mt-4 ml-2 text-lg font-semibold text-[#007BFF] tracking-wide ">
            Chọn Thời Gian:
        </Text>
        <select 
          className="mt-2 ml-4 p-2 border rounded"
          value={time} 
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="" disabled>Chọn Thời Gian</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>{slot}</option>
          ))}
        </select>

        <div className="mt-4 mb-4 flex justify-center">
            <Button
                className="w-80"
                onClick={handleConfirm}
                color="primary"
            >
                Xác Nhận
            </Button>
        </div>
      </Box>
    </Page>
  );
};

export default ExpertDetailPage;
