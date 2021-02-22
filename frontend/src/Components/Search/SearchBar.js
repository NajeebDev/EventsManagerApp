import React from 'react'
import styles from './Search.module.css';

const SearchBar = (props) => {

    return (
        <form onSubmit={props.onSubmit} className={styles.search_form} >
            <input  className={styles.search_input1} name="event_name" placeholder="Search for..." />
            <input  className={styles.search_input2} name="location" placeholder="Location..." />
            <button className={styles.btn} type="submit">Search</button>
        </form>
    );
}

export default SearchBar