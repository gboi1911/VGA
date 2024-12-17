import React, { useState } from "react";
import { Box, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";

const ExpertCard = ({ expert }) => {
  const [expertsLevel, setExpertsLevel] = useState(null);
  const navigate = useNavigate();
  const handleClick = () => {
    if (expert) {
      navigate(`/expertDetail/${expert.id}`);
    }
  };

  if (!expert) {
    console.log("No data");
  }

  return (
    <Box
      className="expert-card shadow-lg rounded-lg bg-white relative"
      onClick={handleClick}
      style={{ overflow: "visible", height: "250px", marginBottom: "20px" }}
    >
      <img
        src={
          expert.image_Url ||
          "https://img.freepik.com/premium-photo/confident-business-expert-attractive-smiling-young-woman-typing-laptop-ang-holding-digital-tablet-desk-creative-office_1070994-7488.jpg?w=1060"
        }
        alt={expert.name}
        loading="lazy"
        className="w-full h-32 object-cover rounded-md"
      />
      <Text
        className="mt-2 mb-2 text-lg ml-2"
        bold
        style={{ textAlign: "center", fontSize: "1.2em" }}
      >
        {expert.name}
      </Text>

      {/* Container with relative positioning for the info box */}
      <Box
        className="absolute left-1/2 transform -translate-x-1/2 bottom-[-20px]"
        style={{
          backgroundColor: "#333333",
          padding: "4px",
          borderRadius: "8px",
          width: "150px",
          height: "100px",
        }}
      >
        <Text
          className="ml-1 mt-1"
          style={{ color: "white", fontSize: "0.9em" }}
        >
          Level: {expert.consultantLevel.id}
        </Text>
        <Text className="ml-1" style={{ color: "white", fontSize: "0.9em" }}>
          {expert.consultantLevel.name}
        </Text>
        <Text
          className="ml-1 mb-2"
          style={{ color: "#FF9966", fontSize: "0.9em" }}
        >
          {expert.description}
        </Text>
      </Box>
    </Box>
  );
};

export default ExpertCard;
