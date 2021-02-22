
import styles from "./multiStep.module.css";

import React from 'react'

export default function Eventtype7(props) {
  return (

    <div className={styles.background}>

      <form className={styles.newEventForm}>

        <p className={styles.text}>Eventtype:</p>
        
        <div className={styles.radioBox}>
          <div>

            <label className={styles.radio}>
              Online
            <input

                type="radio"
                value="Online"
                name="eventtype"
                onChange={props.handleChange}
              />
            </label>
          </div>
          <div>

            <label className={styles.radio}>
              Inhouse
            <input

                type="radio"
                value="Inhouse"
                name="eventtype"
                onChange={props.handleChange}
              />
            </label>
          </div>
        </div>
      </form>

      <div className={styles.button}>
        <button className={styles.btn_previous} onClick={props.prev}>Previous</button>
        {props.hasNext() && <button className={styles.btn_next} onClick={props.next}>Next</button>}
      </div>
    </div>
  );
}
