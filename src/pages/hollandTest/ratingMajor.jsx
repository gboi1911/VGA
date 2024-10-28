import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Page, Box, Text, Button, Icon, Picker } from "zmp-ui";
import { getRatingMajor, getRegion, postMajor } from "api/test";

const RatingCard = ({ major, rating, onRate }) => {
  const handleRating = (rate) => {
    onRate(major.id, rate);
  };

  return (
    <Box
      style={{
        width: "250px", // Increased width
        height: "300px", // Increased height
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.15)", // Slightly stronger shadow
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px", // Increased padding
        transition: "opacity 0.5s ease-in-out",
        overflow: "hidden",
      }}
    >
      <img
        src="https://bizweb.dktcdn.net/100/021/721/articles/nhungdieuitbiet.png?v=1620635748643"
        alt={major.name}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "150px", // Increased max height
          borderRadius: "10px",
        }}
      />
      <Text
        style={{
          alignItems: "center",
          textAlign: "center",
          marginBottom: "15px", // Increased bottom margin
          height: "50px", // Increased height for better text visibility
          marginTop: "10px",
          flexShrink: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {major.name}
      </Text>
      <div style={{ marginBottom: "15px" }}>
        {" "}
        {/* Increased bottom margin */}
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            style={{
              cursor: "pointer",
              color: star <= rating ? "gold" : "gray",
              fontSize: "24px", // Increased star size
              margin: "0 5px", // Added margin between stars
            }}
          >
            ★
          </span>
        ))}
      </div>
    </Box>
  );
};

const RatingMajor = () => {
  const [ratingMajors, setRatingMajors] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedTuitionFee, setSelectedTuitionFee] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [ratings, setRatings] = useState({}); // State for all ratings

  const { resultData } = location.state || {};

  const tuitionFees = [
    { value: 10000000, displayName: "10 triệu" },
    { value: 20000000, displayName: "20 triệu" },
    { value: 30000000, displayName: "30 triệu" },
    { value: 50000000, displayName: "50 triệu" },
    { value: 100000000, displayName: "100 triệu" },
    { value: 200000000, displayName: "200 triệu" },
    { value: 300000000, displayName: "300 triệu" },
  ];

  const academicYears = [2025, 2026, 2027].map((year) => ({
    value: year,
    displayName: `${year}`,
  }));

  useEffect(() => {
    const fetchRatingMajor = async () => {
      try {
        const response = await getRatingMajor(resultData.stTestId);
        setRatingMajors(response.data.data);

        // Initialize ratings for all majors
        const initialRatings = {};
        response.data.data.forEach((major) => {
          initialRatings[major.id] = 0; // Default rating is 0
        });
        setRatings(initialRatings);
      } catch (error) {
        console.error("Error fetching rating major:", error);
      }
    };

    const fetchRegion = async () => {
      try {
        const response = await getRegion();
        setRegions(response.data.regions);
      } catch (error) {
        console.error("Error fetching region:", error);
      }
    };

    fetchRatingMajor();
    fetchRegion();
  }, [resultData]);

  const handleNext = () => {
    if (currentCardIndex < ratingMajors.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleRate = (id, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: rating,
    }));
  };

  const handleFinish = async () => {
    const postResults = async () => {
      console.log("Fee:", selectedTuitionFee);
      console.log("year:", selectedYear);
      console.log("region:", selectedRegion);
      const payload = {
        studentChoiceModel: {
          studentTestId: resultData.stTestId,
          models: ratingMajors.map((major) => ({
            id: major.id,
            name: major.name,
            rating: ratings[major.id], // Use the rating from state
            type: 1,
          })),
        },
        filterInfor: {
          admissionMethodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          tuitionFee: selectedTuitionFee.tuition.value,
          year: selectedYear.academicYear.value,
          region: selectedRegion.region.value,
        },
      };
      try {
        const response = await postMajor(payload);
        if (response && response.data) {
          navigate("/filterMajorUniversity", {
            state: { resultData: response.data },
          });
        } else {
          console.error("Failed to submit test results:", response);
        }
      } catch (error) {
        console.error("Error in post major:", error);
      }
    };

    await postResults();
  };

  return (
    <Page className="page">
      <Box style={{ marginTop: "40px" }}>
        <Text
          style={{
            color: "#0066CC",
            alignItems: "center",
            textAlign: "center",
            width: "200px",
            marginLeft: "100px",
          }}
        >
          Đánh giá các ngành học theo mức độ hứng thú của bạn
        </Text>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            icon="zi-chevron-left"
            onClick={handleBack}
            disabled={currentCardIndex === 0}
          />
          <div style={{ margin: "20px", display: "flex", flexWrap: "wrap" }}>
            {ratingMajors.map((major, index) => (
              <div
                key={major.id}
                style={{
                  display: index === currentCardIndex ? "block" : "none",
                }}
              >
                <RatingCard
                  major={major}
                  rating={ratings[major.id]}
                  onRate={handleRate}
                />
              </div>
            ))}
          </div>
          <Icon
            icon="zi-chevron-right"
            onClick={handleNext}
            disabled={currentCardIndex === ratingMajors.length - 1}
          />
        </div>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          mt={8}
          style={{
            width: "350px",
            borderRadius: "10px",
            backgroundColor: "white",
            padding: "10px",
          }}
        >
          <Text.Title
            size="large"
            style={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            Thông tin nguyện vọng
          </Text.Title>
          <Box mt={4}>
            <Picker
              label="Học phí hằng năm"
              placeholder="Chọn học phí"
              helperText="Mức học phí dao động"
              mask
              maskClosable
              title="Học phí hằng năm"
              action={{
                text: "Close",
                close: true,
              }}
              data={[{ options: tuitionFees, name: "tuition" }]}
              onChange={(value) => setSelectedTuitionFee(value)} // Capture selected tuition fee
            />
          </Box>
          <Box mt={2}>
            <Picker
              label="Tỉnh thành"
              placeholder="Chọn tỉnh thành"
              mask
              maskClosable
              title="Tỉnh thành"
              action={{
                text: "Close",
                close: true,
              }}
              data={[
                {
                  options: regions.map((region) => ({
                    value: region.id,
                    displayName: region.name,
                  })),
                  name: "region",
                },
              ]}
              onChange={(value) => setSelectedRegion(value)} // Capture selected region
            />
          </Box>
          <Box mt={2}>
            <Picker
              label="Năm nhập học"
              placeholder="Chọn năm học"
              mask
              maskClosable
              title="Năm nhập học"
              action={{
                text: "Close",
                close: true,
              }}
              data={[{ options: academicYears, name: "academicYear" }]}
              defaultValue={[2025]}
              onChange={(value) => setSelectedYear(value)} // Capture selected year
            />
          </Box>
        </Box>
      </div>
      <Button
        style={{
          backgroundColor: "#FF6600",
          color: "#FFF",
          borderRadius: "8px",
          padding: "12px 24px",
          marginTop: "30px",
          fontSize: "1.2em",
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        onClick={handleFinish} // Call handleFinish on button click
      >
        Tiếp theo
      </Button>
    </Page>
  );
};

export default RatingMajor;
