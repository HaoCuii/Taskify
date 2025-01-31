import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseSpeed = 0;
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', (e) => {
      mouseSpeed = Math.sqrt(
        Math.pow(e.clientX - lastMouseX, 2) + 
        Math.pow(e.clientY - lastMouseY, 2)
      );
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Create particles
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    // Draw wave with mouse distortion
    const drawWave = (frequency, amplitude, yOffset, color, alpha) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      
      for (let x = 0; x < canvas.width; x++) {
        // Calculate distance from mouse to current x position
        const dx = x - mouseX;
        const dy = yOffset - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Create mouse influence
        const mouseInfluence = Math.max(0, 1 - distance / 200) * mouseSpeed * 0.3;
        const distortion = Math.sin(distance * 0.03 - time * 2) * mouseInfluence;
        
        // Combine base wave with mouse distortion
        const y = Math.sin(x * frequency + time) * amplitude + 
                 yOffset + 
                 distortion;
        
        ctx.lineTo(x, y);
      }
      
      ctx.strokeStyle = `rgba(${color}, ${alpha})`;
      ctx.stroke();
    };
    
    const animate = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw multiple waves
      ctx.lineWidth = 2;
      drawWave(0.003, 50, canvas.height * 0.3, '96, 165, 250', 0.2);  // Light blue
      drawWave(0.004, 40, canvas.height * 0.4, '99, 102, 241', 0.3);  // Indigo
      drawWave(0.002, 60, canvas.height * 0.5, '139, 92, 246', 0.2);  // Purple
      
      // Update and draw particles with mouse influence
      particles.forEach(particle => {
        // Calculate distance from mouse
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Add mouse repulsion
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) * 0.01;
          particle.x += Math.cos(angle) * force;
          particle.y += Math.sin(angle) * force;
        }
        
        particle.x += particle.speedX;
        particle.y += particle.speedY + Math.sin(time * 2) * 0.2;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle with size variation based on mouse proximity
        const particleSize = particle.size * (1 + Math.max(0, 1 - distance / 100) * mouseSpeed * 0.1);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
        ctx.fill();
      });
      
      // Add mouse trail effect
      if (mouseSpeed > 0) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, mouseSpeed * 0.5, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      mouseSpeed *= 0.95; // Decay mouse speed
      time += 0.01;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', null);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-10"
    />
  );
};

export default AnimatedBackground;
