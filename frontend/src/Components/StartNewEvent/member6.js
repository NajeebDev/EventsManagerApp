
import styles from "./multiStep.module.css";
import React from 'react'

export default function member6(props) {
  return (
    <div className={styles.background}>
      <p className={styles.text}>
        member:
          <input
          value={props.getState("member")}
          name="member"
          onChange={props.handleChange}
          required={true}
        />
      </p>

      <div className={styles.button}>
        <button className={styles.btn_previous} onClick={props.prev}>Previous</button>
        {props.hasNext() && <button className={styles.btn_next} onClick={props.next}>Next</button>}
      </div>
    </div>
  );
}
