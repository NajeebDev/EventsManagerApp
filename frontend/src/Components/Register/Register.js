import React, {useContext} from 'react'
import styles from './Register.module.css';
import { useHistory } from "react-router-dom"
import {ModalBoxContext} from '../ModalBox/ModalBox'
import axios from 'axios'



const Register = (e) => {
const {addModalBox} = useContext(ModalBoxContext)

    const history = useHistory();
    const sendRegister = async (registerData) => {
        const config = {
            'Content-Type': 'application/json'

        }
        try {
            const result = await axios.post('http://localhost:7000/user/register', registerData, config)
            console.log(result);
            localStorage.setItem("registered", JSON.stringify(true))
            history.push('/login')
        }
        catch(error){
            addModalBox("User already exist. Please login now")
        } //
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        const formData = new FormData(e.target)
        const data=  {
            userName:formData.get("userName"),
            firstName:formData.get("firstName"),
            lastName:formData.get("lastName"),
            email:formData.get("email"),
            // gender:formData.get("gender"),
            password:formData.get("password"),
            password_confirm:formData.get("confirm_password")


        }
        
        try{
            sendRegister(data)
            // const registered = localStorage.getItem("registered")
            // registered = JSON.parse(registered)
            
            // console.log(registered);

        }
        catch (error) {
            console.log(error);
        }
    }



    return (
        <div className ={styles.formcontainer}>
            <h1 className={styles.textregister}>
                 Registration 
            </h1>
            <form onSubmit={handleSubmit} className={styles.formheader} >
                 <div className={styles.formgroup1}>
                    <label id="icon" htmlFor="userName"> <i class="icon-user"></i></label>
                    <input type="text" name="userName"  placeholder="User Name"  />
                </div>

               <div className={styles.formgroup}>
                    <label id="icon"  htmlFor="firstName"> <i class="icon-user"></i></label>
                    <input type="text" name="firstName" placeholder="First Name"    />
                </div>

               <div className={styles.formgroup}>
                    <label id="icon"  htmlFor="lastName"> <i class="icon-user"></i></label>
                    <input type="text" name="lastName" placeholder="Last Name"     />
                </div>

                 {/* <div className={styles.formgroupgender}>
                    <input className={styles.formgroupgenderinput}  type="radio" name="gender" id="Female" value="true" checked/> 
                   
                    <label className={styles.formgroupgenderlabel}  htmlFor="gender" class="radio"  chec>Female</label>
                    </div>
                   
                    <div className={styles.formgroupgender}>
                    <input className={styles.formgroupgenderinput}  type="radio" name="gender" id="Male" value="None" /> 
                    
                    <label className={styles.formgroupgenderlabel}  htmlFor="gender" class="radio"  chec>Male</label>
                </div> */}

                <div className={styles.formgroup}>
                    <label id="icon"  htmlFor="email"><i class="icon-envelope "></i></label>
                    <input type="email" name="email" placeholder="Email"   />
                </div>

                <div className={styles.formgroup}>
                    <label id="icon"  htmlFor="password"><i class="icon-shield"></i></label>
                    <input type="password" name="password" placeholder="Password"/>
                </div>

                <div className={styles.formgroup}>
                    <label id="icon"  htmlFor="password"><i class="icon-shield"></i></label>
                    <input type="password" name="password_confirm" placeholder="Confirm Password" />
                </div>
                <p>By clicking Register, you agree on our <a href="#">terms and condition</a>.</p>
                <input type="submit" value="Register" className={styles.submitregister} />
            </form>

        </div>
    )
}

export default Register;