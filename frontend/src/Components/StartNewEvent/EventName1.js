import styles from "./multiStep.module.css"

import React from "react";

export default function Step1(props) {
  console.log(props.state);

  return (

    <div className={styles.background}>

      <p className={styles.text}>
        Enter a name for Your Event:
          <input
          value={props.getState("name")}
          onChange={props.handleChange}
          name="name"
          required
        />
      </p>

      <div className={styles.button}>
        <button  className={styles.btn_previous} onClick={props.prev}>Previous</button>
        {props.hasNext() && <button  className={styles.btn_next} onClick={props.next}>Next</button>}
      </div>
    </div>
  );
}