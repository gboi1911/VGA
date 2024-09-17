import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Page, Box, Text, Radio, Button, Icon, Modal } from 'zmp-ui';
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
        const response = await getMBTITestQuestions(1);
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
      "student-id": "4976d084-1b15-4e3f-a184-2a8493cfbb6c", // Replace with actual student ID
      "personal-test-id": 1, // Replace with actual test ID
      "list-question-id": listQuestionId,
      "list-answer-id": listAnswerId,
      "date": new Date().toISOString() // Current date
    };
  
    try {
      const response = await postMBTIResult(requestData);
      if (response && response.data) {
        // Navigate to the TestResult page and pass the result data
        navigate('/testResult', { state: { resultData: response.data } });
      } else {
        console.error('Error: No response data');
      }
    } catch (error) {
      console.error('Error posting test results:', error);
    }
    console.log('Test completed');
  };

  if (!questions.length) {
    return <Text>Loading questions...</Text>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Page className="page relative bg-theme-image">            
      <Box>
        <img
          src="https://wallpapercave.com/wp/wp1949793.jpg" 
          alt='image'          
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          role='presentation'
        />
      </Box>
      <Box className="mb-4 p-4">
        <div className="flex flex-col space-x-1 mt-8">
          <Text bold>Question {currentQuestionIndex + 1} of {questions.length}:</Text>
          <Text 
            className="mb-2 mt-2"
            style={{
              border: '2px solid #CC6699', 
              padding: '10px',             
              borderRadius: '8px',         
              backgroundColor: '#f9f9f9',  
              textAlign: 'center'          
            }}
          >{currentQuestion.content}</Text>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          {Array.isArray(currentQuestion.answers) && currentQuestion.answers.map((choice) => (
            <label key={choice.id} className="flex items-center space-x-2">
              <Radio
                checked={answers[currentQuestion.id] === choice.id}
                onChange={() => handleChoiceChange(currentQuestion.id, choice)}
              />
              <Text>{choice.content}</Text>
            </label>
          ))}
        </div>
      </Box>
      <div className="flex justify-between mt-12">
        {currentQuestionIndex > 0 && ( 
          <Button
            style={{
              backgroundColor: '#FF6699',
              color: 'white',
              borderRadius: '8px',
              padding: '10px 20px',
            }}
            type="primary"
            onClick={handleBackQuestion}
          >
            <Icon icon="zi-chevron-left" /> Quay lại
          </Button>
        )}
        {currentQuestionIndex === questions.length - 1 ? (
          <Button
            style={{
              backgroundColor: '#339966',
              color: 'white',
              borderRadius: '8px',
              padding: '10px 20px',
            }}
            type="primary"
            onClick={handleFinish}
          >
            Hoàn thành
          </Button>
        ) : 
          <Button
          style={{
            backgroundColor: '#339966',
            color: 'white',
            borderRadius: '8px',
            padding: '10px 20px',
          }}
          type="primary"
          onClick={handleNextQuestion}>
          <Icon icon="zi-chevron-right" />  Tiếp theo
            </Button>}
      </div>
      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title='Lưu ý'>
        <Text>Vui lòng chọn đáp án trước khi sang câu hỏi kế tiếp</Text>
        <div className='flex justify-center items-center mt-4'>
          <Button onClick={() => setIsModalVisible(false)}>Ok</Button>
        </div>
      </Modal>
    </Page>
  );
};

export default TestExecute;
