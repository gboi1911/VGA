import React from 'react';
import { Page, Box, Text } from 'zmp-ui';
import ExpertCard from '../components/expertCard';

const experts = [
  {
    image: 'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg', // Placeholder image, replace with actual image
    name: 'Nguyen Van A',
    level: 'A',
    contact: 'nguyen.a@gmail.com',
  },
  {
    image: 'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg',
    name: 'Tran Thi B',
    level: 'B',
    contact: 'tran.b@gmail.com',
  },
  {
    image: 'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg',
    name: 'Tran Thi B',
    level: 'B',
    contact: 'tran.b@gmail.com',
  },
  {
    image: 'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg',
    name: 'Tran Thi B',
    level: 'B',
    contact: 'tran.b@gmail.com',
  },
  {
    image: 'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg',
    name: 'Tran Thi B',
    level: 'B',
    contact: 'tran.b@gmail.com',
  },
  {
    image: 'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg',
    name: 'Tran Thi B',
    level: 'B',
    contact: 'tran.b@gmail.com',
  },
];

const ExpertPage = () => {
  return (
    <Page className="page p-4 bg-gray-100">
      {/* Title Section */}
      <Box className="mb-6">
        <Text
          className="text-center text-3xl font-extrabold mb-6 mt-2"
          style={{ fontFamily: 'Serif', color: '#0066CC',fontSize: '2em' }}
        >
          Tư vấn viên
        </Text>
      </Box>

      {/* Expert Cards in Two Columns */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experts.map((expert, index) => (
          <ExpertCard
            key={index}
            image={expert.image}
            name={expert.name}
            level={expert.level}
            contact={expert.contact}
          />
        ))}
      </Box>
    </Page>
  );
};

export default ExpertPage;
