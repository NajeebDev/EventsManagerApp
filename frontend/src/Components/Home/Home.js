import React from 'react'
import Search from '../Search/Search';
import styles from './Home.module.css';
import HomeDefault from './Default';
import HomeLoggedIn from './LoggedIn';

function Home() {

    const loggedIn = JSON.parse(window.localStorage.getItem("loggedIn") ? true : false);

    return (
        <div className={styles.main}>
            <Search />
            {loggedIn ? <HomeLoggedIn /> : <HomeDefault />}
        </div>
    )
}

export default Home