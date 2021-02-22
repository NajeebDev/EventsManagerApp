import React, { useEffect, useState, useContext } from "react";
import styles from "./multiStep.module.css";



export default function EventPhoto2(props) {

  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('please choose img');
  const [uploadedFile, setUploadedFile] = useState({});

  const handlePhoto = (e) => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name);
    
  }

  return (
    <div className={styles.background}>
      <p className={styles.text}>
        Upload your Photo:
          <input
          type="file"

          onChange={props.handleChange}
          name="photo"
        
        />
        <h3>{fileName}</h3>

      </p>


      <div className={styles.button}>
        <button className={styles.btn_previous} onClick={props.prev}>Previous</button>
        {props.hasNext() && <button className={styles.btn_next} onClick={props.next}>Next</button>}
      </div>
    </div>
  );
}
