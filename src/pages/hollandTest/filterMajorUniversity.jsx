import React, { useEffect, useState, useRef } from "react";
import { Page, Box, Text, Button } from "zmp-ui";
import { useLocation, useNavigate } from "react-router-dom";
import OccupationCard from "../../components/occupationCard"; // Adjust the path as needed

const FilterMajorUniversity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultData } = location.state || {};
  const [displayedMessage, setDisplayedMessage] = useState("");
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const message = resultData?.message || "";
    const typingSpeed = 100;

    // Clear the previous timeout on new message
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    const typeMessage = () => {
      if (index < message.length) {
        setDisplayedMessage((prev) => prev + message.charAt(index));
        index++;
        typingTimeoutRef.current = setTimeout(typeMessage, typingSpeed);
      }
    };

    // Reset displayedMessage once at the start
    setDisplayedMessage("");
    typeMessage();

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [resultData?.message]);

  const handleFinish = () => {
    navigate("/explore");
  };

  return (
    <Page
      className="page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontSize: "1.2em",
            marginBottom: "20px",
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
            width: "100%",
          }}
        >
          {resultData?.data?.map((major, majorIndex) => (
            <div
              key={majorIndex}
              style={{
                marginBottom: "20px",
                textAlign: "center",
                width: "100%",
              }}
            >
              <Text
                style={{ fontWeight: "bold", margin: "20px 0", color: "#333" }}
              >
                {major.majorName}
              </Text>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {major._occupations?.map((occupation, occupationIndex) => (
                  <OccupationCard
                    key={occupationIndex}
                    occupation={occupation}
                  />
                ))}
              </Box>
            </div>
          ))}
        </Box>
      </Box>
      <Button
        style={{
          backgroundColor: "#FF6600",
          color: "#FFF",
          borderRadius: "8px",
          padding: "12px 24px",
          marginTop: "30px",
          fontSize: "1.2em",
          width: "80%",
          maxWidth: "300px",
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
