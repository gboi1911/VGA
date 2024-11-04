import React, { useEffect, useState } from "react";
import { Page, Box, Text, Button } from "zmp-ui";
import { useLocation, useNavigate } from "react-router-dom";
import OccupationCard from "../../components/occupationCard"; // Adjust the path as needed

const FilterMajorUniversity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultData } = location.state || {};
  const [displayedMessage, setDisplayedMessage] = useState("");

  useEffect(() => {
    let index = 0;
    const message = resultData.message || "";
    const typingSpeed = 100; // Adjust speed in milliseconds

    const typeMessage = () => {
      if (index < message.length) {
        setDisplayedMessage((prev) => prev + message[index]);
        index++;
        setTimeout(typeMessage, typingSpeed);
      }
    };

    typeMessage(); // Start typing effect

    return () => clearTimeout(typeMessage); // Cleanup on unmount
  }, [resultData.message]);

  const handleFinish = () => {
    navigate("/test");
  };

  return (
    <Page
      className="page"
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        overflow: "hidden", // Prevent multiple scrollbars
      }}
    >
      <Text
        style={{
          fontSize: "1em",
          marginBottom: "20px",
          textAlign: "center",
          marginTop: "60px",
          color: "#0066CC",
        }}
      >
        {displayedMessage}
      </Text>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {resultData.data.occupations.map((occupation, index) => (
          <OccupationCard key={index} occupation={occupation} />
        ))}
      </Box>
      <Button
        style={{
          backgroundColor: "#FF6600",
          color: "#FFF",
          borderRadius: "8px",
          padding: "12px 24px",
          marginTop: "30px",
          marginBottom: "40px",
          fontSize: "1.2em",
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        onClick={handleFinish}
      >
        Kết thúc
      </Button>
    </Page>
  );
};

export default FilterMajorUniversity;
