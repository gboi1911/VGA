import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Page, Box, Text, Button, Icon, Picker, Modal } from "zmp-ui";
import {
  getRatingMajor,
  getRegion,
  postMajor,
  getAdmissionMethod,
} from "api/test";
import { getMajorById } from "api/major";

const RatingCard = ({
  major,
  rating,
  onRate,
  onFlip,
  isFlipped,
  description,
  onShowMore,
}) => {
  const handleRating = (rate) => {
    onRate(major.id, rate);
  };

  return (
    <Box
      onClick={onFlip}
      style={{
        width: "250px",
        height: "300px",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.15)",
        perspective: "1000px", // Enable 3D perspective
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          transformStyle: "preserve-3d", // Preserve 3D effect for child elements
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.5s ease",
        }}
      >
        {/* Front Face */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden", // Hide back when rotated
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
          }}
        >
          <img
            src="https://bizweb.dktcdn.net/100/021/721/articles/nhungdieuitbiet.png?v=1620635748643"
            alt={major.name}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "150px",
              borderRadius: "10px",
            }}
          />
          <Text
            bold
            style={{
              alignItems: "center",
              textAlign: "center",
              marginBottom: "15px",
              height: "70px",
              marginTop: "20px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "18px",
            }}
          >
            {major.name}
          </Text>
          <div style={{ marginBottom: "15px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRating(star);
                }}
                style={{
                  cursor: "pointer",
                  color: star <= rating ? "gold" : "gray",
                  fontSize: "24px",
                  margin: "0 5px",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Back Face */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden", // Hide front when rotated
            transform: "rotateY(180deg)", // Flip content for back face
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: "16px" }}>
            {description.length > 100 ? (
              <>
                {description.substring(0, 250)}...
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowMore();
                  }}
                  style={{ color: "blue" }}
                >
                  {" "}
                  Xem thêm
                </span>
              </>
            ) : (
              description
            )}
          </Text>
        </div>
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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [ratings, setRatings] = useState({});
  const [completedRatings, setCompletedRatings] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [majorDescription, setMajorDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [admissionMethod, setAdmissionMethod] = useState([]);
  const [selectedAdmissionMethod, setSelectedAdmissionMethod] = useState(null);
  const [isRatingView, setIsRatingView] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const { resultData } = location.state || {};
  console.log("data:", resultData);

  const tuitionFees = [
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

        const initialRatings = {};
        response.data.data.forEach((major) => {
          initialRatings[major.id] = 0;
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

    const fetchAdmissionMethod = async () => {
      try {
        const response = await getAdmissionMethod();
        setAdmissionMethod(response.data._admissionMethodModels);
      } catch (error) {
        console.error("Error in fetch admission method:", error);
      }
    };

    fetchRatingMajor();
    fetchRegion();
    fetchAdmissionMethod();
  }, [resultData]);

  const handleNext = () => {
    if (currentCardIndex < ratingMajors.length - 1) {
      const nextIndex = currentCardIndex + 1;

      // Reset flip state and fetch the description for the next card
      setIsFlipped(false);
      fetchMajorDescription(ratingMajors[nextIndex].id);

      // Update the current card index
      setCurrentCardIndex(nextIndex);
    }
  };

  const handleBack = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleRate = (id, rating) => {
    setRatings((prevRatings) => {
      const newRatings = { ...prevRatings, [id]: rating };
      const newCompletedRatings = Object.values(newRatings).filter(
        (rate) => rate > 0
      ).length;
      setCompletedRatings(newCompletedRatings);
      return newRatings;
    });
  };

  const fetchMajorDescription = async (majorId) => {
    try {
      const response = await getMajorById(majorId);
      setMajorDescription(response.data.data.description);
    } catch (error) {
      console.error("Error fetching major description:", error);
    }
  };

  const handleFlip = (majorId) => {
    // Toggle the flip state and fetch the description for the current card
    fetchMajorDescription(majorId);
    setIsFlipped((prevState) => !prevState);
  };

  const handleFinish = async () => {
    const payload = {
      studentChoiceModel: {
        studentTestId: resultData.stTestId,
        models: ratingMajors.map((major) => ({
          id: major.id,
          name: major.name,
          rating: ratings[major.id],
          type: 1,
        })),
      },
      filterInfor: {
        admissionMethodId: selectedAdmissionMethod?.method?.value,
        tuitionFee: selectedTuitionFee?.tuition?.value,
        year: selectedYear?.academicYear?.value,
        region: selectedRegion?.region?.value,
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

  const handleShowMore = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleToggleCategory = (categoryIndex) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex],
    }));
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
      {/* Conditional Rendering for Major List or Rating View */}
      {!isRatingView ? (
        <>
          {/* Major List Section */}
          <Box
            style={{
              textAlign: "center",
              marginBottom: "10px",
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
              Dưới đây là danh sách các ngành học phù hợp dựa theo kết quả bài
              test bạn đã thực hiện
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
            {resultData?.majorCategories.map((category, categoryIndex) => (
              <Box
                key={categoryIndex}
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
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                      zIndex: 1,
                    }}
                  >
                    {category.name}
                  </Text>
                </Box>

                {/* Majors List */}
                <Box
                  style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {category.majors
                    .slice(
                      0,
                      expandedCategories[categoryIndex]
                        ? category.majors.length
                        : 10
                    )
                    .map((major, majorIndex) => (
                      <Box
                        key={majorIndex}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#f9f9f9",
                          borderRadius: "8px",
                          padding: "10px",
                          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <img
                          src={major.image}
                          alt={major.name}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginRight: "15px",
                          }}
                        />
                        <Text style={{ fontWeight: "bold", flex: 1 }}>
                          {major.name}
                        </Text>
                      </Box>
                    ))}

                  {/* "Xem thêm" Button */}
                  {category.majors.length > 10 && (
                    <Button
                      style={{
                        marginTop: "10px",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                      onClick={() => handleToggleCategory(categoryIndex)}
                    >
                      {expandedCategories[categoryIndex]
                        ? "Thu gọn"
                        : "Xem thêm"}
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
            <Modal
              visible={showConfirmModal}
              onClose={handleCloseModal}
              title="Thông báo"
            >
              <Text style={{ textAlign: "center" }}>
                Việc đánh giá dựa theo sở thich về các ngành học phù hợp với bạn
                để hệ thống chúng tôi gợi ý các nghề nghiệp tương lai
              </Text>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <Button
                  style={{
                    color: "#FFF",
                    padding: "12px 24px",
                    fontSize: "1.2em",
                  }}
                  onClick={() => setIsRatingView(true)}
                >
                  Bắt đầu
                </Button>
              </Box>
            </Modal>
          </Box>

          {/* Navigate to Rating View */}
          <Button
            style={{
              backgroundColor: "#FF6600",
              color: "#FFF",
              borderRadius: "8px",
              padding: "12px 24px",
              marginTop: "30px",
              fontSize: "1.2em",
            }}
            onClick={() => setShowConfirmModal(true)}
          >
            Đánh giá
          </Button>
        </>
      ) : (
        <>
          {/* Rating View */}
          {(completedRatings === ratingMajors.length || !isDisplay) && (
            <Box
              style={{
                // backgroundColor: "#FFFFFF",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Text bold style={{ textAlign: "center", fontSize: "20px" }}>
                Đánh giá ngành học theo mức độ yêu thích ({completedRatings}/
                {ratingMajors.length})
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
                <div
                  style={{ margin: "20px", display: "flex", flexWrap: "wrap" }}
                >
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
                        onFlip={() => handleFlip(major.id)}
                        isFlipped={isFlipped}
                        description={majorDescription}
                        onShowMore={handleShowMore}
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
              {completedRatings != 0 && (
                <Text
                  style={{
                    textAlign: "center",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                  onClick={() => setIsDisplay(true)}
                >
                  Bỏ qua
                </Text>
              )}
            </Box>
          )}

          {/* Other Rating Components */}
          {(completedRatings === ratingMajors.length || isDisplay) && (
            <Box
              mt={8}
              style={{
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "white",
                padding: "20px",
              }}
            >
              <Text.Title
                size="large"
                style={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Thông tin nguyện vọng trường đại học bạn mong muốn
              </Text.Title>
              <Text
                style={{
                  color: "GrayText",
                  textAlign: "center",
                  marginTop: "12px",
                }}
              >
                (Bạn có thể bỏ qua phần tùy chọn này nếu không có nhu cầu)
              </Text>
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
              <Box mt={2}>
                <Picker
                  label="Phương thức xét tuyển"
                  placeholder="Chọn phương thức xét tuyển"
                  mask
                  maskClosable
                  title="Phương thức xét tuyển"
                  action={{
                    text: "Close",
                    close: true,
                  }}
                  data={[
                    {
                      options: admissionMethod.map((method) => ({
                        value: method.id,
                        displayName: method.name,
                      })),
                      name: "method",
                    },
                  ]}
                  onChange={(value) => setSelectedAdmissionMethod(value)} // Capture selected year
                />
              </Box>
              <Button
                style={{
                  backgroundColor: "#FF6600",
                  color: "#FFF",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  marginTop: "30px",
                  fontSize: "1.2em",
                  width: "90%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  marginLeft: "15px",
                }}
                onClick={handleFinish} // Call handleFinish on button click
              >
                Tiếp theo
              </Button>
            </Box>
          )}
          <Modal
            visible={showModal}
            onClose={handleCloseModal}
            title="Mô tả đầy đủ"
          >
            <Text>{majorDescription}</Text>
          </Modal>
        </>
      )}
    </Page>
  );
};

export default RatingMajor;
