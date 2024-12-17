import React, { useState, useEffect } from "react";
import { Page, Box, Text, Button, Progress, Icon, Header } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";
import { getTestData, postMBTIResult } from "../../api/test"; // Điều chỉnh API nếu cần
import moment from "moment";

const TestExecuteHolland = ({ studentId, accountId }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState({}); // Quản lý trạng thái đã chọn
  const [testCompleted, setTestCompleted] = useState(false);
  const [vibrateEffect, setVibrateEffect] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  // const id = "c8f6e5a3-4b3c-4d3a-8f5e-1c9a7d40d0b7";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getTestData(id, accountId);
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

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [currentQuestion.id]: answer, // Save answer by question ID
    }));

    if (answer === "yes") {
      setSelectedQuestionIds((prevIds) => [...prevIds, currentQuestion.id]);
    }

    // Automatically move to next question after a delay
    setTimeout(handleNextQuestion, 1000);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= questions.length) {
        setTestCompleted(true);
      }
      return Math.min(nextIndex, questions.length - 1);
    });
  };

  const progress =
    questions.length > 0
      ? ((currentQuestionIndex + 1) / questions.length) * 100
      : 0;

  const handleNextClick = () => {
    if (!selectedAnswer[currentQuestion.id]) {
      setVibrateEffect(true);
      setTimeout(() => setVibrateEffect(false), 500);
    } else {
      setCurrentQuestionIndex((prev) =>
        Math.min(prev + 1, questions.length - 1)
      );
    }
  };

  const handleFinish = () => {
    if (!testCompleted) {
      console.warn("Test is not completed yet!");
      return;
    }

    const postResults = async () => {
      const payload = {
        studentId,
        personalTestId: id,
        listQuestionId: selectedQuestionIds,
        listAnswerId: [],
        date: moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
      };

      try {
        const response = await postMBTIResult(payload);
        if (response && response.data) {
          navigate("/testResultHolland", {
            state: { resultData: response.data },
          });
        } else {
          console.error("Failed to submit test results:", response);
        }
      } catch (error) {
        console.error("Error submitting test results:", error);
      }
    };

    postResults();
  };

  const handleBack = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  if (!id) {
    return <Text>ko tim thay bai test</Text>;
  }

  if (!currentQuestion) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Page
        className="page page-content"
        style={{
          position: "relative",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Box>
          <img
            src="https://www.premiumschools.org/wp-content/uploads/2021/09/Happiest-Careers-That-Pay-Well-Divider.png"
            alt="image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              animation: "zoomInOut 8s infinite",
            }}
            role="presentation"
          />
        </Box>
        <style>
          {`
  @keyframes zoomInOut {
    0% {
      transform: scale(0.9); /* Thu nhỏ */
    }
    50% {
      transform: scale(1); /* Phóng to */
    }
    100% {
      transform: scale(0.9); /* Quay về kích thước ban đầu */
    }
  }

  @keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
  `}
        </style>
        <Box
          style={{
            marginTop: "12px",
            maxWidth: "95%",
            marginLeft: "10px",
          }}
        >
          <Progress completed={progress} maxCompleted={100} />
        </Box>
        <Box
          style={{
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "10px",
            maxWidth: "600px",
            textAlign: "center",
            height: "180px",
            border: `2px solid ${vibrateEffect ? "#e53e3e" : "#2b6cb0"}`,
            animation: vibrateEffect ? "shake 0.5s" : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <Icon
              icon="zi-chevron-left"
              style={{ color: "#003399", fontSize: "23px", fontWeight: "bold" }}
              onClick={handleBack}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#2c5282",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              Câu hỏi: {currentQuestionIndex + 1} trên {questions.length}
            </Text>
            <Icon
              icon="zi-chevron-right"
              style={{ color: "#003399", fontSize: "23px", fontWeight: "bold" }}
              onClick={handleNextClick}
            />
          </div>
          <Text
            style={{
              border: "2px solid #0066cc",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#f2f2f2",
              color: "#333",
              fontSize: "1.1em",
              height: "110px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {currentQuestion.content}
          </Text>
        </Box>

        {/* Nút Dung và Sai */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px", // Gần nhau hơn
            marginTop: "20px",
          }}
        >
          <Button
            style={{
              backgroundColor:
                selectedAnswer[currentQuestion.id] === "yes"
                  ? "#4CAF50"
                  : "grey",
              color: "#fff",
              borderRadius: "10px",
              padding: "40px 60px", // Nút lớn hơn
              fontSize: "1.2em",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex", // Đảm bảo dùng flexbox
              justifyContent: "center", // Căn giữa theo chiều ngang
              alignItems: "center", // Căn giữa theo chiều dọc
            }}
            onClick={() => handleSelectAnswer("yes")}
          >
            Đúng
          </Button>

          <Button
            style={{
              backgroundColor:
                selectedAnswer[currentQuestion.id] === "no"
                  ? "#dc3545"
                  : "grey",
              color: "#fff",
              borderRadius: "10px",
              padding: "40px 70px", // Nút lớn hơn
              fontSize: "1.2em",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex", // Đảm bảo dùng flexbox
              justifyContent: "center", // Căn giữa theo chiều ngang
              alignItems: "center",
            }}
            onClick={() => handleSelectAnswer("no")}
          >
            Sai
          </Button>
        </div>

        {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <Button
          style={{
            backgroundColor: "#0066CC",
            color: "#fff",
            borderRadius: "10px",
            padding: "8px 16px",
            fontSize: "1em",
            minWidth: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleBack}
        >
          <Icon icon="zi-chevron-left" />
        </Button>

        <Button
          style={{
            backgroundColor: "#0066CC",
            color: "#fff",
            borderRadius: "10px",
            padding: "8px 16px",
            fontSize: "1em",
            minWidth: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleNextQuestion}
        >
          <Icon icon="zi-chevron-right" />
        </Button>
      </div> */}

        {testCompleted && (
          <div
            style={{
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <Button
              style={{
                backgroundColor: "#0066CC",
                color: "#fff",
                borderRadius: "10px",
                padding: "12px 126px",
                fontSize: "1.2em",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={handleFinish}
            >
              Hoàn thành
            </Button>
          </div>
        )}
      </Page>
    </>
  );
};

export default TestExecuteHolland;
