import React, { useState } from "react";
import { Box, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";

const ExpertCard = ({ expert }) => {
  const [expertsLevel, setExpertsLevel] = useState(null);
  const navigate = useNavigate();
  const handleClick = () => {
    if (expert) {
      // Ensure that expert exists before navigating
      navigate(`/expertDetail/${expert.id}`, { state: { expert } });
    }
  };

  // If expert is undefined or null, we can either show a fallback UI or return null
  if (!expert) {
    console.log("No data");
  }
  return (
    <Box
      className="expert-card p-4 shadow-lg rounded-lg bg-white"
      onClick={handleClick}
    >
      <img
        src={expert.image_Url}
        alt={expert.name}
        className="w-full h-32 object-cover rounded-md"
      />
      <Text
        className="mt-2 text-lg ml-2"
        bold
        style={{ textAlign: "center", fontSize: "1.2em" }}
      >
        {expert.name}
      </Text>
      <Text className="text-sm text-gray-500 ml-2 mt-2">
        Level: {expert.consultantLevel.id}
      </Text>
      <Text className="text-sm text-gray-500 ml-2">
        {expert.consultantLevel.name}
      </Text>
      <Text className="text-sm text-blue-600 ml-2 mb-2">
        {expert.description}
      </Text>
    </Box>
  );
};

export default ExpertCard;
