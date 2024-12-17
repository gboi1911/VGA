import React, { useEffect, useState, useRef } from "react";
import { Page, Box, Text, Button } from "zmp-ui";
import { useLocation, useNavigate } from "react-router-dom";
import OccupationCard from "../../components/occupationCard"; // Adjust the path as needed
import { major } from "@mui/material";

const FilterMajorUniversity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultData } = location.state || {};
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});
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

  const handleToggleCategory = (majorIndex) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [majorIndex]: !prev[majorIndex],
    }));
  };

  return (
    <>
      <Page
        className="page page-content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f4f4f8",
          padding: "20px",
        }}
      >
        {/* Title Section */}
        <Box
          style={{
            textAlign: "center",
            marginBottom: "10px",
            marginTop: "20px",
            width: "100%",
            padding: "20px 0",
          }}
        >
          <Text
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#3B3B98",
              letterSpacing: "0.5px",
            }}
          >
            Ngành nghề phù hợp
          </Text>
          <Text
            style={{
              fontSize: "1.1rem",
              color: "#7D8799",
              marginTop: "20px",
            }}
          >
            {resultData.message}
          </Text>
        </Box>

        {/* Cards Section */}
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            maxWidth: "700px",
          }}
        >
          {resultData?.data?.map((major, majorIndex) => (
            <Box
              key={majorIndex}
              style={{
                background: "white",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Card Header */}
              <Box
                style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  padding: "20px 25px",
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)", // Adds depth
                  position: "relative", // For adding accents
                }}
              >
                {/* Decorative Accent */}
                <Box
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    width: "30px",
                    height: "30px",
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    boxShadow: "0 4px 10px rgba(255, 255, 255, 0.3)",
                    zIndex: 0,
                  }}
                />

                {/* Main Text */}
                <Text
                  style={{
                    color: "white",
                    fontSize: "1.5rem", // Increased for clarity
                    fontWeight: "600",
                    textShadow: "1px 1px 5px rgba(0, 0, 0, 0.3)", // Enhances readability
                    zIndex: 1,
                    lineHeight: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  {major.majorName}
                </Text>
              </Box>

              {/* Card Body */}
              <Box
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px", // Better spacing between items
                }}
              >
                {major._occupations
                  .slice(
                    0,
                    expandedCategories[majorIndex]
                      ? major._occupations.length
                      : 10
                  )
                  .map((occupation, occupationIndex) => (
                    <OccupationCard
                      key={occupationIndex}
                      occupation={occupation}
                      index={occupationIndex}
                    />
                  ))}
              </Box>
              {major._occupations?.length > 10 && (
                <Button
                  style={{
                    margin: "16px",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                  onClick={() => handleToggleCategory(majorIndex)}
                >
                  {expandedCategories[majorIndex] ? "Thu gọn" : "Xem thêm"}
                </Button>
              )}
            </Box>
          ))}
        </Box>

        {/* Finish Button */}
        <Button
          style={{
            background: "linear-gradient(90deg, #ff6a00, #ee0979)",
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "10px",
            padding: "15px 40px",
            marginTop: "40px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          }}
          onClick={handleFinish}
        >
          Kết thúc
        </Button>
      </Page>
    </>
  );
};

export default FilterMajorUniversity;
