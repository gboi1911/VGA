import { useNavigate } from "react-router-dom";
import React from "react";
import { Box, Button, Text } from "zmp-ui";

// Function to determine badge color based on ranking
const getBadgeColor = (index) => {
  if (index === 0) return "#FFD700"; // Gold for Top 1
  if (index === 1) return "#C0C0C0"; // Silver for Top 2
  if (index === 2) return "#CD7F32"; // Bronze for Top 3
  return "#E0E0E0"; // Gray for others
};

const OccupationCard = ({ occupation, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/occupationDetail/${occupation.id}`);
  };

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        border: `2px solid ${getBadgeColor(index)}`, // Dynamic border color
        borderRadius: "10px",
        overflow: "hidden",
        width: "100%",
        height: "120px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        position: "relative", // To position ranking badge
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Ranking Badge */}
      <div
        style={{
          position: "absolute",
          top: "-8px",
          left: "-6px",
          backgroundColor: getBadgeColor(index), // Dynamic badge color
          fontWeight: "bold",
          padding: "5px 10px",
          borderRadius: "20%",
          fontSize: "0.9em",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          zIndex: 1,
        }}
      >
        No. {index + 1}
      </div>

      {/* Image Section */}
      <div
        style={{
          width: "80px",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: "8px",
          marginLeft: "10px",
          border: "2px solid #ccc",
          padding: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src={
            occupation.image ||
            "https://awe.edu.vn/wp-content/uploads/2019/07/4bd5da7d0231d26f8b20.jpg"
          }
          alt={occupation.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <div style={{ width: "100%" }}>
        {/* Text Section */}
        <Box
          style={{
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "70px",
            textAlign: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: "1.1em",
              color: "#333",
              marginBottom: "5px",
              textOverflow: "ellipsis",
            }}
          >
            {occupation.name}
          </Text>
        </Box>

        {/* Button Section */}
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "40%",
          }}
        >
          <Button
            size="small"
            style={{
              backgroundColor: "#FF9900",
              color: "#fff",
              borderRadius: "28px",
              fontSize: "0.8em",
              padding: "6px 16px",
              width: "auto",
            }}
            onClick={handleClick}
          >
            Khám phá
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default OccupationCard;
