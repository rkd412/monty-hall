import React, { useEffect, useState } from "react";

import styles from "./DoorsBox.module.css";

import goat from "../assets/goat.jpg";
import car from "../assets/car.jpg";

const goatId = "/static/media/goat.feb0a1a2.jpg";
const carId = "/static/media/car.0636021d.jpg";

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
  const [clickCount, setClickCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const clickHandler = (e) => {
    if (clickCount === 0) {
      console.log(clickCount);
      console.log(prizes);
      setClickCount(clickCount + 1);
    } else if (clickCount === 1) {
      console.log(clickCount);
      setClickCount(clickCount + 1);
    } else if (clickCount > 1) {
      console.log(clickCount);
      setClickCount(clickCount + 1);
      console.log(e.target.id);
    }
  };

  useEffect(() => {
    setPrizes(shuffleArray(prizes));
    setIsLoaded(true);
  }, []);

  return (
    <div className={styles["doors-box"]}>
      <div className={styles["door"]}>
        {isLoaded ? (
          <img
            id="doorone"
            className={styles["image"]}
            src={prizes[0]}
            onClick={clickHandler}
          />
        ) : null}
      </div>

      <div className={styles["door"]}>
        {isLoaded ? (
          <img
            id="doortwo"
            className={styles["image"]}
            src={prizes[1]}
            onClick={clickHandler}
          />
        ) : null}
      </div>

      <div className={styles["door"]}>
        {isLoaded ? (
          <img
            id="doorthree"
            className={styles["image"]}
            src={prizes[2]}
            onClick={clickHandler}
          />
        ) : null}
      </div>
    </div>
  );
};

export default DoorsBox;

/*console.log(e.target.src);*/
