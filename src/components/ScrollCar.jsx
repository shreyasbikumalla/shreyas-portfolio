// src/components/ScrollCar.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Roaming 3-D car that parks at the Hero section when clicked.
 */
export default function ScrollCar() {
  const CAR_W = 64;
  const CAR_H = 40;
  const PARK_POS = { x: 40, y: 100 };   // where the car parks near Hero

  const [pos, setPos] = useState(PARK_POS);

  /** Generate a random on-screen coordinate for the car */
  const randomPos = () => ({
    x: Math.random() * (window.innerWidth - CAR_W),
    y: Math.random() * (window.innerHeight - CAR_H),
  });

  /* Every 5 s pick a new destination */
  useEffect(() => {
    const id = setInterval(() => setPos(randomPos()), 2000);
    return () => clearInterval(id);
  }, []);

  /** Click handler → scroll to top & park car */
  // click handler inside ScrollCar.jsx
const goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });   // scroll page
    setPos(PARK_POS);                                  // park the car
  };
  
  return (
    <motion.div
      className="car-wrapper"
      animate={pos}
      transition={{ type: "tween", ease: "easeInOut", duration: 1 }}
      onClick={goHome}
    >
      <div className="car-body">
        <div className="car-roof" />
        <div className="car-base" />
        <div className="wheel w1" />
        <div className="wheel w2" />
      </div>
    </motion.div>
  );
}
