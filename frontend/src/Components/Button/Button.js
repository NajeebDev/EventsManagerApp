import React from 'react'
import {Link} from 'react-router-dom';
import styles from './Button.module.css'

export default function Button() {
    return (
        <Link>
        <button className={styles.btn}>Sign Up</button>
        </Link>
    )
}
