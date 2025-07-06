import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Reuseable/Navbar";
import Footer from "../Reuseable/Footer";
import subjectsData from "../data/subjects.json";

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [streak, setStreak] = useState(5);
  const [questionsToday, setQuestionsToday] = useState(12);
  const [totalProgress, setTotalProgress] = useState(65);

  useEffect(() => {
    // Get user name from localStorage (set during profile completion)
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleStartStudy = () => {
    if (!selectedSubject) {
      alert("Please select a subject to start studying!");
      return;
    }
    
    // Navigate to flashcard with selected subject and difficulty
    navigate("/flashcard", { 
      state: { 
        subject: selectedSubject, 
        difficulty: selectedDifficulty 
      } 
    });
  };

  const handleUpgrade = () => {
    navigate("/pricing");
  };

  const containerStyle = {
    minHeight: '100vh',
    width: '100%',
    background: 'linear-gradient(135deg, #27374d 0%, #526d82 40%, #9db2bf 70%, #dde6ed 100%)',
    padding: '2rem',
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxSizing: 'border-box'
  };

  const dashboardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 0'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 20px 40px rgba(39, 55, 77, 0.3), 0 8px 16px rgba(39, 55, 77, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease'
  };

  const welcomeCardStyle = {
    ...cardStyle,
    gridColumn: 'span 2',
    textAlign: 'center',
    background: 'linear-gradient(135deg, rgba(39, 55, 77, 0.9) 0%, rgba(82, 109, 130, 0.9) 100%)',
    color: 'white'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: 'white',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '400',
    opacity: 0.9,
    marginBottom: '2rem'
  };

  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#27374d',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #9db2bf',
    paddingBottom: '0.5rem'
  };

  const selectStyle = {
    width: '100%',
    padding: '1rem',
    border: '2px solid #dde6ed',
    borderRadius: '12px',
    fontSize: '1rem',
    color: '#27374d',
    background: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',
    marginBottom: '1rem',
    cursor: 'pointer'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #27374d 0%, #526d82 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1rem'
  };

  const statCardStyle = {
    ...cardStyle,
    textAlign: 'center'
  };

  const statNumberStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#27374d',
    marginBottom: '0.5rem'
  };

  const statLabelStyle = {
    fontSize: '1rem',
    color: '#526d82',
    fontWeight: '500'
  };

  const progressBarStyle = {
    width: '100%',
    height: '10px',
    background: '#dde6ed',
    borderRadius: '5px',
    overflow: 'hidden',
    marginTop: '1rem'
  };

  const progressFillStyle = {
    height: '100%',
    background: 'linear-gradient(90deg, #27374d 0%, #526d82 100%)',
    width: `${totalProgress}%`,
    transition: 'width 0.3s ease'
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={dashboardGridStyle}>
          {/* Welcome Card */}
          <div style={welcomeCardStyle}>
            <h1 style={titleStyle}>
              Welcome back, {userName || "Student"}! 👋
            </h1>
            <p style={subtitleStyle}>
              Ready to continue your MBBS revision journey?
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button 
                style={{
                  ...buttonStyle,
                  width: 'auto',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
                onClick={handleStartStudy}
              >
                Start Studying
              </button>
              <button 
                style={{
                  ...buttonStyle,
                  width: 'auto',
                  background: 'linear-gradient(135deg, #9db2bf 0%, #dde6ed 100%)',
                  color: '#27374d'
                }}
                onClick={handleUpgrade}
              >
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* Subject Selection */}
          <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>Select Subject</h3>
            <select 
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={selectStyle}
            >
              <option value="">Choose a subject...</option>
              {subjectsData.subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            
            <h4 style={{...sectionTitleStyle, fontSize: '1.2rem', marginTop: '1.5rem'}}>
              Difficulty Level
            </h4>
            <select 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              style={selectStyle}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Stats Cards */}
          <div style={statCardStyle}>
            <div style={statNumberStyle}>{streak}</div>
            <div style={statLabelStyle}>Day Streak 🔥</div>
          </div>

          <div style={statCardStyle}>
            <div style={statNumberStyle}>{questionsToday}</div>
            <div style={statLabelStyle}>Questions Today</div>
          </div>

          <div style={statCardStyle}>
            <div style={statNumberStyle}>{totalProgress}%</div>
            <div style={statLabelStyle}>Overall Progress</div>
            <div style={progressBarStyle}>
              <div style={progressFillStyle}></div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>Quick Actions</h3>
            <button 
              style={{
                ...buttonStyle,
                background: 'linear-gradient(135deg, #9db2bf 0%, #526d82 100%)',
                marginBottom: '1rem'
              }}
              onClick={() => navigate("/flashcard")}
            >
              Continue Last Session
            </button>
            <button 
              style={{
                ...buttonStyle,
                background: 'linear-gradient(135deg, #526d82 0%, #27374d 100%)'
              }}
              onClick={() => navigate("/pricing")}
            >
              View Subscription
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;