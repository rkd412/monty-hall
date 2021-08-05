import React, { useEffect, useState } from "react";

import styles from "./DoorsBox.module.css";

import door from "../assets/door.jpg";
import goat from "../assets/goat.jpg";
import car from "../assets/car.jpg";

const prizesArr = ["car", "goat", "goat"];

const doorsArr = ["doorone", "doortwo", "doorthree"];

const doorsObject = {
  0: "doorone",
  1: "doortwo",
  2: "doorthree",
};

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DoorsBox = () => {
  const [prizes, setPrizes] = useState(prizesArr);
  const [clickCount, setClickCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState("");
  const [isActive, setIsActive] = useState("");
  

  const clickHandler = (e) => {
    if (clickCount === 0) {
      let clickedId = e.target.id;
      setIsActive(clickedId);
      let newArr = doorsArr
        .filter((e) => e !== clickedId)
        .map((item) =>
          item
            .replace("doorone", 0)
            .replace("doortwo", 1)
            .replace("doorthree", 2)
        );
      let randomValue = newArr[Math.floor(Math.random() * newArr.length)];
      let randomNumber = parseInt(randomValue, 10);
      setClickCount(clickCount + 1);
      if (prizes[randomNumber] === "goat") {
        setIsFlipped(doorsObject[randomNumber]);
        console.log("first option");
      } else if (prizes[randomNumber] === "car") {
        setIsFlipped(
          doorsObject[newArr.filter((item) => item !== randomNumber.toString())]
        );
        console.log("second option");
      }

    } else if (clickCount === 1) {
      setIsActive(e.target.id);
      setIsFlipped("dooronedoortwodoorthree")
      setClickCount(clickCount + 1);
    } else if (clickCount > 1) {
      setClickCount(0);
      setIsFlipped("")
      setIsActive("")
      setPrizes(shuffleArray(prizes));
    }
  };

  useEffect(() => {
    setPrizes(shuffleArray(prizes));
  }, []);

  return (
    <div className={styles["doors-box"]}>
      <div
        className={
          isActive.includes("doorone")
            ? styles["active-door"]
            : styles["inactive-door"]
        }
      >
        {isFlipped.includes("doorone") ? (
          <img
            id="prizeone"
            className={styles["image"]}
            src={prizes[0] === "goat" ? goat : car}
            alt={prizes[0]}
            onClick={clickHandler}
          />
        ) : (
          <img
            id="doorone"
            className={styles["image"]}
            src={door}
            alt={"door"}
            onClick={clickHandler}
          />
        )}
      </div>

      <div
        className={
          isActive.includes("doortwo")
            ? styles["active-door"]
            : styles["inactive-door"]
        }
      >
        {isFlipped.includes("doortwo") ? (
          <img
            id="prizetwo"
            className={styles["image"]}
            src={prizes[1] === "goat" ? goat : car}
            alt={prizes[1]}
            onClick={clickHandler}
          />
        ) : (
          <img
            id="doortwo"
            className={styles["image"]}
            src={door}
            alt={"door"}
            onClick={clickHandler}
          />
        )}
      </div>

      <div
        className={
          isActive.includes("doorthree")
            ? styles["active-door"]
            : styles["inactive-door"]
        }
      >
        {isFlipped.includes("doorthree") ? (
          <img
            id="prizethree"
            className={styles["image"]}
            src={prizes[2] === "goat" ? goat : car}
            alt={prizes[2]}
            onClick={clickHandler}
          />
        ) : (
          <img
            id="doorthree"
            className={styles["image"]}
            src={door}
            alt={"door"}
            onClick={clickHandler}
          />
        )}
      </div>
    </div>
  );
};

export default DoorsBox;

/*console.log(e.target.src);*/
