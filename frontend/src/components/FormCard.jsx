import React, { useState } from 'react';
import styled from 'styled-components';

const FormCard = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  }

  return (
    <StyledWrapper>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">Iniciar Sesión</h2>
          
          <div className="input-wrapper">
            <input
              type="email"
              name="email"              // ✅ Corregido
              value={formData.email}    // ✅ Corregido
              onChange={handleChange}
              placeholder="email"
              className="glass-input"
              required
            />
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              name="password"           // ✅ Corregido
              value={formData.password} // ✅ Corregido
              onChange={handleChange}
              placeholder="password"
              className="glass-input"
              required
            />
          </div>

          <button type="submit" className="glass-button">
            <span>Ingresar</span>
            <svg viewBox="0 0 24 24" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" fill="currentColor"/>
            </svg>
          </button>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .form-container {
    position: relative;
    width: 400px;
    padding: 40px;
    background: linear-gradient(#fff2, transparent);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    backdrop-filter: blur(15px);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3);
  }

  .form-title {
    color: #fff;
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .input-wrapper {
    margin-bottom: 20px;
  }

  .glass-input {
    width: 100%;
    padding: 15px 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #fff;
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .glass-input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  .glass-input:focus {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.4);
    transform: scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .glass-input:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  .glass-button {
    width: 100%;
    padding: 15px 20px;
    margin-top: 10px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .glass-button:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15));
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  .glass-button:active {
    transform: translateY(-1px) scale(1.05);
    transition: 0.1s;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }

  .glass-button svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  .glass-button:hover svg {
    transform: translateX(5px);
  }
`

export default FormCard 