import React, { useState } from "react";
import { Box, Text } from "zmp-ui";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";

const RatingMajorCard = ({ major }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    // Gửi rating về backend (nếu cần)
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={"https://futuresa.co.za/wp-content/uploads/2023/10/careers.png"}
          alt={major.name}
          style={{ width: "50px", height: "50px", marginRight: "16px" }}
        />
        <div>
          <Text>{major.name}</Text>
          <StarRatings
            rating={rating}
            starRatedColor="gold"
            changeRating={handleRatingChange}
            numberOfStars={5}
            name={major.id}
          />
        </div>
      </div>
    </Box>
  );
};

export default RatingMajorCard;
