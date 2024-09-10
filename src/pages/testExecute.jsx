// src/pages/TestExecute.js
import React, { useState } from 'react';
import { Page, Box, Text, Radio, Button } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';

// Sample questions data
const questions = [
  {
    id: 1,
    question: 'Do you prefer working in a team?',
    choices: ['Yes', 'No'],
  },
  {
    id: 2,
    question: 'Are you comfortable with public speaking?',
    choices: ['Yes', 'No'],
  },
  {
    id: 3,
    question: 'Are you comfortable with public speaking?',
    choices: ['Yes', 'No'],
  },
  {
    id: 4,
    question: 'Are you comfortable with public speaking?',
    choices: ['Yes', 'No'],
  },
  // Add more questions as needed
];



const TestExecute = () => {
  // State to hold selected answers for each question
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const handleFinish = () => {
    navigate('/testResult');
  };

  const handleChoiceChange = (questionId, choice) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choice,
    }));
    console.log(`Question ${questionId}: User selected ${choice}`);
    // Additional logic for handling the selected choice can be added here
  };  

  return (
    <Page className="p-4 relative bg-theme-image">
      <Text bold size='xLarge' className="mb-4 mt-10">Bài kiểm tra MBTI</Text>
      {questions.map((q) => (
        <Box key={q.id} className="mb-4 p-4">
          <div className="flex flex-col space-x-1 mt-2">
          <Text bold >Question {q.id}: </Text>
          <Text className="mb-2">{q.question}</Text>
          </div>
          <div className="flex flex-col space-y-2">
            {q.choices.map((choice, index) => (
              <label key={index} className="flex items-center space-x-2">
                <Radio
                  checked={answers[q.id] === choice}
                  onChange={() => handleChoiceChange(q.id, choice)}
                />
                <Text>{choice}</Text>
              </label>
            ))}
          </div>
        </Box>
      ))}
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
         type='primary'
         onClick={handleFinish}>
            Hoàn thành
        </Button>
      </div>
    </Page>
  );
};

export default TestExecute;
