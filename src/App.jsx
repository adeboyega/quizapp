import React, { useState, useEffect } from 'react';
import './App.css';
import data from './data.json';

function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuestions(data);
    setLoading(false);
  }, []);

  const handleStartQuiz = () => {
    const randomIndices = generateRandomIndices(questions.length, 5);
    const selected = randomIndices.map(index => questions[index]);
    setSelectedQuestions(selected);
    setQuizStarted(true);
    setQuizFinished(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const generateRandomIndices = (totalQuestions, numberOfQuestions) => {
    const indices = [];
    while (indices.length < numberOfQuestions) {
      const randomIndex = Math.floor(Math.random() * totalQuestions);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  const handleAnswerClick = (answer) => {
    if (answer === selectedQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < selectedQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizFinished(true);
      setQuizStarted(false);
    }
  };

  return (
    <div className="maindiv">
      <h1>Quiz App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!quizStarted && !quizFinished && (
            <button onClick={handleStartQuiz}>Start Quiz</button>
          )}
          {quizStarted && !quizFinished && (
            <div>
              <h2>{selectedQuestions[currentQuestionIndex].question}</h2>
              <div className='options'>
                {selectedQuestions[currentQuestionIndex].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswerClick(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
          {quizFinished && (
            <div>
              <h2>Quiz Finished</h2>
              <p>Your score: {score} / {selectedQuestions.length}</p>
              <button onClick={handleStartQuiz}>Restart Quiz</button>
            </div>
          )}
        </>
      )}
      <p className='footer'>Dev: Abayomi Aremo 🤞</p>
    </div>
  );
}

export default App;
