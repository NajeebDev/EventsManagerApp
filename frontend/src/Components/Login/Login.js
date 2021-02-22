import React, { useContext } from 'react'
import styles from './Login.module.css';
import { useHistory } from "react-router-dom"
import axios from 'axios';
import { UserStateContext } from '../../App';
import {ModalBoxContext} from '../ModalBox/ModalBox'

const Login = (event) => {
    const {addModalBox} = useContext(ModalBoxContext)

    const { setLoggedIn } = useContext(UserStateContext)
    const history = useHistory();

    const sendLogin = async (allFormData) => {

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        try {
            const result = await axios.post('http://localhost:7000/user/login', allFormData, config)
            setLoggedIn(result.data)
            history.push('/')
        } catch (error) {
            addModalBox("You have entered an invalid email or password")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target)
        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        try {
            sendLogin(data);
            // if the user successfully logs in
            // save the item "loggedIn" into localstorage, set it to true



        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <h1
                className={styles.user}> Login
            </h1>
            <form onSubmit={handleSubmit} className={styles.formcontainer} >
                <div className={styles.form}>
                    <label htmlFor="email"><i class="icon-envelope "></i></label>
                    <input type="email" name="email" placeholder="Email" />
                </div>
                <div className={styles.containerpw}>
                    <label htmlFor="password"><i class="icon-shield"></i></label>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <input type="submit" value="Login" className={styles.login} />
                <h2 className={styles.containerhelp}>
                    Need to <a href="/signup">sign up</a> for an account
                    or <a href="/forgotPassword" id="forgot_password_link" >reset</a> your password?
                    </h2>
            </form>
        </div>
    )
}

export default Login;