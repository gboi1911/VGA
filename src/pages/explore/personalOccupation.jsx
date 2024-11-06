import React, { useState, useEffect } from "react";
import { Page, Text, Box, Input } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getHistoryTest } from "api/personal";

const PersonalOccupation = ({ studentId }) => {
  const [occupation, setOccupation] = useState(null);
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
  return (
    <Page>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        Kết quả các ngành phù hợp
      </Text>
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {occupation?.historyMajor?.map((major) => (
          <Box
            key={major.majorId}
            style={{
              padding: "16px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
            onClick={() => navigate(`/majorDetail/${major.majorId}`)}
          >
            <img
              src="https://img.freepik.com/free-vector/internship-job-concept-illustration_23-2148754785.jpg?t=st=1730826649~exp=1730830249~hmac=15c033cb1760b40e7d7d9cc0de0090b0ea875bf12accaf07fef9ddebdeb7caca&w=740"
              alt={major.majorName}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "1.1em",
                marginBottom: "8px",
              }}
            >
              {major.majorName}
            </Text>
          </Box>
        ))}
      </Box>
    </Page>
  );
};

export default PersonalOccupation;
