import React, { useContext, useState } from 'react'
import Button from '../Button/Button'
// import {Button} from '../Button'
import { Link } from "react-router-dom";
import logo from '../../Images/logo.png';
import styles from './Header.module.css';
import { UserStateContext } from '../../App';
import Dropdown from '../Dropdown/Dropdown'

export default function Header() {

    // const[click,setClick]=()=>useState(false)

    // const handleClick=()=>setClick(!click)

    const { loggedInState } = useContext(UserStateContext);

    const [dropdown, setdropdown] = useState(false)

    const onMauseEnter = () => {

        if (window.innerWidth < 960) {

            setdropdown(false);
        } else {

            setdropdown(true)
        }
    }

    const handleMouseEnter = () => {
        setdropdown(true)
    }

    const handleMouseLeave = () => {
        setdropdown(false)
    }

    if (loggedInState) {

        return (
            <div className={styles.header}>
                <nav className={styles.nav}>
                    <img className={styles.logo} src={logo} alt={"logo"} />

                    <ul className={styles.nav_list}>
                        <li>
                            <Link to={'/'} className='navbar-logo'>Home</Link>

                        </li>

                        <li onMouseEnter={handleMouseEnter}>
                            <Link className='navbar-logo'>Account</Link>
                            {/* <Link to={'/Account'} className='navbar-logo'>Account</Link> */}
                            {dropdown && <Dropdown handleMouseLeave={handleMouseLeave} />}
                        </li>

                        {/* <li>
                            <Link to={'/profileUpdate'}>Profile</Link>

                        </li> */}

                        {/* <li>
                            <Link to={'/Messages'}>Messages</Link>
                        </li>
                        <li>
                            <Link to={'/notification'}>Notification</Link>
                        </li> */}

                        <li>
                            <Link to={'/contact'}>Contact</Link>
                        </li>

                    </ul>
                </nav>

                <div className={styles.header_bg1}>
                    <div className={styles.header_text}>
                        <p className={styles.header_tittel}>Enjoy Coding Events,
                        <br /> learning, Workshops, Classes from Home.</p>
                        <a className={styles.btn}
                            href="http://localhost:3000/startNewEvent">Start New Event</a>
                    </div>
                </div>

            </div>
        )

    } else {

        return (

            <div className={styles.header}>
                <nav className={styles.nav}>
                    <img id="logo" src={logo} alt={"logo"} />

                    <ul className={styles.nav_list}>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/login'}>Login</Link>
                        </li>
                        <li>
                            <Link to={'/signup'}>Signup</Link>
                        </li>
                        <li>
                            <Link to={'/about'}>About us</Link>
                        </li>
                        <li>
                            <Link to={'/contact'}>Contact us</Link>
                        </li>
                    </ul>

                    {/* <Button /> */}

                </nav>

                <div className={styles.header_bg}>
                    <div className={styles.header_text}>
                        <p className={styles.header_tittel}>Enjoy Coding Events, <br /> learning, Workshops, Classes from Home.</p>
                        {/* <button className={styles.btn} >Join us </button> */}
                        <a className={styles.btn} href="http://localhost:3000/signup">Join us</a>
                    </div>
                </div>
            </div>
        )
    }
}