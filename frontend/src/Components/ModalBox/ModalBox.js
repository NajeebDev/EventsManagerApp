import React, { useState, createContext } from 'react'
import styles from './ModalBox.module.css';


export const ModalBoxContext = createContext();

export default function ModalBox(props) {

    const [modalBox, setModalBox] = useState();
    const [show, setShow] = useState(false);

    const addModalBox = (message) => {

        setModalBox(message);
        setShow(true)

        setTimeout(() => {
            setModalBox();
            setShow(false)
        }, 2000);
    };


    // const close = {
    //     display: "none"
    // };


    // When the user clicks on <span> (x), close the modal
    // const handleClose = () => {
    //     style.display = "none";
    // }


    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function (event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }


    return (

        <ModalBoxContext.Provider value={{ addModalBox }}>

            <>
                {show ?
                    <div className={styles.modal}>

                        <div className={styles.modalContent}>

                            {/* <span className={styles.close}>&times;</span> */}

                            <p className={styles.modalBox}>{modalBox}</p>
                        </div>

                    </div>
                    :

                    null
                }
            </>

            {props.children}

        </ModalBoxContext.Provider>
    )
}


