import React from 'react';
import { Box, Text } from 'zmp-ui';

const ExpertCard = ({ image, name, level, contact }) => {
  return (
    <Box className="expert-card p-4 shadow-lg rounded-lg bg-white">
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover rounded-md"
      />
      <Text className="font-bold mt-2 text-lg ml-2">{name}</Text>
      <Text className="text-sm text-gray-500 ml-2">Level: {level}</Text>
      <Text className="text-sm text-blue-600 ml-2 mb-2">{contact}</Text>
    </Box>
  );
};

export default ExpertCard;
