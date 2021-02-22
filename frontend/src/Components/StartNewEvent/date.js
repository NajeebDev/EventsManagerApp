import React from "react";
import styles from "./multiStep.module.css";

export default function Date9(props) {


  return (
    <div className={styles.background}>

      <div>
        <p className={styles.text}>
          date:
        <input
            type="date"
            value={props.getState("date")}
            name="date"
            onChange={props.handleChange}
          />
        </p>

        <p className={styles.text}>
          Time:
        <input
            type="time"
            value={props.getState("time")}
            name="time"
            onChange={props.handleChange}
          />
        </p>
      </div>

      <div className={styles.button}>

        <button  className={styles.btn_previous} onClick={props.prev}>Previous</button>

        {props.hasNext() && <button  className={styles.btn_next} onClick={props.next}>Next</button>}

      </div>
    </div>
  );
}
