import React, { useState, useEffect } from "react";
import { Page, Text, Box, Input, Header } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getHistoryTest } from "api/personal";

const Personality = ({ studentId }) => {
  const [personality, setPersonality] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOccupation = async () => {
      try {
        const response = await getHistoryTest(studentId);
        setPersonality(response.data);
      } catch (error) {
        console.error("Error in fetch occupation:", error);
      }
    };
    fetchOccupation();
  }, [studentId]);
  return (
    <>
      <Page>
        <Header title="Tính cách cá nhân" style={{ textAlign: "start" }} />
        {personality?.historyTests?.map((test) => (
          <Box
            key={test.personalTestId}
            style={{
              display: "flex",
              flexDirection: "column",
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
                marginLeft: "18px",
              }}
            />
            <Text
              style={{
                fontSize: "1.5em",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              {test.personalTestName}
            </Text>
            <Text
              style={{
                color: "#666",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              Mã nhóm: <strong>{test.personalGroupCode}</strong>
            </Text>
            <Text
              style={{
                color: "#333",
                fontWeight: "bold",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              {test.personalGroupName}
            </Text>
            <Text style={{ color: "#666", textAlign: "center" }}>
              {test.personalGroupDescription}
            </Text>
          </Box>
        ))}
      </Page>
    </>
  );
};

export default Personality;
