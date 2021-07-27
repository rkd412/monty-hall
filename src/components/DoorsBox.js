import React, { useEffect, useState } from "react";

import Door from "./Door";

import styles from "./DoorsBox.module.css";

import goat from "../assets/goat.jpg";
import car from "../assets/car.jpg";

const doorArr = [car, goat, goat];

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DoorsBox = () => {
  const [prizes, setPrizes] = useState(doorArr);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPrizes(shuffleArray(prizes));
    setIsLoaded(true);
  }, []);

  return (
    <div className={styles["doors-box"]}>
      {isLoaded ? <Door src={prizes[0]} /> : null}
      {isLoaded ? <Door src={prizes[1]} /> : null}
      {isLoaded ? <Door src={prizes[2]} /> : null}
    </div>
  );
};

export default DoorsBox;
