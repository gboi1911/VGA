import { useNavigate } from "react-router-dom";
import React from "react";
import { Box, Text } from "zmp-ui";

const OccupationCard = ({ occupation }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/occupationDetail/${occupation.id}`);
  };
  return (
    <Box
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        margin: "10px",
        width: "250px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        height: "300px",
      }}
      onClick={handleClick}
    >
      <img
        src={
          "https://awe.edu.vn/wp-content/uploads/2019/07/4bd5da7d0231d26f8b20.jpg"
        }
        alt={occupation.name}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <Text
        bold
        style={{
          padding: "10px",
          flexShrink: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "10px",
          fontSize: "1.3em",
          marginTop: "10px",
        }}
      >
        {occupation.name}
      </Text>
    </Box>
  );
};

export default OccupationCard;
