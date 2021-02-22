import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import styles from "./multiStep.module.css";
import { ModalBoxContext } from '../ModalBox/ModalBox';


function FinalStep(props) {

  const { addModalBox } = useContext(ModalBoxContext);

  const history = useHistory();

  const [cat, setCat] = useState([]);


  useEffect(() => {
    getCat()
  }, [])




  const getCat = async () => {

    try {
      const result = await axios.get("http://localhost:7000/category/view");
      if (!result) {
        console.log('server error');
      }
      console.log("cat result", result.data);

      const catName = (result.data.filter((item) => item._id === props.state.category));
      console.log('catName', catName[0].name);

      setCat(catName[0].name)

    } catch (error) {
      console.log('server error');
    }
  };

  const Submit = async () => {

    // const config = {
    //   method: "POST",
    //   withCredentials: true,
    //   headers: { "Content-Type": "application/json" },
    // };
console.log("props.state: ", props.state);
    try {
      const result = await fetch("http://localhost:7000/event/startNewEvent", {
        body: JSON.stringify(props.state),
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (result) {
        addModalBox(
          <>
            <p>The Event have been Created successfully.</p>
            <p>You will redirect to the Homepage.</p>
          </>
        )
      }

      setTimeout(() => {
        history.push("/")

      }, 2000);

      console.log(345435, result);
    } catch (error) {
      alert(error);
    }
  };

  return (

    <div className={styles.finalStep}>

      <div className={styles.finalShow}>
        <div className={styles.column1}>

          <img src={props.state.photo} />

          <h3>Event name:{props.state.name}</h3>
          <h3>Location:{props.state.location}</h3>
          <h3>Language:{props.state.language}</h3>
          <h3>No. Member:{props.state.member}</h3>
          <h3>Event Type:{props.state.eventtype}</h3>
          <h3>Category:{cat}</h3>
          <h3>Date:{props.state.date}</h3>
          <h3>Time:{props.state.time}</h3>
        </div>

        <div className={styles.column2}>

          <h3>Description:<br />{props.state.description}</h3>
        </div>

      </div>

      <div className={styles.button}>
        <button className={styles.btn_previous} onClick={props.prev}>Previous</button>
        <button className={styles.btn_save} onClick={Submit}>Save</button>
      </div>
    </div>
  );
}

export default FinalStep;
