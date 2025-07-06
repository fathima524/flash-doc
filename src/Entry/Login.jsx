import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const navigate = useNavigate();

  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' }
  ];

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    // Just navigate directly to OTP page without checks
    navigate('/otp-verify');
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,5})(\d{0,5})$/);
    if (match) {
      return [match[1], match[2]].filter(Boolean).join('-');
    }
    return value;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(formatPhoneNumber(value));
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">Login to Flash-doc</h1>
        
        <div className="login-form">
          <label className="login-label">Phone Number</label>
          <div className="phone-input-container">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="country-select"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            <div className="phone-input-wrapper">
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="login-input"
              />
              <span className="phone-counter">
                {phoneNumber.replace(/\D/g, '').length}/10
              </span>
            </div>
          </div>
          <button type="button" onClick={handlePhoneSubmit} className="login-button">
            Send OTP
          </button>
        </div>
        
        <p className="login-footer">
          Need help? Contact support.
        </p>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #3c4b5c 0%, #5a6b7a 40%, #8b9da9 70%, #e8eaec 100%);
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
          animation: fadeInBackground 1.2s ease-out;
        }

        .login-box {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 50px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 20px 40px rgba(60, 75, 92, 0.3), 0 8px 16px rgba(60, 75, 92, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: slideUpFade 1s ease-out 0.3s both;
        }

        .login-title {
          font-size: 28px;
          font-weight: 700;
          color: #3c4b5c;
          text-align: center;
          margin-bottom: 30px;
          letter-spacing: -0.5px;
          animation: slideUpFade 0.8s ease-out 0.6s both;
        }

        .error-message {
          background: rgba(220, 53, 69, 0.1);
          color: #dc3545;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid rgba(220, 53, 69, 0.3);
          animation: slideUpFade 0.5s ease-out;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: slideUpFade 0.8s ease-out 0.9s both;
        }

        .login-label {
          font-size: 14px;
          font-weight: 600;
          color: #5a6b7a;
          margin-bottom: 8px;
          display: block;
        }

        .phone-input-container {
          display: flex;
          gap: 10px;
          align-items: stretch;
        }

        .country-select {
          padding: 16px 12px;
          border: 2px solid #e8eaec;
          border-radius: 12px;
          font-size: 16px;
          color: #3c4b5c;
          background-color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          outline: none;
          min-width: 120px;
          cursor: pointer;
        }

        .country-select:focus {
          border-color: #5a6b7a;
          background-color: rgba(255, 255, 255, 1);
          box-shadow: 0 0 0 3px rgba(90, 107, 122, 0.1);
        }

        .phone-input-wrapper {
          flex: 1;
          position: relative;
        }

        .login-input {
          width: 100%;
          padding: 16px;
          border: 2px solid #e8eaec;
          border-radius: 12px;
          font-size: 16px;
          color: #3c4b5c;
          background-color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          outline: none;
          box-sizing: border-box;
        }

        .login-input:focus {
          border-color: #5a6b7a;
          background-color: rgba(255, 255, 255, 1);
          box-shadow: 0 0 0 3px rgba(90, 107, 122, 0.1);
        }

        .login-input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .phone-counter {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: #8b9da9;
          font-weight: 500;
        }

        .login-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #3c4b5c 0%, #5a6b7a 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .login-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #2a3642 0%, #485460 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(60, 75, 92, 0.4);
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .login-footer {
          text-align: center;
          font-size: 14px;
          color: #8b9da9;
          margin: 20px 0 0 0;
        }

        /* Keyframe Animations */
        @keyframes fadeInBackground {
          from {
            opacity: 0;
            background-size: 110% 110%;
          }
          to {
            opacity: 1;
            background-size: 100% 100%;
          }
        }

        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .login-page {
            padding: 15px;
            min-height: 100vh;
            min-height: 100dvh;
          }
          
          .login-box {
            padding: 40px 30px;
            max-width: 95%;
            width: 100%;
          }
          
          .phone-input-container {
            flex-direction: column;
            gap: 15px;
          }
          
          .country-select {
            min-width: 100%;
          }
          
          .login-title {
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .login-page {
            padding: 10px;
          }
          
          .login-box {
            padding: 30px 20px;
            max-width: 100%;
            border-radius: 15px;
          }
          
          .login-title {
            font-size: 22px;
            margin-bottom: 25px;
          }
          
          .login-input, .country-select {
            padding: 14px;
            font-size: 16px;
          }
          
          .login-button {
            padding: 14px;
            font-size: 16px;
          }
        }

        @media (max-width: 320px) {
          .login-box {
            padding: 25px 15px;
            border-radius: 12px;
          }
          
          .login-title {
            font-size: 20px;
          }
        }

        /* Reduce animations on devices that prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .login-page,
          .login-box,
          .login-title,
          .login-form,
          .error-message {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}