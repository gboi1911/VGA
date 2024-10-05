import React, { useState, useEffect } from "react";
import { Page, Box, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getTestData, postMBTIResult } from "../../api/test"; // Adjust API imports as needed

const TestExecuteHolland = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getTestData('c8f6e5a3-4b3c-4d3a-8f5e-1c9a7d40d0b7');
        if (response && response.data && response.data.questionModels) {
          const fetchedQuestions = response.data.questionModels.map((q) => ({
            id: q.id,
            content: q.content,
          }));
          setQuestions(fetchedQuestions);
        } else {
          console.error("API response does not have data:", response);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleYes = () => {
    setSelectedQuestionIds((prevIds) => [...prevIds, currentQuestion.id]);
    handleNextQuestion();
  };

  const handleNo = () => {
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < questions.length) {
        return nextIndex;
      } else {
        setTestCompleted(true);
        return prevIndex;
      }
    });
  };

  const handleFinish = () => {
    if (testCompleted) {
      const postResults = async () => {
        const payload = {
          "studentId": "81787e20-9c9d-4700-9303-042d41f9fa4c",
          "personalTestId": "c8f6e5a3-4b3c-4d3a-8f5e-1c9a7d40d0b7" ,
          "listQuestionId": selectedQuestionIds,
          "listAnswerId": [],
          "date": new Date().toISOString(),
        };

        try {
          const response = await postMBTIResult(payload);
          if (response && response.data) {
            navigate("/testResultHolland", { state: { resultData: response.data } });
          } else {
            console.error("Failed to submit test results:", response);
          }
        } catch (error) {
          console.error("Error submitting test results:", error);
        }
      };

      postResults();
    }
  }

  if (!currentQuestion) {
    return <Text>Loading...</Text>;
  }

  return (
    <Page className="page bg-theme-image3" style={{ position: "relative", fontFamily: "Arial, sans-serif" }}>
      <Box>
        <img
          src="https://www.premiumschools.org/wp-content/uploads/2021/09/Happiest-Careers-That-Pay-Well-Divider.png"
          alt="image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          role="presentation"
        />
      </Box>
      <Box
        style={{
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          margin: "20px auto",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <Text
          style={{ fontWeight: 'bold', fontSize: '18px', color: '#2c5282', marginBottom: '12px' }}
        >
          Câu hỏi: {currentQuestionIndex + 1} trên {questions.length}
        </Text>
        <Text
          style={{
            border: "2px solid #0066cc",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f2f2f2",
            color: "#333",
            fontSize: "1.1em",
          }}
        >
          {currentQuestion.content}
        </Text>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "30px",
        }}
      >
        <Button
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 24px",
            fontSize: "1em",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
          }}
          onClick={handleYes}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Đúng
        </Button>
        <Button
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 24px",
            fontSize: "1em",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
          }}
          onClick={handleNo}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Sai
        </Button>
      </div>
      {testCompleted && (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <Button
            style={{
              backgroundColor: "#0066CC",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 24px",
              fontSize: "1em",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={handleFinish}
          >
            Hoàn thành
          </Button>
        </div>
      )}
    </Page>
  );
};

export default TestExecuteHolland;
