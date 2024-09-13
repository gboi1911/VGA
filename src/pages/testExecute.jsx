import React, { useState, useEffect } from 'react';
import { Page, Box, Text, Radio, Button, Icon, Modal } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { getMBTITest, postMBTIAnswers } from '../api/test';

const TestExecute = () => {
  // State to hold selected answers for each question
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async () => {    
    const answerIds = Object.values(answers).map((id) => parseInt(id, 10)).filter(Number.isInteger);
    const payload = {
      studentId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', 
      testId: 1, 
      answerId: answerIds,
      createAt: new Date().toISOString(), 
    };

    try {      
      const response = await postMBTIAnswers(payload);      
      if (response && response.data) {
        navigate('/testResult', { state: { resultData: response.data } }); 
      } else {
        console.error("no data found");
      }      
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  useEffect(() => {  
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await getMBTITest(1); 
      console.log('API Response:', response);        
      if (response && response.data) {          
        const fetchedQuestions = response.data.map((q) => ({
          id: q.questionId,
          question: q.questionContent,
          choices: q.answer.map((ans) => ({
            id: ans.answerId,
            content: ans.answerContent,
            personalityType: ans.personalityType,
          })),
        }));
        setQuestions(fetchedQuestions);          
      } else {
        console.error('API response does not have data:', response);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleChoiceChange = (questionId, choice) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choice,
    }));
    console.log(`Question ${questionId}: User selected ${choice.content}`);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!answers[currentQuestion.id]) {
      setIsModalVisible(true);
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
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
        role='presentation'/>
      </Box>
          <Box className="mb-4 p-4">
            <div className="flex flex-col space-x-1 mt-2">
              <Text bold>Question {currentQuestionIndex + 1} of {questions.length}:</Text>
              <Text className="mb-2 mt-2">{currentQuestion.question}</Text>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
            {currentQuestion.choices.map((choice) => (
            <label key={choice.id} className="flex items-center space-x-2">
              <Radio                
                checked={answers[currentQuestion.id] === choice.id}
                onChange={() => handleChoiceChange(currentQuestion.id, choice.id)}
              />
              <Text>{choice.content}</Text>
            </label>
          ))}
            </div>
          </Box>
      <div className="flex justify-end mt-12">
      {currentQuestionIndex < questions.length - 1 ? (
          <Button
            style={{
              backgroundColor: '#FF6699',
              color: 'white',
              borderRadius: '8px',
              padding: '10px 20px',
            }}
            type="primary"
            onClick={handleNextQuestion}
          >
            Tiếp theo <Icon icon="zi-chevron-right" />
          </Button>
        ) : (
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
        )}
      </div>
      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title='Lưu ý'>         
        <Text>Vui lòng chọn đáp án trước khi sang câu hỏi kế tiếp</Text>
        <div className='flex justify-center items-center mt-4'>
          <Button
            onClick={() => setIsModalVisible(false)}>
              Ok
          </Button>
        </div>
      </Modal>
    </Page>
  );
};

export default TestExecute;
