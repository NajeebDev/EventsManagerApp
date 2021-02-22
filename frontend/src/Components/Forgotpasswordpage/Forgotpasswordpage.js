import React, { useState, useContext } from "react";
import styles from './Forgotpasswordpage.module.css'
import {ModalBoxContext} from '../ModalBox/ModalBox'
import axios from 'axios';



function Forgotpasswordpage() {
  const [email, setEmail ] = useState();
  const {addModalBox} = useContext(ModalBoxContext)
  
  const changeEmail = (e)=>{
    setEmail(e.target.value)
  }
  const sendData = async(data)=>{
    const config = {
      // withCredentials: true,
      headers : {  
      'Content-Type': 'application/json'
    },
    // withCredentials: true
      
    };
    try {
     
      const result =await axios.post('http://localhost:7000/user/forgotPassword',data , config);
      console.log(result);
      addModalBox("Check your email to change your password")
      
      
    } catch (error) {
      console.log(error);
    }

  }
  const submitForm = async(e)=>{

    e.preventDefault();
    sendData({email})
     
  }
  return (
    <div className={styles.containerforgotpw}>
      <h1 class="fa fa-lock fa-4x">Forgot Password</h1>
      <p className={styles.paragforgotpw}>You can reset your password here.</p>
      <form onSubmit= {submitForm} className={styles.forgotpasswordform}> 
        <div className={styles.forgotpassword} >
          <label htmlFor="email"><i className={styles.containerforgotpwicon} class="icon-envelope "></i></label>
          <input className={styles.forgotpasswordinput}type="email" onChange={changeEmail} name="email" placeholder = " Enter your email" />
          </div>
          <input type="submit" value="Submit" className={styles.submitforgotpw} />
        
      </form>
    </div>
  );
}

export default Forgotpasswordpage;

