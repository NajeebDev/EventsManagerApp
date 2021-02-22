import React, { useEffect, useState, useContext } from "react";
import styles from "./Profilepage.module.css";
import { useHistory } from "react-router-dom";
import {ModalBoxContext} from '../ModalBox/ModalBox'
import axios from "axios";


function Profilepage(e) {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadedFile , setUploadedFile] = useState({});
  const {addModalBox} = useContext(ModalBoxContext)
  // const [modal, setModal] = useState(false)


  // delete 
  // const [deleteId, setDeleteId] = useState()
  // useEffect(()=>{
  //   getData() 

  // },[])
  //  const getData = async(deleteData)=>{
  //    const response = await axios.get("http://localhost:7000/user/profile")
  //    setDeleteId(response.data)
  //  }
  

  //  const removeData = (id)=>{
  //    axios.delete("http://localhost:7000/user/deleteAccount").then(response =>{
  //      const del = deleteId.filter(deleteId=> id !== deleteId.id )
  //      setDeleteId(del)

  //    })
  //  }

  //  const renderHeader = (e)=>{
  //   const headerElement = ['id','email']
    
  //  }
// end of delete part


  const [userData, setUserData] = useState({
    photo: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    place: "",
    hometown: "",
    
    language: "",
    yourInterests: "",
    other: "",
  });
  

  const {
    photo,
    userName,
    firstName,
    lastName,
    email,
    age,
    place,
    hometown,
    
    language,
    yourInterests,
    others,
  } = userData;
  
  const getUser = async (update) => {
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const response = await axios.get(
      "http://localhost:7000/user/profile",
      config
    );
    console.log(response.data);

    setUserData(response.data.user);
  };
  useEffect(() => {
    getUser();
  }, []);
  
   

  const editRegister = async () => {
    const formData = new FormData();
    formData.append('file', file);    
    formData.append('userName',userName)
    formData.append('firstName',firstName)
    formData.append('lastName',lastName)
    formData.append('email',email)
    formData.append('age',age)
    formData.append('place',place)
    formData.append('hometown',hometown)
    // formData.append('age',female)
    // formData.append('age',male)
    // formData.append('age',N/A)
    formData.append('language',language)
    formData.append('yourInterests',yourInterests)
    formData.append('others',others); 
     
    
    const config = {
    
      headers: { 
        Accept   :"application/json",
        'Content-Type':'multipart/form-data'

    },
    withCredentials: true
    };
    try {
      const result = await axios.post(
        "http://localhost:7000/user/profileUpdate",

        formData,
        config
      );
      
     
      const {fileName , filePath } = result.data
      setUploadedFile({ fileName , filePath})
      console.log(result);
    //  localStorage.setItem("registered", JSON.stringify(true));
    

    } catch (error) {
      console.log(error);
    } 
  };
  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) =>{
      setFile(e.target.files[0])
      setFileName(e.target.files[0].name)
    
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
     

    try {
      await editRegister(userData);

      await getUser();
      // const registered = localStorage.getItem("registered");
      // registered = JSON.parse(registered);
      addModalBox("You have successfully updated your Profile")

      // console.log(registered);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.profilecontainer}>
      <h1 className={styles.profileheader}>Profile</h1>
{/* 
      <div className={styles.deletecontainer}>
        <p>
          Are you sure yousend
          onClick={removeData}
          className={styles.deletecontainer1}
        >
          Delete Account
        </button>
      </div> */}

      <form onSubmit={handleUpdate} className={styles.profileform}  >
        <div> 
        { photo && <img className={styles.photo}  src={`/uploads/${photo}`} /> }
      <label htmlFor="file"> {fileName}</label>
        <input className={styles.photoInput}
        type="file"       
        name="file"
        onChange={handlePhoto}
        // value={photo}
        
        />
        {/* <button onClick= >Upload </button> */}

        </div>
        <div className={styles.formusername}>
          <label htmlFor="userName">User name</label>
          <input 
            type="text"
            name="userName"
            onChange={changeHandler}
            value={userName}
          />
        </div>

        <div className={styles.formgroup}>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            name="firstName"
            onChange={changeHandler}
            value={firstName}
          />
        </div>

        <div className={styles.formgroup}>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            name="lastName"
            onChange={changeHandler}
            value={lastName}
          />
        </div>


        <div className={styles.formemail}>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            name="email"
            onChange={changeHandler}
            value={email}
          />
        </div>

        <div className={styles.formdate}>
          <label htmlFor="age">Age</label>
          <input type="text" name="age" onChange={changeHandler} value={age} />
        </div>
        <div className={styles.formplace}>
          <label htmlFor="place">Place</label>
          <input
            type="text"
            name="place"
            onChange={changeHandler}
            value={place}
          />
        </div>
        <div className={styles.formhometown}>
          <label htmlFor="hometown">Hometown</label>
          <input
            type="text"
            name="hometown"
            onChange={changeHandler}
            value={hometown}
          />
        </div>
        <div className={styles.formlang}>
          <label htmlFor="language">Language</label>
          <input
            type="text"
            name="language"
            onChange={changeHandler}
            value={language}
          />
        </div>
        <div className={styles.forminterest}>
          <label htmlFor="yourInterests">Your Interests</label>
          <input
            type="text"
            name="yourInterests"
            onChange={changeHandler}
            value={yourInterests}
          />
        </div>
        <div className={styles.formothers}>
          <label htmlFor="others">Others</label>
          <input
            type="text"
            name="others"
            onChange={changeHandler}
            value={others}
          />
        </div>
        <input type="submit" value="Save" className={styles.submitregister} />
      </form>
    </div>
  );
}

export default Profilepage;
