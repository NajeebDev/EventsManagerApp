import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import styles from './Home.module.css';
import axios from 'axios';
import moment from 'moment';


const LocationEventView = (props) => {

    const { eventLocation } = props.match.params;
    console.log(props);
    console.log(eventLocation);

    const [events, setEvents] = useState();


    const getEvents = async () => {

        try {
            const result = await axios.get(`http://localhost:7000/event/viewBySelectedLocation/${eventLocation}`);

            const data = result.data;

            if (data !== 0) {

                let details = data.map((event) => {

                    // console.log(event);

                    let category = event.category_id.map((category) => <>{category.name}</>);

                    let eventLink = `/viewOneEvent/${event._id}`
                    const date = moment(event.dateEventstarted).format('MMMM Do YYYY, h:mm:ss a')

                    return (
                        <Link to={eventLink} >

                            <div className={styles.event}>

                                <img className={styles.event_bg} src={event.event_photo} alt="" />

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
                });

                setEvents(details)
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getEvents();

    }, []);


    return (
        <div className={styles.main}>

            <h1> All Events in {eventLocation} </h1>

            {events}

        </div>
    )
}

export default LocationEventView