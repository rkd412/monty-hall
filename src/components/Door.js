import styles from "./Door.module.css";

const DoorCard = (props) => {
  return (
    <div className={styles["door"]}>
      <h1 className={styles["door-text"]}>{props.title}</h1>
      <img className={styles["image"]} src={props.src} />
    </div>
  );
};

export default DoorCard;
