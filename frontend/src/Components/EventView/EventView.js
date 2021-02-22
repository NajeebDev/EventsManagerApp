import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ModalBoxContext } from '../ModalBox/ModalBox';
import { UserStateContext } from '../../App';

import styles from './EventView.module.css';
import axios from 'axios';
import moment from "moment";



const EventView = (props) => {

    const [eventDetails, setEventDetails] = useState({});

    const [attended, setAttended] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [savedEvents, setSavedEvents] = useState(false);

    const { addModalBox } = useContext(ModalBoxContext);
    const { loggedInState } = useContext(UserStateContext)
    const { eventId } = useParams();

    const loggedIn = JSON.parse(window.localStorage.getItem("loggedIn") ? true : false);

    const getEventDetails = async () => {

        try {

            const result = await axios
                .get(`http://localhost:7000/event/viewOneEvent/${eventId}`,
                    { withCredentials: true });

            console.log('result', result.data);

            if (result.data) {


                if (result.data.user_id._id === loggedInState) {
                    setIsHost(true)
                }

                const user = result.data.participants.includes(loggedInState)
                if (user) {
                    console.log(' setAttended(true)');
                    setAttended(true)
                }

                const event = result.data.user_id.savedEvents.includes(result.data._id)
                if (event) {
                    setSavedEvents(true)
                }

                setEventDetails(result.data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEventDetails();

    }, []);


    const getAttendEvent = async () => {

        if (loggedIn) {

            try {
                const result = await axios
                    .get(`http://localhost:7000/event/attendEvents/${eventId}`,
                        { withCredentials: true });

                console.log("event view", result.data);

                if (result.data.user) {
                    setAttended(true)
                    addModalBox(
                        <>
                            <p>Thank you for joining this Event.</p>
                        </>
                    )
                }
            } catch (error) {
                console.log(error);
            }
        } else { props.history.push("/login") }

    }

    const getLeaveEvent = async () => {

        if (loggedIn) {

            try {

                const result = await axios
                    .get(`http://localhost:7000/event/leaveEvents/${eventId}`,
                        { withCredentials: true });

                console.log('leave event', result.data);

                if (result.data.user) {
                    setAttended(false)
                    addModalBox(
                        <>
                            <p>You have leaved this Event.</p>
                        </>
                    )
                }

            } catch (error) {
                console.log(error);
            }

        } else { props.history.push("/login") }

    }

    const getSavedEvent = async () => {

        if (loggedIn) {

            try {
                const result = await axios
                    .get(`http://localhost:7000/event/savedEvents/${eventId}`,
                        { withCredentials: true });

                console.log('save event', result);

                if (result.data) {
                    setSavedEvents(true)
                    addModalBox(
                        <>
                            <p>You have Saved this Event.</p>
                        </>
                    )
                }

            } catch (error) {
                console.log(error);
            }
        } else { props.history.push("/login") }

    }

    const getUnsavedEvent = async () => {

        if (loggedIn) {

            try {
                const result = await axios
                    .get(`http://localhost:7000/event/unsavedEvents/${eventId}`,
                        { withCredentials: true });

                console.log('unsave event', result);

                if (result.data) {
                    setSavedEvents(false)
                    addModalBox(
                        <>
                            <p>this Event have been unsaved.</p>
                        </>
                    )
                }

            } catch (error) {
                console.log(error);
            }
        } else { props.history.push("/login") }
    }


    const getDeleteEvent = async () => {

        if (loggedIn) {

            try {
                const result = await axios
                    .delete(`http://localhost:7000/event/deleteEvent/${eventId}`,
                        { withCredentials: true });

                console.log('delete event', result);

                if (result) {
                    addModalBox(
                        <>
                            <p>This Event have been deleted successfully.</p>
                            <p>You will redirect to the Homepage.</p>
                        </>
                    )
                }

                setTimeout(() => {
                    props.history.push("/")
                }, 2000);

            } catch (error) {
                console.log(error);
            }
        } else { props.history.push("/login") }
    }


    const date = moment(eventDetails.dateEventstarted).format('MMMM Do YYYY, hh:mm a')
    const host_photo = `/uploads/${eventDetails.user_id && eventDetails.user_id.photo}`

    return (

        <div className={styles.events_show}>

            <div className={styles.events_}>

                <div className={styles.events_head}>
                    <img className={styles.events_show_bg} src={eventDetails.event_photo} alt="" />

                    <div className={styles.event_nameDate}>
                        <h1 className={styles.event_name}>{eventDetails.event_name}</h1>
                        <p className={styles.event_date}>Date: {date}</p>
                    </div>
                </div>

                <div className={styles.events_actions}>
                    <div className={styles.host_container}>
                        <img className={styles.host_photo} src={host_photo} alt="" />
                        <p className={styles.host_name}>Hosted by: <br /> {eventDetails.user_id && eventDetails.user_id.firstName} {eventDetails.user_id && eventDetails.user_id.lastName}</p>
                    </div>

                    <div>

                        {attended ?
                            <button onClick={getLeaveEvent}
                                className={styles.leave_btn}>Leave Event</button>
                            :
                            <button onClick={getAttendEvent}
                                className={styles.join_btn}>Join Event</button>
                        }

                        {savedEvents ?
                            <button onClick={getUnsavedEvent}
                                className={styles.unsave_btn}>Unsave Event</button>
                            :
                            <button onClick={getSavedEvent}
                                className={styles.save_btn}>Save Event</button>
                        }

                        {isHost ?
                            <button onClick={getDeleteEvent}
                                className={styles.delete_btn}>Delete Event</button>
                            : null}

                    </div>

                </div>

            </div>

            <div className={styles.eventShow}>

                <div className={styles.eventShow1}>
                    <h1 className={styles.description_head}>Description</h1>
                    <p className={styles.description_text}>{eventDetails.description}</p>
                </div>

                <div className={styles.eventShow2}>

                    <h3 className={styles.shareHead}>Share:</h3>

                    <i className="icon-xing-sign icon-3x"></i>
                    <i className="icon-linkedin-sign icon-3x"></i>
                    <i className="icon-facebook-sign icon-3x"></i>
                    <i className="icon-github icon-3x"></i>
                    <i class="icon-stackexchange icon-3x"></i>

                    {/* <button className={styles.share_btn}>Share Event</button> */}

                </div>
            </div>

        </div>
    )
}

export default EventView