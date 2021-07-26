import Door from './Door'

import styles from "./DoorsBox.module.css";

const DoorsBox = () => {
  return (
    <div className={styles["doors-box"]}>
      <Door />
      <Door />
      <Door />
    </div>
  );
};

export default DoorsBox;
