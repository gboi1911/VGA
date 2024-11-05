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
      {occupation?.historyTests?.map((test) => (
        <Box
          key={test.personalTestId}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "32px",
          }}
        >
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "20px",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            Kết quả
          </Text>
          <img
            src="https://img.freepik.com/free-vector/naive-jobs-stickers-set_52683-84997.jpg?t=st=1730825748~exp=1730829348~hmac=59f22c624c75e619de7c68fc7a4b4134807599d344f7b9ab3e30f3f38be20e9e&w=740"
            alt="Test"
            style={{
              width: "90%",
              height: "280px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
          <Text
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "8px",
            }}
          >
            {test.personalTestName}
          </Text>
          <Text style={{ color: "#666", marginBottom: "8px" }}>
            Mã nhóm: <strong>{test.personalGroupCode}</strong>
          </Text>
          <Text
            style={{ color: "#333", fontWeight: "bold", marginBottom: "8px" }}
          >
            {test.personalGroupName}
          </Text>
          <Text style={{ color: "#666", textAlign: "center" }}>
            {test.personalGroupDescription}
          </Text>
        </Box>
      ))}
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
