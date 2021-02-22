// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';


// export default function AttendEvents() {

//     const [confirmMsg, setConfirmMsg] = useState({});
//     const { eventId } = useParams();

//     const getConfirmMsg = async () => {

//         try {
//             const result = await axios
//                 .get(`http://localhost:7000/event/attendEvents/${eventId}`);
//             console.log(result.data);
//             if (result.data) {

//                 setConfirmMsg(result.data)

//             }

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         getConfirmMsg();
//     }, []);

//     return (
//         <div>
//             <p>AttendEvents {eventId}</p>
//             {confirmMsg}
//         </div>
//     )
// }
