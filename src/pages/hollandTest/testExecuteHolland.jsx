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
        const response = await getMBTITestQuestions(3); // Replace with your correct API call
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
        // Set state to indicate test completion
        setTestCompleted(true);
        return prevIndex;
      }
    });
  };

  useEffect(() => {
    if (testCompleted) {
      const postResults = async () => {
        const payload = {
          "student-id": "4976d084-1b15-4e3f-a184-2a8493cfbb6c", // Replace with actual student ID
          "personal-test-id": 3, // Assuming this is the test ID
          "list-question-id": selectedQuestionIds,
          "list-answer-id": [], // Assuming answers are not required in this case
          "date": new Date().toISOString(), // Current date in ISO format
        };
  
        try {
          const response = await postMBTIResult(payload); // Assuming postMBTIResult is the API function
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
    return <Text>Loading...</Text>; // Show loading while waiting for questions
  }

  return (
    <Page className="page relative bg-theme-image3">
      <Box>
        <img
          src="https://www.premiumschools.org/wp-content/uploads/2021/09/Happiest-Careers-That-Pay-Well-Divider.png"
          alt="image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          role="presentation"
        />
      </Box>
      <Box>
        <div className="flex flex-col space-x-1 mt-8">
          <Text bold>
            Question {currentQuestionIndex + 1} of {questions.length}:
          </Text>
          <Text
            className="mb-2 mt-2"
            style={{
              border: "2px solid #CC6699",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              textAlign: "center",
            }}
          >
            {currentQuestion.content}
          </Text>
        </div>
      </Box>
      <div className="flex justify-center mt-12 space-x-4">
        {testCompleted ? (
          <Button
            className="transition-transform transform hover:scale-105"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
            type="info"
            onClick={() => navigate("/testResultHolland", { state: { resultData: response.data } })}
          >
            Finish
          </Button>
        ) : (
          <>
            <Button
              className="transition-transform transform hover:scale-105"
              style={{
                backgroundColor: "#33cc33",
                color: "white",
                borderRadius: "8px",
                padding: "10px 20px",
              }}
              type="primary"
              onClick={handleYes}
            >
              Yes
            </Button>
            <Button
              className="transition-transform transform hover:scale-105"
              style={{
                backgroundColor: "#FF6666",
                color: "white",
                borderRadius: "8px",
                padding: "10px 20px",
              }}
              type="danger"
              onClick={handleNo}
            >
              No
            </Button>
          </>
        )}
      </div>
    </Page>
  );
};

export default TestExecuteHolland;
