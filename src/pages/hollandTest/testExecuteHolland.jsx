import React, { useState, useEffect } from "react";
import { Page, Box, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getMBTITestQuestions, postMBTIResult } from "../../api/test"; // Adjust API imports as needed

const TestExecuteHolland = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getMBTITestQuestions('c8f6e5a3-4b3c-4d3a-8f5e-1c9a7d40d0b7');
        if (response && response.data) {
          const fetchedQuestions = response.data.map((q) => ({
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

  useEffect(() => {
    if (testCompleted) {
      const postResults = async () => {
        const payload = {
          "student-id": "2AFF7FBC-767A-475B-B3D2-5EC7F2E458F0",
          "personal-test-id": "C8F6E5A3-4B3C-4D3A-8F5E-1C9A7D40D0B7" ,
          "list-question-id": selectedQuestionIds,
          "list-answer-id": [],
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
  }, [testCompleted, selectedQuestionIds, navigate]);

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
          Question {currentQuestionIndex + 1} of {questions.length}
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
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 24px",
              fontSize: "1em",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => navigate("/testResultHolland", { state: { resultData: response.data } })}
          >
            Finish
          </Button>
        </div>
      )}
    </Page>
  );
};

export default TestExecuteHolland;
