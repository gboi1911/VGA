import React, { useState, useEffect } from "react";
import { Page, Text, Box, Input, Header, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getHistoryTest } from "api/personal";

const PersonalOccupation = ({ studentId }) => {
  const [occupation, setOccupation] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOccupation = async () => {
      try {
        const response = await getHistoryTest(studentId);
        setOccupation(response.data);
      } catch (error) {
        console.error("Error in fetch occupation:", error);
      }
    };
    fetchOccupation();
  }, [studentId]);

  const handleToggleCategory = (categoryIndex) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex],
    }));
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 !== 0; // Half star if rating is not an integer
    const emptyStars = 5 - Math.ceil(rating); // Empty stars to fill up to 5

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} style={{ color: "#FFD700" }}>
            ★
          </span>
        ))}
        {halfStar && <span style={{ color: "#FFD700" }}>☆</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} style={{ color: "#ddd" }}>
            ★
          </span>
        ))}
      </>
    );
  };

  return (
    <>
      <Page className="page">
        <Header title="Ngành học phù hợp" style={{ textAlign: "start" }} />
        {/* <Box
          style={{
            textAlign: "center",
            marginBottom: "10px",
            width: "100%",
            padding: "20px 0",
          }}
        > */}
        {/* <Text
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#3B3B98",
              letterSpacing: "0.5px",
            }}
          >
            Kết quả đánh giá
          </Text> */}
        {/* </Box> */}

        {!occupation?.historyMajor?.length &&
        !occupation?.majorByHollandResult?.length ? (
          <Text
            style={{
              color: "gray",
              textAlign: "center",
              margin: "20px 0",
            }}
          >
            Chưa có kết quả
          </Text>
        ) : (
          <>
            {/* History Major Section */}
            <Box
              style={{
                display: "flex",
                flexWrap: "nowrap",
                overflowX: "auto",
                gap: "15px",
                padding: "0 10px",
                marginBottom: "30px",
              }}
            >
              {occupation?.historyMajor?.map((major) => (
                <Box
                  key={major.majorId}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "12px",
                    padding: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "220px",
                    height: "200px",
                    textAlign: "center",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={major.image}
                    alt={major.majorName}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      marginBottom: "10px",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#333",
                      height: "44px",
                    }}
                  >
                    {major.majorName}
                  </Text>
                  <Text
                    style={{
                      color: "#7D8799",
                      marginTop: "15px",
                      fontSize: "16px",
                    }}
                  >
                    Đánh giá: {renderStars(major.rating)}
                  </Text>
                </Box>
              ))}
            </Box>

            {/* Major by Holland Result Section */}
            <Box
              style={{
                textAlign: "center",
                marginBottom: "10px",
                width: "100%",
                padding: "20px 0",
              }}
            >
              {/* <Text
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#3B3B98",
                  letterSpacing: "0.5px",
                }}
              >
                Ngành học phù hợp
              </Text> */}
              {/* <Text
                style={{
                  fontSize: "1.1rem",
                  color: "#7D8799",
                  marginTop: "20px",
                }}
              >
                Dưới đây là danh sách các ngành học phù hợp dựa theo kết quả bài
                test bạn đã thực hiện
              </Text> */}
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
                maxWidth: "700px",
              }}
            >
              {occupation?.majorByHollandResult?.map(
                (category, categoryIndex) => (
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
                            onClick={() => navigate(`/majorDetail/${major.id}`)}
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
                )
              )}
            </Box>
          </>
        )}
      </Page>
    </>
  );
};

export default PersonalOccupation;
