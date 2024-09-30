import React from 'react';
import { Box, Text } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';

const ExpertCard = ({expert}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (expert) {
      // Ensure that expert exists before navigating
      navigate(`/expertDetail/${expert.id}`, { state: { expert } });
    }
  };

  // If expert is undefined or null, we can either show a fallback UI or return null
  if (!expert) {
    return null;
  };
  return (
    <Box className="expert-card p-4 shadow-lg rounded-lg bg-white" onClick={handleClick}>
      <img
        src={expert.image}
        alt={expert.name}
        className="w-full h-32 object-cover rounded-md"
      />
      <Text className="font-bold mt-2 text-lg ml-2">{expert.name}</Text>
      <Text className="text-sm text-gray-500 ml-2">Level: {expert.level}</Text>
      <Text className="text-sm text-blue-600 ml-2 mb-2">{expert.contact}</Text>
    </Box>
  );
};

export default ExpertCard;
