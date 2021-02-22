import React, { useState, useEffect } from 'react';
import styles from './SavedEvent.module.css';
import { Link } from "react-router-dom"
import moment from "moment";

import axios from 'axios';


export default function SavedEvents() {

    const [events, setEvents] = useState([]);
    // const { eventId } = useParams();

    const getSavedEvent = async () => {

        try {
            const result = await axios
                .get(`http://localhost:7000/event/showSavedEvents`, { withCredentials: true });
            console.log(result.data);

            if (result.data !== 0) {

                let myEvents = result.data.map((event) => {


                    let category = event.category_id.map((category) => <>{category.name}</>);
                    let eventLink = `/viewOneEvent/${event._id}`
                    const date = moment(event.dateEventstarted).format('MMMM Do YYYY, h:mm:ss a')
                    console.log('cat', event);

                    return (
                        <Link to={eventLink} >
                            <div className={styles.event}>

                                <img className={styles.events_bg} src={event.event_photo} alt="" />

                                <div className={styles.events_data}>
                                    <p className={styles.events_name_category}><span>Event Name:</span> {event.event_name}</p>
                                    <p className={styles.events_date}><span>Date:</span> {date}</p>
                                    <p className={styles.events_name_category}><span>Category:</span> {category}</p>
                                    <p className={styles.eventtype}> <span>Event Type:</span> {event.eventtype}</p>
                                    <p className={styles.language}> <span>Language:</span> {event.language}</p>
                                    {/* <p className={styles.description}> <span>Description:</span> {event.description}</p> */}
                                </div>
                            </div>
                        </Link>
                    )
                })
                setEvents(myEvents)
            }


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSavedEvent();
    }, []);

    return (
        <div className={styles.main}>

            <h2>Saved Events</h2>

            {events}

        </div>
    )
}
