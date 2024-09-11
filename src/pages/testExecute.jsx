import React, { useState, useEffect } from 'react';
import { Page, Box, Text, Radio, Button } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { getMBTITest, postMBTIAnswers } from '../api/test';

const TestExecute = () => {
  // State to hold selected answers for each question
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
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

  return (
    <Page className="p-4 relative bg-theme-image">
      <Text bold size="xLarge" className="mb-4 mt-10">Bài kiểm tra MBTI</Text>
      {questions.length > 0 ? (
        questions.map((q) => (
          <Box key={q.id} className="mb-4 p-4">
            <div className="flex flex-col space-x-1 mt-2">
              <Text bold>Question {q.id}:</Text>
              <Text className="mb-2">{q.question}</Text>
            </div>
            <div className="flex flex-col space-y-2">
              {q.choices.map((choice) => (
                <label key={choice.id} className="flex items-center space-x-2">
                  <Radio
                    checked={answers[q.id]?.id === choice.id}
                    onChange={() => handleChoiceChange(q.id, choice)}
                  />
                  <Text>{choice.content}</Text>
                </label>
              ))}
            </div>
          </Box>
        ))
      ) : (
        <Text>No questions available.</Text> 
      )}
      <div className="flex justify-end mt-4">
        <Button
          style={{
            bottom: '16px',
            right: '16px',
            backgroundColor: '#3366FF',
            color: 'white',
            borderRadius: '8px',
            padding: '10px 20px',
          }}
          type="primary"
          onClick={handleFinish}
        >
          Hoàn thành
        </Button>
      </div>
    </Page>
  );
};

export default TestExecute;
