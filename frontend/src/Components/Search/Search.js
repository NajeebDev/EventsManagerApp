import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';
import styles from './Search.module.css';
import moment from "moment";
import axios from "axios";
// import { NotificationsContext } from '../Notifications/Notifications';

const Search = () => {

    const [events, setEvents] = useState([]);
    const [serchInputs, setSerchInputs] = useState(true);
    const [serchResults, setSerchResults] = useState(true);

    // const { addNotificationToQueue } = useContext(NotificationsContext);

    const getEvents = async (searchEvents) => {

        const config = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }

        try {
            const result = await axios.post('http://localhost:7000/search', searchEvents, config);
            console.log('Search Events:')
            console.log(result.data)

            if (result.data) {
                let mySearch = result.data.map((event) => {
                    console.log(event);

                    let category = event.category_id.map((category) => <>{category.name}</>);
                    let eventLink = `/viewOneEvent/${event._id}`
                    const date = moment(event.dateEventstarted).format('MMMM Do YYYY, h:mm:ss a')

                    return (
                        <Link to={eventLink} >
                            <div className={styles.event}>
                                <img className={styles.events_bg} src={event.event_photo} alt="" />
                                <div className={styles.events_data}>
                                    <p className={styles.events_name_category}><span>Event Name:</span> {event.event_name},{category}</p>
                                    <p className={styles.events_date}><span>Date:</span> {date}</p>
                                    <p className={styles.events_name_category}><span>Category:</span> {category}</p>
                                    <p className={styles.eventtype}> <span>Event Type:</span> {event.eventtype}</p>
                                    <p className={styles.language}> <span>Language:</span> {event.language}</p>
                                    {/* <p className={styles.description}> <span>Description:</span> {event.description}</p> */}
                                </div>
                            </div>
                        </Link>
                    )
                });

                setEvents(mySearch)

            }
            setSerchResults(false)

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target)
        const data = {
            event_name: formData.get("event_name").trim(),
            location: formData.get("location").trim()
        }

        console.log(data);


        try {
            if (data.event_name === "" && data.location === "") {

                // addNotificationToQueue("Unfortunately, no events were found.")
                setEvents([])
                setSerchInputs(false)

            } else {
                setSerchInputs(true)
                getEvents(data)
            }

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <div className={styles.search}>
                <p className={styles.search_text}>Search for your next Event</p>
                <SearchBar onSubmit={handleSubmit} />
            </div>


            {!serchInputs && <p className={styles.searchErr}>Please enter at less one value to get Results</p>}
            {events}

        </>
    );
}

export default Search