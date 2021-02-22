import React from 'react'
import styles from './Footer.module.css';


export default function Footer() {

    return (
        <div className={styles.footer}>

            <div className={styles.containerfooter} >
                <ul className={styles.subcontainer}>
                    {/* <li className={styles.contactus}>Contact Us</li> */}
                    <li><i class="icon-home icon-2x"></i> Wandalenweg 30, 20097 Hamburg</li>
                    <li><i class="icon-time icon-2x"></i>  Mondays-Fridays 9am-6pm</li>
                    <li><i class="icon-phone-sign icon-2x"></i> 040 882157080</li>
                </ul>
                <div className={styles.media}>

                    {/* <p className={styles.follow}>Follow Us</p> */}

                    <ul className={styles.subcontainer1}>
                        <li className={styles.follow}>Follow Us</li>
                        <li><a href="https://www.facebook.com/"><i class="icon-facebook-sign icon-2x btn-white" ></i> </a></li>
                        <li><a href="https://www.instagram.com/"><i class="icon-instagram icon-2x btn-success"></i></a></li>
                        <li><a href="https://www.youtube.com/"><i class="icon-youtube-sign icon-2x btn-danger"></i></a></li>
                        <li><a href="https://github.com/jasmin-mn/Event-App"><i class="icon-github icon-2x"></i></a></li>
                    </ul>

                </div>
            </div>

            <p className={styles.copyRight} >&copy; 2021 EventsMGR Team</p>

        </div>
    )
}



