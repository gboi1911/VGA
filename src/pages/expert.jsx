import React from 'react';
import { Page, Box, Text } from 'zmp-ui';
import ExpertCard from '../components/expertCard';

const experts = [
  {
    id: '1',
    image: 'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg', // Placeholder image, replace with actual image
    name: 'Nguyen Van A',
    level: 'A',
    contact: 'nguyen.a@gmail.com',
  },
  {
    id: '2',
    image: 'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg',
    name: 'Tran Thi B',
    level: 'B',
    contact: 'tran.b@gmail.com',
  },
  {
    id: '3',
    image: 'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg',
    name: 'Tran Thi B',
    level: 'B',
    contact: 'tran.b@gmail.com',
  },
  {
    id: '4',
    image: 'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg',
    name: 'Tran Thi B',
    level: 'B',
    contact: 'tran.b@gmail.com',
  },
  {
    id: '5',
    image: 'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg',
    name: 'Tran Thi B',
    level: 'B',
    contact: 'tran.b@gmail.com',
  },
  {
    id: '6',
    image: 'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg',
    name: 'Tran Thi B',
    level: 'B',
    contact: 'tran.b@gmail.com',
  },
];

const ExpertPage = () => {
  return (
    <Page className="page p-4 bg-gray-100 w-full">
      <Box className="mb-6">
      <Text
        className="text-center text-4xl font-bold mb-6 mt-4"
        style={{
          fontFamily: 'Poppins, sans-serif', 
          color: '#0066CC', 
          fontSize: '2.5em', 
          letterSpacing: '0.02em', 
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)', 
        }}
      >
        Tư vấn viên
    </Text>
      </Box>
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experts.map((expert) => (
          <ExpertCard
            key={expert.id}
            expert={expert}
          />
        ))}
      </Box>
    </Page>
  );
};

export default ExpertPage;
