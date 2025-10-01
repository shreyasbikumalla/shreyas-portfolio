import React, { useEffect, useRef, useState } from 'react';

const ParticleSystem = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.baseOpacity = this.opacity;
        this.connections = 0;
      }

      update() {
        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Attraction/repulsion based on distance
        if (distance < 150) {
          const force = (150 - distance) / 150;
          const angle = Math.atan2(dy, dx);
          
          // Repel when very close, attract when medium distance
          if (distance < 80) {
            this.vx -= Math.cos(angle) * force * 0.02;
            this.vy -= Math.sin(angle) * force * 0.02;
          } else {
            this.vx += Math.cos(angle) * force * 0.008;
            this.vy += Math.sin(angle) * force * 0.008;
          }
        }

        // Apply velocity with damping
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Boundary wrapping
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Reset connections for this frame
        this.connections = 0;
      }

      draw() {
        // Glow effect based on connections
        const glowIntensity = Math.min(this.connections * 0.3 + this.baseOpacity, 1);
        
        ctx.save();
        ctx.globalAlpha = glowIntensity;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
        gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.globalAlpha = glowIntensity;
        ctx.fillStyle = `rgba(168, 85, 247, ${glowIntensity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      addConnection() {
        this.connections++;
      }
    }

    // Initialize particles with mobile optimization
    const initParticles = () => {
      particlesRef.current = [];
      
      // Detect mobile devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      
      // Reduce particle count on mobile for better performance
      const baseParticleCount = isMobile ? 30 : 60;
      const particleCount = Math.min(baseParticleCount, Math.floor((canvas.width * canvas.height) / (isMobile ? 25000 : 20000)));
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    initParticles();

    // Mouse and touch tracking
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current.x = touch.clientX;
        mouseRef.current.y = touch.clientY;
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current.x = touch.clientX;
        mouseRef.current.y = touch.clientY;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      // Update particles
      particles.forEach(particle => particle.update());
      
      // Draw connections first (behind particles)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = Math.max(0, (150 - distance) / 150 * 0.4);
            
            // Draw connection line
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
            
            // Add connection count for glow effect
            particles[i].addConnection();
            particles[j].addConnection();
          }
        }
      }
      
      // Draw particles
      particles.forEach(particle => particle.draw());
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.8
      }}
    />
  );
};

export default ParticleSystem;
