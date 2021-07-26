import styles from "./Door.module.css";
import goat from '../assets/goat.jpg'
import car from '../assets/car.jpg'
const DoorCard = () => {
  return (
    <div className={styles["door"]}>
      <h1 className={styles["door-text"]}>Something</h1>
      <img className={styles["image"]} src={goat} />
    </div>
  );
};

export default DoorCard;
