import React, { useState, useEffect } from "react";
import { Page, Text, Box } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getMajor, getMajorCategory } from "api/major";

const Major = () => {
  const [majors, setMajors] = useState([]);
  const [majorCategories, setMajorCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await getMajor();
        setMajors(response.data.majors || []);
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    };

    const fetchMajorCategories = async () => {
      try {
        const response = await getMajorCategory();
        setMajorCategories(response.data.majorCategorys || []);
      } catch (error) {
        console.error("Error fetching major categories:", error);
      }
    };

    fetchMajors();
    fetchMajorCategories();
  }, []);

  const filteredMajors = selectedCategoryId
    ? majors.filter((major) => major.majorCategoryId === selectedCategoryId)
    : majors;

  return (
    <Page className="page">
      {/* Title */}
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "48px",
          marginTop: "40px",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        Ngành học
      </Text>

      {/* Major Categories */}
      <div
        style={{
          display: "flex",
          overflowX: "auto", // Hide overflow
          marginBottom: "16px",
          padding: "12px 16px",
          backgroundColor: "#f8f9fa",
        }}
      >
        {selectedCategoryId && (
          <Box
            style={{
              flex: "0 0 auto",
              background: "#007bff",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
            onClick={() => setSelectedCategoryId(null)}
          >
            Tất cả
          </Box>
        )}
        <div
          style={{
            display: "flex",
            transition: "transform 0.5s ease",
          }}
        >
          {majorCategories.map((category) => (
            <Box
              key={category.id}
              style={{
                flex: "0 0 auto",
                background: "#007bff",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                marginRight: "10px",
              }}
              onClick={() => {
                setSelectedCategoryId(category.id);
              }}
            >
              {category.name}
            </Box>
          ))}
        </div>
      </div>

      {/* Display Filtered Majors in Two Columns */}
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {filteredMajors.map((major) => (
          <Box
            key={major.id}
            style={{
              background: "#f8f9fa",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
            onClick={() => navigate(`/majorDetail/${major.id}`)}
          >
            <img
              src="https://img.freepik.com/premium-vector/cute-boy-happy-graduation-with-cap-gown-cute-kawaii-chibi-cartoon_695415-469.jpg?w=740"
              role="presentation"
            />
            <Text style={{ fontWeight: "bold", marginTop: "10px" }}>
              {major.name}
            </Text>
          </Box>
        ))}
      </Box>
    </Page>
  );
};

export default Major;
