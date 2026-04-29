import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ message, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for fade-out animation
  };

  return (
    <div className={`toast-container ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="toast-content">
        <span>{message}</span>
        <button className="toast-close-btn" onClick={handleClose}>&times;</button>
      </div>
      <div 
        className="toast-progress-bar" 
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
};

export default Toast;
