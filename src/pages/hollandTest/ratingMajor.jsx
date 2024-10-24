import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Page, Box, Text, Button } from "zmp-ui";
import { getRatingMajor } from "api/test";

const RatingMajor = () => {
  const [ratingMajors, setRatingMajors] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const { resultData } = location.state || {};

  useEffect(() => {
    const fetchRatingMajor = async () => {
      try {
        const response = await getRatingMajor(resultData.stTestId);
        setRatingMajors(response.data);
      } catch (error) {
        console.error("Error fetching rating major:", error);
      }
    };

    fetchRatingMajor();
  }, [resultData]);

  const handleNext = () => {
    const nextIndex = (currentCardIndex + 1) % ratingMajors.length;
    setCurrentCardIndex(nextIndex);
  };

  const handleBack = () => {
    const prevIndex =
      currentCardIndex === 0 ? ratingMajors.length - 1 : currentCardIndex - 1;
    setCurrentCardIndex(prevIndex);
  };

  return (
    <Page className="page">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleBack} disabled={currentCardIndex === 0}>
          Quay lại
        </Button>
        <div style={{ margin: "20px", display: "flex", flexWrap: "wrap" }}>
          {ratingMajors.map((major, index) => (
            <Box
              key={major.id}
              style={{
                transform: `rotate(${(index * 360) / ratingMajors.length}deg)`,
                position: "absolute",
                width: "200px",
                height: "200px",
                borderRadius: "10px",
                backgroundColor: "white",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: index === currentCardIndex ? 1 : 0.5,
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              <Text>{major.name}</Text>
              {/* Add your card content and rating component here */}
            </Box>
          ))}
        </div>
        <Button onClick={handleNext}>Tiếp theo</Button>
      </div>
    </Page>
  );
};

export default RatingMajor;
