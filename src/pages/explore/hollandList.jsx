import React, { useState, useEffect } from "react";
import { Page, Text, Box, Modal, Button, Header } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getTestList } from "api/test";

const Holland = () => {
  const [testList, setTestList] = useState([]);
  const testTypeId = "b3d9e9d7-6e2a-4d5b-9b35-4f28f9b0a0e8";
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
    navigate("/hollandTest", { state: { id, point } });
  };

  return (
    <Page className="page">
      <Header title="Holland" />
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
              src="https://letstalkscience.ca/sites/default/files/2020-10/Holland_hexagon_0.png"
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
  );
};

export default Holland;
