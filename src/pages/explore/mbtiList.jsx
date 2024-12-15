import React, { useState, useEffect } from "react";
import { Page, Text, Box, Modal, Button, Header } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getTestList } from "api/test";

const MBTI = () => {
  const [testList, setTestList] = useState([]);
  const testTypeId = "a5b0a3e1-ca71-493d-9e0d-fb8b0f7e8e84";
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTestList = async () => {
      try {
        const response = await getTestList();
        const questions = response.data.questions;
        const filteredTests = questions.filter(
          (test) => test.testTypeId === testTypeId
        );
        console.log("Filtered Tests:", filteredTests);

        setTestList(filteredTests);
      } catch (error) {
        console.error("Error in get test list:", error.message);
      }
    };

    fetchTestList();
  }, []);

  const handleStart = (id, point) => {
    navigate("/mbtiTest", { state: { id, point } });
  };

  return (
    <>
      <Box
        style={{
          position: "relative",
          height: "42px",
          backgroundColor: "#0369a1",
        }}
      ></Box>
      <Page className="page">
        <Header title="MBTI" />
        <Box>
          {" "}
          {testList.map((test) => (
            <Box
              key={test.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                backgroundColor: "white",
              }}
            >
              {" "}
              <img
                src="https://www.themyersbriggs.com/-/media/Myers-Briggs/Images/GLOBAL/Support/MBTI_Facts.png?h=364&iar=0&w=472&hash=1031E9C0EB3FF9164E8CA73705689B75"
                alt={test.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />{" "}
              <Text
                bold
                style={{
                  textAlign: "center",
                  fontSize: "26px",
                  marginTop: "20px",
                }}
              >
                {test.name}
              </Text>
              <Text
                className="text-gray-600 mt-4 mb-6"
                style={{ textAlign: "center" }}
              >
                {test.description}
              </Text>{" "}
              <Button
                fullWidth
                style={{
                  backgroundColor: "#0066CC",
                }}
                onClick={() => handleStart(test.id, test.point)} // Pass function reference here
              >
                Bắt đầu
              </Button>
            </Box>
          ))}{" "}
        </Box>
      </Page>
    </>
  );
};

export default MBTI;
