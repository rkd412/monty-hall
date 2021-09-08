import React, { useEffect, useState } from "react";
import Flip from "react-reveal/Flip";
import Fade from "react-reveal/Fade";
import { FaInfoCircle, FaRegWindowClose } from "react-icons/fa";

import styles from "./MontyHall.module.css";

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

/*Below is a variation of the Fisher-Yeats
shuffle algorithm.*/

const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getKeyByValue = (obj, value) =>
  Object.keys(obj).find((key) => obj[key] === value);

const MontyHall = () => {
  const [prizes, setPrizes] = useState(prizesArr);
  const [clickCount, setClickCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState("");
  const [isActive, setIsActive] = useState("");
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [display, setDisplay] = useState(
    <h1 className={styles["prompter"]}>Choose a door!</h1>
  );
  const [stays, setStays] = useState(0);
  const [switches, setSwitches] = useState(0);
  const [staysWins, setStaysWins] = useState(0);
  const [switchesWins, setSwitchesWins] = useState(0);
  const [clickedDoor, setClickedDoor] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const stayWinRate = Math.ceil((staysWins / stays) * 100);
  const switchWinRate = Math.ceil((switchesWins / switches) * 100);

  /*Probably not the most elegant way to do it
but below is the click handler that allows the
user to select an initial closed door and then reveals
a goat behind one of the two remaining doors.
One of the two doors the user did not select is
randomly chosen; If the randomly chosen door has a goat,
it is opened. If it has the car, the other door (containing a goat)
 is opened.*/

  const doorClickHandler = (e) => {
    if (clickCount === 0) {
      setDisplay(<h1 className={styles["prompter"]}>Switch or stay?</h1>);
      let clickedId = e.target.id;
      setClickedDoor(clickedId);
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
      } else if (prizes[randomNumber] === "car") {
        setIsFlipped(
          doorsObject[newArr.filter((item) => item !== randomNumber.toString())]
        );
      }
    } else if (clickCount === 1) {
      let clickedId = e.target.id;
      setIsActive(clickedId);
      if (
        clickedId === clickedDoor &&
        prizes[getKeyByValue(doorsObject, clickedId)] === "car"
      ) {
        setStaysWins(staysWins + 1);
      } else if (
        clickedId !== clickedDoor &&
        prizes[getKeyByValue(doorsObject, clickedId)] === "car"
      ) {
        setSwitchesWins(switchesWins + 1);
      }
      clickedId === clickedDoor
        ? setStays(stays + 1)
        : setSwitches(switches + 1);
      setIsFlipped("dooronedoortwodoorthree");
      prizes[getKeyByValue(doorsObject, clickedId)] === "car"
        ? setWins(wins + 1) ||
          setDisplay(
            <h1 className={styles["prompter"]}>
              <span className={styles["winner"]}>Congratulations!</span> Try
              again?
            </h1>
          )
        : setLosses(losses + 1) ||
          setDisplay(
            <h1 className={styles["prompter"]}>
              <span className={styles["loser"]}>Sorry</span> ... try again?
            </h1>
          );
    }
    setClickCount(clickCount + 1);
  };

  const resetHandler = (e) => {
    if (clickCount === 2) {
      setClickCount(0);
      setIsFlipped("");
      setIsActive("");
      setDisplay(<h1 className={styles["prompter"]}>Choose a door!</h1>);
      setPrizes(shuffleArray(prizes));
      setClickedDoor("");
    }
  };

  const infoHandler = () => {
    setIsOpen(isOpen === true ? false : true);
  };

  /*This shuffles the prizes behind the three
  doors when the page loads*/

  useEffect(() => {
    setPrizes(shuffleArray(prizes));
  }, [prizes]);

  return (
    <div className={styles["container"]} onClick={resetHandler}>
      <Fade right>
        <div
          onClick={infoHandler}
          className={isOpen ? styles["open-modal"] : styles["closed-modal"]}
        >
          <div className={styles["text-box"]}>
            <div className={styles["text"]}>
            <p>
              The Monty Hall problem initially reached fame (or infamy) when
              Marilyn vos Savant responded to a question from reader Craig F.
              Whitaker in her column “Ask Marilyn” for Parade magazine. Whitaker
              posited, “Suppose you're on a game show, and you're given the
              choice of three doors: Behind one door is a car; behind the
              others, goats. You pick a door, say No. 1, and the host, who knows
              what's behind the doors, opens another door, say No. 3, which has
              a goat. He then says to you, "Do you want to pick door No. 2?" Is
              it to your advantage to switch your choice?” Savant correctly
              responded that of course you should switch! Contestants who switched had
              a 2/3 chance of winning the car while those who stayed a mere 1/3
              chance. The backlash to her conclusion was immediate from around
              10,000 readers including about about 1,000 PhDs sending her mail
              decisively claiming she as wrong and decrying the state of the US
              education system. Even when presented with mathematical proofs and
              computer simulations, many continued to refuse to be swayed. This
              is another such simulation and I hope you enjoy it!
            </p>
            </div>
            <div className={styles["text-box-close"]}>
              <FaRegWindowClose />
            </div>
          </div>
        </div>
      </Fade>
      <div className={styles["prompter"]}>
        {display}
        <div onClick={infoHandler} className={styles["info"]}>
          <FaInfoCircle />
        </div>
      </div>
      <div className={styles["doors-box"]}>
        <div
          className={
            isActive.includes("doorone")
              ? styles["active-door"]
              : styles["inactive-door"]
          }
        >
          {isFlipped.includes("doorone") ? (
            <Flip left>
              <input
                type="image"
                id="prizeone"
                className={styles["image"]}
                src={prizes[0] === "goat" ? goat : car}
                alt={prizes[0]}
              />
            </Flip>
          ) : (
            <input
              type="image"
              id="doorone"
              className={styles["image-door"]}
              src={door}
              alt={"door"}
              onClick={doorClickHandler}
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
            <Flip left>
              <input
                type="image"
                id="prizetwo"
                className={styles["image"]}
                src={prizes[1] === "goat" ? goat : car}
                alt={prizes[1]}
              />
            </Flip>
          ) : (
            <input
              type="image"
              id="doortwo"
              className={styles["image-door"]}
              src={door}
              alt={"door"}
              onClick={doorClickHandler}
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
            <Flip left>
              {" "}
              <input
                type="image"
                id="prizethree"
                className={styles["image"]}
                src={prizes[2] === "goat" ? goat : car}
                alt={prizes[2]}
              />
            </Flip>
          ) : (
            <input
              type="image"
              id="doorthree"
              className={styles["image-door"]}
              src={door}
              alt={"door"}
              onClick={doorClickHandler}
            />
          )}
        </div>
      </div>
      <div className={styles["score-board"]}>
        <h2>
          Wins: {wins} Losses: {losses}
        </h2>
        <h3>Stay Win Rate : {isNaN(stayWinRate) ? 0 : stayWinRate}%</h3>
        <h3>Switch Win Rate : {isNaN(switchWinRate) ? 0 : switchWinRate}%</h3>
      </div>
      <div>
        <h4 className={styles["learn-more"]}>
          Learn more about the Monty Hall problem{" "}
          <a
            href="https://en.wikipedia.org/wiki/Monty_Hall_problem"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          !
        </h4>
      </div>
    </div>
  );
};

export default MontyHall;
