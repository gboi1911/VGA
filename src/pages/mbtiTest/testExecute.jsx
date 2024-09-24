import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Page, Box, Text, Radio, Button, Icon, Modal, Spinner } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { getMBTITestQuestions, getMBTITestAnswers, postMBTIResult } from '../../api/test';

const TestExecute = () => {
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchedQuestions, setFetchedQuestions] = useState(new Set());
  const navigate = useNavigate();
  const isFetching = useRef(new Set());

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getMBTITestQuestions('d7eae2f2-ff5c-4b5d-8c6c-4b5e21d8a57c');
        if (response && response.data) {
          const fetchedQuestions = response.data.map((q) => ({
            id: q.id,
            content: q.content,
            answers: [] // Initialize with empty answers
          }));
          setQuestions(fetchedQuestions);
        } else {
          console.error('API response does not have data:', response);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    
    fetchQuestions();
  }, []);

  const fetchChoice = useCallback(async (questionId) => {
    if (isFetching.current.has(questionId)) return;
    isFetching.current.add(questionId);
    setLoading(true);
    try {
      const response = await getMBTITestAnswers(questionId);
      const choices = response.data || [];
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId
            ? { ...question, answers: Array.isArray(choices) ? choices : [] }
            : question
        )
      );
      setFetchedQuestions((prev) => new Set(prev).add(questionId));
    } catch (error) {
      console.error('Error fetching choices:', error);
    } finally {
      setLoading(false);
      isFetching.current.delete(questionId);
    }
  }, [fetchedQuestions]);

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && !fetchedQuestions.has(currentQuestion.id)) {
      fetchChoice(currentQuestion.id);
    }
  }, [currentQuestionIndex, questions, fetchChoice, fetchedQuestions]);

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
    }, 1000); // Adjust the delay time (in milliseconds) as needed
  };

  const handleBackQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const prevQuestionIndex = prevIndex - 1;
      if (prevQuestionIndex >= 0) {
        return prevQuestionIndex;
      }
      return prevIndex;
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextQuestionIndex = prevIndex + 1;
      if (nextQuestionIndex < questions.length) {
        return nextQuestionIndex;
      }
      return prevIndex;
    });
  };

  const handleFinish = async () => {
    const listQuestionId = Object.keys(answers).map(Number); // Get the list of question IDs
    const listAnswerId = Object.values(answers); // Get the list of selected answer IDs
    
    const requestData = {
      "student-id": "2AFF7FBC-767A-475B-B3D2-5EC7F2E458F0", // Replace with actual student ID
      "personal-test-id": "d7eae2f2-ff5c-4b5d-8c6c-4b5e21d8a57c", // Replace with actual test ID
      "list-question-id": listQuestionId,
      "list-answer-id": listAnswerId,
      "date": new Date().toISOString() // Current date
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
    <Page className="page bg-theme-image" style={{minHeight: '100vh' }}>
      <Box style={{ padding: '8px' }}>
        <Box>
        <img
          src="https://wallpapercave.com/wp/wp1949793.jpg" 
          alt='image'          
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
          role='presentation'
        />
      </Box>
        <Box style={{marginTop: '12px',  backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Text style={{ fontWeight: 'bold', fontSize: '18px', color: '#2c5282', marginBottom: '12px' }}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <Text style={{ color: '#4a5568', fontSize: '16px', marginBottom: '24px' }}>
            {currentQuestion.content}
          </Text>
          <Box>
            {Array.isArray(currentQuestion.answers) && currentQuestion.answers.map((choice) => (
              <label key={choice.id} style={{
                display: 'block', 
                padding: '12px', 
                border: '1px solid #cbd5e0', 
                borderRadius: '8px', 
                marginBottom: '12px', 
                backgroundColor: '#ebf4ff',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out'
              }}>
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
              backgroundColor: '#1c92d2',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={handleBackQuestion}
          >
            <Icon icon="zi-chevron-left" />
            <span style={{ marginLeft: '8px' }}>Back</span>
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
              alignItems: 'center'
            }}
            onClick={handleFinish}
          >
            Finish
          </Button>
        ) : (
          <Button
            style={{
              backgroundColor: '#1c92d2',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={handleNextQuestion}
          >
            <span style={{ marginRight: '8px' }}>Next</span>
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
