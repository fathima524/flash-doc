import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Reuseable/Navbar";
import Footer from "../Reuseable/Footer";
import subjectsData from "../data/subjects.json";

function Flashcard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { subject, difficulty } = location.state || {};
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([]);

  useEffect(() => {
    if (subject) {
      const subjectData = subjectsData.subjects.find(s => s.id === subject);
      if (subjectData) {
        let filteredQuestions = subjectData.questions;
        if (difficulty && difficulty !== 'all') {
          filteredQuestions = subjectData.questions.filter(q => q.difficulty === difficulty);
        }
        setQuestions(filteredQuestions);
      }
    } else {
      // If no subject selected, show all easy questions
      const allEasyQuestions = subjectsData.subjects.flatMap(s => 
        s.questions.filter(q => q.difficulty === 'easy')
      );
      setQuestions(allEasyQuestions.slice(0, 10));
    }
  }, [subject, difficulty]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer!");
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correct;
    const newHistory = [...questionHistory, {
      question: currentQuestion,
      selectedAnswer,
      isCorrect,
      usedHint: showHint
    }];
    
    setQuestionHistory(newHistory);
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Show final results
      navigate("/dashboard", { 
        state: { 
          completedSession: true, 
          finalScore: score + (selectedAnswer === currentQuestion.correct ? 1 : 0),
          totalQuestions: questions.length 
        } 
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowHint(false);
      setShowResult(false);
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (!questions.length) {
    return (
      <>
        <Navbar />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #27374d 0%, #526d82 40%, #9db2bf 70%, #dde6ed 100%)'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '3rem',
            borderRadius: '20px',
            textAlign: 'center'
          }}>
            <h2>No questions available</h2>
            <button 
              onClick={handleBackToDashboard}
              style={{
                padding: '1rem 2rem',
                background: '#27374d',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const containerStyle = {
    minHeight: '100vh',
    width: '100%',
    background: 'linear-gradient(135deg, #27374d 0%, #526d82 40%, #9db2bf 70%, #dde6ed 100%)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxSizing: 'border-box'
  };

  const flashcardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '3rem',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 20px 40px rgba(39, 55, 77, 0.3), 0 8px 16px rgba(39, 55, 77, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    marginBottom: '2rem'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  };

  const progressStyle = {
    color: '#526d82',
    fontSize: '1.1rem',
    fontWeight: '600'
  };

  const streakStyle = {
    color: '#27374d',
    fontSize: '1.1rem',
    fontWeight: '600'
  };

  const questionStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#27374d',
    marginBottom: '2rem',
    lineHeight: '1.4'
  };

  const optionsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const optionStyle = (index) => ({
    padding: '1.2rem',
    border: `2px solid ${selectedAnswer === index ? '#27374d' : '#dde6ed'}`,
    borderRadius: '12px',
    background: selectedAnswer === index ? 'rgba(39, 55, 77, 0.1)' : 'rgba(255, 255, 255, 0.8)',
    cursor: showResult ? 'default' : 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#27374d'
  });

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  };

  const buttonStyle = {
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #27374d 0%, #526d82 100%)',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: 'rgba(157, 178, 191, 0.3)',
    color: '#27374d',
    border: '2px solid #9db2bf'
  };

  const hintStyle = {
    background: 'rgba(157, 178, 191, 0.2)',
    padding: '1rem',
    borderRadius: '12px',
    marginTop: '1rem',
    color: '#526d82',
    fontSize: '0.95rem',
    fontStyle: 'italic'
  };

  const resultStyle = {
    background: showResult && selectedAnswer === currentQuestion.correct 
      ? 'rgba(46, 204, 113, 0.2)' 
      : 'rgba(231, 76, 60, 0.2)',
    padding: '1rem',
    borderRadius: '12px',
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: showResult && selectedAnswer === currentQuestion.correct ? '#27ae60' : '#e74c3c'
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={flashcardStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <div style={progressStyle}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div style={streakStyle}>
              🔥 Streak: {streak}
            </div>
          </div>

          {/* Question */}
          <div style={questionStyle}>
            {currentQuestion.question}
          </div>

          {/* Options */}
          <div style={optionsContainerStyle}>
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                style={optionStyle(index)}
                onClick={() => !showResult && handleAnswerSelect(index)}
              >
                {String.fromCharCode(65 + index)}. {option}
                {showResult && index === currentQuestion.correct && " ✓"}
                {showResult && index === selectedAnswer && index !== currentQuestion.correct && " ✗"}
              </div>
            ))}
          </div>

          {/* Hint */}
          {showHint && (
            <div style={hintStyle}>
              💡 Hint: {currentQuestion.hint}
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div style={resultStyle}>
              {selectedAnswer === currentQuestion.correct 
                ? "🎉 Correct! Well done!" 
                : `❌ Incorrect. The correct answer is ${String.fromCharCode(65 + currentQuestion.correct)}.`}
            </div>
          )}

          {/* Buttons */}
          <div style={buttonContainerStyle}>
            {!showResult ? (
              <>
                {currentQuestion.difficulty !== 'easy' && !showHint && (
                  <button 
                    style={secondaryButtonStyle}
                    onClick={handleShowHint}
                  >
                    💡 Show Hint
                  </button>
                )}
                <button 
                  style={primaryButtonStyle}
                  onClick={handleSubmitAnswer}
                >
                  Submit Answer
                </button>
              </>
            ) : (
              <button 
                style={primaryButtonStyle}
                onClick={handleNextQuestion}
              >
                {isLastQuestion ? "Finish Session" : "Next Question"}
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #27374d 0%, #526d82 100%)',
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Flashcard;