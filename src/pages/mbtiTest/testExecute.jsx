import React, { useState, useEffect } from "react";
import {
  Page,
  Box,
  Text,
  Radio,
  Button,
  Icon,
  Modal,
  Spinner,
  Progress,
} from "zmp-ui"; // Import Progress
import { useNavigate } from "react-router-dom";
import { getTestData, postMBTIResult } from "../../api/test";

const TestExecute = ({ studentId, accountId }) => {
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vibrateEffect, setVibrateEffect] = useState(false);
  const navigate = useNavigate();

  console.log("account id:", accountId);

  useEffect(() => {
    const fetchQuestions = async () => {
      const id = "d7eae2f2-ff5c-4b5d-8c6c-4b5e21d8a57c";
      try {
        const response = await getTestData(id, accountId);
        if (response && response.data && response.data.questionModels) {
          const fetchedQuestions = response.data.questionModels.map((q) => ({
            id: q.id,
            content: q.content,
            answers: q.answerModels.map((ans) => ({
              id: ans.id,
              content: ans.content,
              answerValue: ans.answerValue,
            })),
          }));
          setQuestions(fetchedQuestions);
        } else {
          console.error(
            "API response does not contain questionModels:",
            response
          );
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleChoiceChange = (questionId, choice) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choice.id,
    }));

    // Add a delay before changing the question index
    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => {
        const nextQuestionIndex = prevIndex + 1;
        if (nextQuestionIndex < questions.length) {
          return nextQuestionIndex;
        }
        return prevIndex;
      });
    }, 1000); // Adjust the delay time as needed
  };

  const handleNextClick = () => {
    const currentQuestionId = questions[currentQuestionIndex].id;

    if (!answers[currentQuestionId]) {
      // Trigger vibration and red border effect
      setVibrateEffect(true);
      setTimeout(() => setVibrateEffect(false), 500); // Remove the effect after 500ms
    } else {
      // Move to the next question if answered
      setCurrentQuestionIndex((prev) =>
        Math.min(prev + 1, questions.length - 1)
      );
    }
  };

  const handleFinish = async () => {
    // Check if all questions have been answered
    if (Object.keys(answers).length < questions.length) {
      setIsModalVisible(true); // Show the modal if not all questions are answered
      return;
    }

    const listQuestionId = Object.keys(answers).map(Number);
    const listAnswerId = Object.values(answers);

    const requestData = {
      studentId: studentId,
      personalTestId: "d7eae2f2-ff5c-4b5d-8c6c-4b5e21d8a57c",
      listQuestionId: listQuestionId,
      listAnswerId: listAnswerId,
      date: new Date().toISOString(),
    };

    try {
      const response = await postMBTIResult(requestData);
      if (response && response.data) {
        navigate("/testResult", { state: { resultData: response.data } });
      } else {
        console.error("Error: No response data");
      }
    } catch (error) {
      console.error("Error posting test results:", error);
    }
  };

  if (!questions.length || loading) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner />
        <Text>Loading questions...</Text>
      </Box>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Calculate progress percentage
  const progressPercentage =
    (Object.keys(answers).length / questions.length) * 100;

  return (
    <Page
      className="page bg-theme-image"
      style={{ minHeight: "100vh", marginTop: "40px" }}
    >
      <Box style={{ padding: "8px" }}>
        <Box>
          <img
            src="https://wallpapercave.com/wp/wp1949793.jpg"
            alt="image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
              animation: "zoomInOut 8s infinite", // Thêm animation
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

        {/* Progress Bar */}
        <Box
          style={{
            marginTop: "12px",
            maxWidth: "95%",
            marginLeft: "10px",
          }}
        >
          <Progress completed={progressPercentage} maxCompleted={100} />
        </Box>

        <Box
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            height: "340px",
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
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
              }
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#2c5282",
                textAlign: "center",
                flex: 1, // Ensure the text takes up the remaining space
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
              color: "#4a5568",
              fontSize: "16px",
              marginBottom: "24px",
              height: "70px",
              border: "2px solid #2b6cb0", // Thêm đường viền xung quanh
              borderRadius: "8px", // Tùy chọn: bo góc
              padding: "8px", // Tùy chọn: thêm khoảng cách bên trong viền
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {currentQuestion.content}
          </Text>

          <Box>
            {Array.isArray(currentQuestion.answers) &&
              currentQuestion.answers.map((choice) => (
                <label
                  key={choice.id}
                  style={{
                    display: "flex",
                    padding: "12px",
                    border: "1px solid #cbd5e0",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    backgroundColor:
                      answers[currentQuestion.id] === choice.id
                        ? "#c3e6cb"
                        : "#ebf4ff", // Thay đổi màu nền khi được chọn
                  }}
                >
                  <Radio
                    checked={answers[currentQuestion.id] === choice.id}
                    onChange={() =>
                      handleChoiceChange(currentQuestion.id, choice)
                    }
                  />
                  <Text
                    style={{
                      marginLeft: "8px",
                      color: "#2b6cb0",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {choice.content}
                  </Text>
                </label>
              ))}
          </Box>
        </Box>
      </Box>
      {/* <Box
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          padding: "16px",
        }}
      >
        {currentQuestionIndex > 0 && (
          <Button
            style={{
              backgroundColor: "#0066CC",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "50px",
            }}
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
            }
          >
            <Icon icon="zi-chevron-left" />
          </Button>
        )}
        <Button
          style={{
            backgroundColor: "#0066CC",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "50px",
          }}
          onClick={() =>
            setCurrentQuestionIndex((prev) =>
              Math.min(prev + 1, questions.length - 1)
            )
          }
        >
          <Icon icon="zi-chevron-right" />
        </Button>
      </Box> */}
      {currentQuestionIndex === questions.length - 1 && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Button
            style={{
              backgroundColor: "#0066CC",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleFinish}
          >
            Hoàn thành
          </Button>
        </Box>
      )}
      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Thông báo"
      >
        <Text style={{ textAlign: "center" }}>
          Hãy hoàn thành tất cả các câu hỏi trước khi kết thúc!
        </Text>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <Button onClick={() => setIsModalVisible(false)}>OK</Button>
        </Box>
      </Modal>
    </Page>
  );
};

export default TestExecute;
