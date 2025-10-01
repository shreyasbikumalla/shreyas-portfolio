import React, { useEffect, useRef, useState } from 'react';

const AnimatedSection = ({ 
  children, 
  animation = 'animate-fade-in-up', 
  delay = '0s',
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={sectionRef}
      className={isVisible ? animation : ''}
      style={{ 
        animationDelay: delay,
        opacity: isVisible ? 1 : 0
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
