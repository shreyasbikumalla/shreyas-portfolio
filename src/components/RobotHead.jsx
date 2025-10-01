import React, { useState, useEffect, useRef } from 'react';
import robotImage from '../assets/robot.webp';
import AIAssistant from './AIAssistant';

// Image-based Robot Head Component
function ImageRobotHead({ onClick, clickCount, isWinking, mousePosition }) {
  const robotRef = useRef();
  const robotImageRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const [isRotating, setIsRotating] = useState(false);
  const [wiggleTime, setWiggleTime] = useState(0);

  // Auto-wiggle every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWiggleTime(Date.now());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Eye and head following logic
  useEffect(() => {
    if (mousePosition && leftEyeRef.current && rightEyeRef.current && robotImageRef.current && !isRotating) {
      const robotRect = robotRef.current?.getBoundingClientRect();
      if (robotRect) {
        const robotCenterX = robotRect.left + robotRect.width / 2;
        const robotCenterY = robotRect.top + robotRect.height / 2;
        
        const deltaX = mousePosition.x - robotCenterX;
        const deltaY = mousePosition.y - robotCenterY;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Eye movement (more sensitive)
        const eyeMaxMove = 6; // pixels
        const eyeNormalizedX = distance > 0 ? (deltaX / distance) * Math.min(distance / 100, 1) * eyeMaxMove : 0;
        const eyeNormalizedY = distance > 0 ? (deltaY / distance) * Math.min(distance / 100, 1) * eyeMaxMove : 0;
        
        leftEyeRef.current.style.transform = `translate(${eyeNormalizedX}px, ${eyeNormalizedY}px)`;
        rightEyeRef.current.style.transform = `translate(${eyeNormalizedX}px, ${eyeNormalizedY}px)`;
        
        // Head movement (more subtle)
        const headMaxTilt = 8; // degrees
        const headMaxMove = 3; // pixels
        const headTiltX = distance > 0 ? (deltaY / distance) * Math.min(distance / 200, 1) * headMaxTilt : 0;
        const headTiltY = distance > 0 ? -(deltaX / distance) * Math.min(distance / 200, 1) * headMaxTilt : 0;
        const headMoveX = distance > 0 ? (deltaX / distance) * Math.min(distance / 150, 1) * headMaxMove : 0;
        const headMoveY = distance > 0 ? (deltaY / distance) * Math.min(distance / 150, 1) * headMaxMove : 0;
        
        robotImageRef.current.style.transform = `translate(${headMoveX}px, ${headMoveY}px) rotateX(${headTiltX}deg) rotateY(${headTiltY}deg)`;
      }
    }
  }, [mousePosition, isRotating]);

  const handleClick = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 1500);
    onClick();
  };

  return (
    <div 
      ref={robotRef}
      className={`image-robot-head ${isRotating ? 'rotating' : ''} ${wiggleTime ? 'wiggling' : ''}`}
      onClick={handleClick}
    >
      {/* Main robot image */}
      <img 
        ref={robotImageRef}
        src={robotImage} 
        alt="Robot Head" 
        className="robot-image"
      />
      
      {/* Overlay eyes that follow cursor */}
      <div className="robot-eyes-overlay">
        <div className={`robot-eye-overlay left-eye ${isWinking ? 'winking' : ''}`}>
          <div ref={leftEyeRef} className="eye-pupil-overlay"></div>
        </div>
        <div className="robot-eye-overlay right-eye">
          <div ref={rightEyeRef} className="eye-pupil-overlay"></div>
        </div>
      </div>
    </div>
  );
}

// Main Robot Head Component
export default function RobotHead() {
  const [clickCount, setClickCount] = useState(0);
  const [isWinking, setIsWinking] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Track mouse movement and touch events
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        setMousePosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    const handleTouchStart = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        setMousePosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  const handleClick = () => {
    // Open AI Assistant on any click
    setShowAIAssistant(true);
    
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Wink after 3 clicks (but still open AI Assistant)
    if (newCount === 3) {
      setIsWinking(true);
      setTimeout(() => {
        setIsWinking(false);
        setClickCount(0); // Reset counter after winking
      }, 2000);
    }
  };

  const closeAIAssistant = () => {
    setShowAIAssistant(false);
  };

  return (
    <>
      <div className="robot-container">
        <ImageRobotHead 
          onClick={handleClick}
          clickCount={clickCount}
          isWinking={isWinking}
          mousePosition={mousePosition}
        />
        <div className="robot-note">
          <span className="robot-note-text">💬 Ask me anything!</span>
        </div>
      </div>
      <AIAssistant 
        isOpen={showAIAssistant}
        onClose={closeAIAssistant}
      />
    </>
  );
}
