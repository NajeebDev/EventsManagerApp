import axios from 'axios';
import React, { useState, useEffect } from 'react'
import styles from "./multiStep.module.css";


export default function Category8(props) {

  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory()

  }, [])

  const getCategory = async () => {

    try {
      const result = await axios.get("http://localhost:7000/category/view");
      if (!result) {
        console.log('server error');
      }
      console.log("cat result", result.data);
      setCategory(result.data)

    } catch (error) {
      console.log('server error');
    }
  };


  return (

    <div className={styles.background}>

      <div className={styles.catBox}>
        <p className={styles.text}> Select a Category:</p>

        <select className={styles.catDropDown} name="category" onChange={props.handleChange}  >
          <option>please Select category</option>

          {category &&
            category.map((category) => {
              return (
                <option

                  key={category._id}
                  value={category._id}
                // 

                >{category.name}
                </option>
              );
            })}
        </select>
      </div>

      <div className={styles.button}>
        <button  className={styles.btn_previous} onClick={props.prev}>Previous</button>
        {props.hasNext() && <button  className={styles.btn_next} onClick={props.next}>Next</button>}
      </div>
    </div>
  );

}
