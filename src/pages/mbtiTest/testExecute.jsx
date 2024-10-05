import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Page, Box, Text, Radio, Button, Icon, Modal, Spinner } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { getTestData, postMBTIResult } from '../../api/test';

const TestExecute = () => {
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getTestData('d7eae2f2-ff5c-4b5d-8c6c-4b5e21d8a57c');
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
          console.error('API response does not contain questionModels:', response);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
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

  const handleFinish = async () => {
    const listQuestionId = Object.keys(answers).map(Number);
    const listAnswerId = Object.values(answers);

    const requestData = {
      "studentId": "81787e20-9c9d-4700-9303-042d41f9fa4c",
      "personalTestId": "d7eae2f2-ff5c-4b5d-8c6c-4b5e21d8a57c",
      "listQuestionId": listQuestionId,
      "listAnswerId": listAnswerId,
      "date": new Date().toISOString(),
    };

    try {
      const response = await postMBTIResult(requestData);
      if (response && response.data) {
        navigate('/testResult', { state: { resultData: response.data } });
      } else {
        console.error('Error: No response data');
      }
    } catch (error) {
      console.error('Error posting test results:', error);
    }
  };

  if (!questions.length || loading) {
    return (
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner />
        <Text>Loading questions...</Text>
      </Box>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Page className="page bg-theme-image" style={{ minHeight: '100vh' }}>
      <Box style={{ padding: '8px' }}>
        <Box>
          <img
            src="https://wallpapercave.com/wp/wp1949793.jpg"
            alt="image"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            role="presentation"
          />
        </Box>
        <Box style={{ marginTop: '12px', backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Text style={{ fontWeight: 'bold', fontSize: '18px', color: '#2c5282', marginBottom: '12px' }}>
            Câu hỏi: {currentQuestionIndex + 1} trên {questions.length}
          </Text>
          <Text style={{ color: '#4a5568', fontSize: '16px', marginBottom: '24px' }}>
            {currentQuestion.content}
          </Text>
          <Box>
            {Array.isArray(currentQuestion.answers) && currentQuestion.answers.map((choice) => (
              <label
                key={choice.id}
                style={{
                  display: 'flex',
                  padding: '12px',
                  border: '1px solid #cbd5e0',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  backgroundColor: '#ebf4ff',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease-in-out',
                }}
              >
                <Radio
                  checked={answers[currentQuestion.id] === choice.id}
                  onChange={() => handleChoiceChange(currentQuestion.id, choice)}
                />
                <Text style={{ marginLeft: '8px', color: '#2b6cb0' }}>{choice.content}</Text>
              </label>
            ))}
          </Box>
        </Box>
      </Box>

      <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
        {currentQuestionIndex > 0 && (
          <Button
            style={{
              backgroundColor: '#0066CC',
              color: 'white',
              padding: '',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
          >
            <Icon icon="zi-chevron-left" />
          </Button>
        )}
        {currentQuestionIndex === questions.length - 1 ? (
          <Button
            style={{
              backgroundColor: '#3bb77e',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={handleFinish}
          >
            Hoàn thành
          </Button>
        ) : (
          <Button
            style={{
              backgroundColor: '#0066CC',
              color: 'white',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
          >
            <Icon icon="zi-chevron-right" />
          </Button>
        )}
      </Box>

      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Notice"
      >
        <Text>Please select an answer before proceeding to the next question.</Text>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
          <Button onClick={() => setIsModalVisible(false)}>OK</Button>
        </Box>
      </Modal>
    </Page>
  );
};

export default TestExecute;
