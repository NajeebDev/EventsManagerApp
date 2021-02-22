import React, { useEffect, useState, useContext } from "react";
import styles from "./StartNewEvent.module.css";
import { useHistory } from "react-router-dom";
import { ModalBoxContext } from '../ModalBox/ModalBox'
import axios from "axios";
import { UserStateContext } from "../../App";
import { NotificationsContext } from '../Notifications/Notifications';


export default function StartNewEvent(e) {

    const [category, setCategory] = useState([]);

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('add a photo');
    const { addModalBox } = useContext(ModalBoxContext)
    const { addNotificationToQueue } = useContext(NotificationsContext);


    const history = useHistory();

    const sendEvent = async (e) => {

        const allData = new FormData();

        allData.append('file', file);
        allData.append('name', name);
        allData.append('category', category_id);
        allData.append('description', description);
        allData.append('location', location);
        allData.append('language', language);
        allData.append('member', member);
        allData.append('eventtype', eventtype);
        allData.append('date', date);
        allData.append('time', time);


        try {

            const result = await axios({
                method: 'POST',
                url: 'http://localhost:7000/event/startNewEvent',
                heasers: {
                    Accept: "application/json",
                    'Content-Type': 'multipart/form-data'

                },
                withCredentials: true,
                data: allData

            })

        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            if (name === '' || description === '' || category_id === '' ||
                date === '' || time === '' || location === '' ||
                eventtype === '' || language === '' || member === '') {
                addNotificationToQueue("Please fill out the required inputs")

            }
            else {

                await sendEvent();

                addModalBox(
                    <>
                        <p>The Event have been Created successfully.</p>
                        <p>You will redirect to the Homepage.</p>
                    </>
                )

                setTimeout(() => {
                    history.push("/")
                }, 2000);

            }

        } catch (error) {
            console.log('server error ');
        }

    }

    const [eventData, setEventData] = useState({
        name: "",
        category_id: "",
        description: "",
        date: "",
        time: "",
        location: "",
        language: "",
        member: "",
        eventtype: "",
    });


    const {
        name,
        category_id,
        description,
        date,
        time,
        location,
        language,
        member,
        eventtype,
    } = eventData;


    const changeHandler = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        getCategory()

    }, [])

    const getCategory = async () => {

        try {
            const result = await axios.get("http://localhost:7000/category/view");
            if (!result) {
                console.log('server error');
            }
            console.log("cat result", result.data);
            setCategory(result.data)

        } catch (error) {
            console.log('server error');
        }
    };

    const photoHandler = (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }


    return (
        <div className={styles.newEventForm}>

            <h1 className={styles.eventHead}>Create New Event</h1>
            <p className={styles.eventNote}>* All inputs are required </p>

            <form onSubmit={handleSubmit} >

                <div className={styles.inputContainer}>
                    <label htmlFor="name">Event Name *</label>
                    <input onChange={changeHandler}
                        type="text" name="name"
                        placeholder="Event Name" />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="photo">Event Photo *</label>
                    <input className={styles.uploadPhoto} onChange={photoHandler}
                        type="file" name="photo" />
                    {/* <div>fileName</div> */}
                </div>


                <div className={styles.inputContainer}>
                    <label htmlFor="category_id">Category *</label>
                    <select onChange={changeHandler}
                        className={styles.catDropDown} name="category_id" >
                        <option>please Select category</option>

                        {category &&
                            category.map((category) => {
                                return (
                                    <option

                                        key={category._id}
                                        value={category._id}
                                    // 

                                    >{category.name}
                                    </option>
                                );
                            })}
                    </select>
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="location">Location *</label>
                    <input onChange={changeHandler}
                        type="text" name="location"
                        placeholder="Location" />
                </div>

                <div className={styles.inputContainer}>

                    <label htmlFor="language">Language</label>
                    <input onChange={changeHandler}
                        type="text" name="language"
                        placeholder="Language" />
                </div>

                <div className={styles.inputContainer}>

                    <label htmlFor="member">Members *</label>
                    <input onChange={changeHandler}
                        type="number" name="member"
                        placeholder="member" />
                </div>


                <div className={styles.inputContainer}>
                    <label className={styles.eventType}>Event Type *</label>
                    <div className={styles.radioContainer}>

                        <div className={styles.radio}>

                            <label htmlFor="eventtype">Online</label>
                            <input onChange={changeHandler}
                                type="radio" name="eventtype"
                                value="Online" placeholder="" />
                        </div>

                        <div className={styles.radio}>
                            <label htmlFor="eventtype">Inhouse</label>
                            <input onChange={changeHandler}
                                type="radio" name="eventtype"
                                value="Inhouse" placeholder="" />
                        </div>
                    </div>
                </div>



                <div className={styles.inputContainer}>
                    <label htmlFor="dateEventstarted">Date *</label>
                    <input onChange={changeHandler}
                        type="date" name="date"
                        placeholder="" />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="dateEventstarted">Time *</label>
                    <input onChange={changeHandler}
                        type="time" name="time"
                        placeholder="" />

                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="description">Description *</label>
                    <textarea className={styles.description} onChange={changeHandler}
                        type="" name="description"
                        placeholder="Event Description" />
                </div>

                <button type="submit" value=""
                    className={styles.saveBtn}>Save Event</button>

            </form>

        </div>

    )
}
