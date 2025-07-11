import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompleteProfile() {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() && year) {
      console.log('Profile saved:', { name, year });

      // Save user name to localStorage
      localStorage.setItem("userName", name.trim());
      localStorage.setItem("userYear", year);

      // Navigate to Dashboard
      navigate("/dashboard");
    } else {
      alert("Please complete all fields!");
    }
  };

  return (
    <>
      <div className="profile-page">
        <div className="profile-box">
          <h1 className="profile-title">Complete Your Profile</h1>
          <div className="profile-form">
            <label className="profile-label">Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="profile-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="profile-label">Year of Study</label>
            <select
              className="profile-input profile-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Select your year</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
              <option value="5th">5th Year</option>
            </select>

            <button
              type="button"
              className="profile-button"
              onClick={handleSubmit}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .profile-page {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #27374d 0%, #526d82 40%, #9db2bf 70%, #dde6ed 100%);
          background-attachment: fixed;
          background-repeat: no-repeat;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: "Inter", "Segoe UI", "Roboto", sans-serif;
          margin: 0;
          box-sizing: border-box;
        }

        .profile-box {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 50px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 20px 40px rgba(39, 55, 77, 0.3), 0 8px 16px rgba(39, 55, 77, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .profile-title {
          font-size: 28px;
          font-weight: 700;
          color: #27374d;
          text-align: center;
          margin-bottom: 30px;
          letter-spacing: -0.5px;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .profile-label {
          font-size: 14px;
          font-weight: 600;
          color: #526d82;
          margin-bottom: 8px;
          display: block;
        }

        .profile-input {
          width: 100%;
          padding: 16px;
          border: 2px solid #dde6ed;
          border-radius: 12px;
          font-size: 16px;
          color: #27374d;
          background-color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          outline: none;
          box-sizing: border-box;
          letter-spacing: 0.5px;
        }

        .profile-input:focus {
          border-color: #526d82;
          background-color: rgba(255, 255, 255, 1);
          box-shadow: 0 0 0 3px rgba(82, 109, 130, 0.1);
        }

        .profile-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23526d82' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 12px center;
          background-repeat: no-repeat;
          background-size: 16px;
          padding-right: 40px;
        }

        .profile-select:focus {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2327374d' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        }

        .profile-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #27374d 0%, #526d82 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .profile-button:hover {
          background: linear-gradient(135deg, #1e2a3a 0%, #455a6b 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(39, 55, 77, 0.4);
        }

        .profile-button:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .profile-page {
            padding: 15px;
            min-height: 100vh;
            min-height: 100dvh;
          }

          .profile-box {
            padding: 40px 30px;
            max-width: 95%;
            width: 100%;
          }

          .profile-title {
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .profile-page {
            padding: 10px;
          }

          .profile-box {
            padding: 30px 20px;
            max-width: 100%;
            border-radius: 15px;
          }

          .profile-title {
            font-size: 22px;
            margin-bottom: 25px;
          }

          .profile-input {
            padding: 14px;
            font-size: 16px;
          }

          .profile-select {
            padding-right: 36px;
          }

          .profile-button {
            padding: 14px;
            font-size: 16px;
          }
        }

        @media (max-width: 320px) {
          .profile-box {
            padding: 25px 15px;
            border-radius: 12px;
          }

          .profile-title {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
}