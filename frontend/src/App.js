import React, { createContext, useEffect, useState } from 'react';


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import EventView from './Components/EventView/EventView';
import LocationEventView from './Components/Home/LocationEventView';
import CategoryEventView from './Components/Home/CategoryEventView';
// import AttendEvents from './Components/AttendEvent/AttendEvents';
// import SavedEvents from './Components/SavedEvents/savedEvents';
import ModalBox from './Components/ModalBox/ModalBox';

import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Profilepage from './Components/Profilepage/Profilepage'
import ContactForm from './Components/Contact/ContactForm';
import Resetpasswordpage from './Components/Resetpasswordpage/Resetpasswordpage'
import Forgotpasswordpage from './Components/Forgotpasswordpage/Forgotpasswordpage'
// import UserPage from './Components/UserPage/UserPage'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import Notifications from './Components/Notifications/Notifications';
import HomeDefault from './Components/Home/Default'
import savedEvents from './Components/SavedEvents/savedEvents'
import Logout from './Components/Logout/Logout'
import AboutUs from './Components/AboutUs/AboutUs'
// import Settings from './Components/Settings/Settings'
import MultiStepForm from './Components/StartNewEvent/MultiStepForm'

import './App.css';
import StartNewEvent from './Components/StartNewEvent/StartNewEvent';


export const UserStateContext = createContext();

function App() {

  const [loggedInState, setLoggedInState] = useState(JSON.parse(window.localStorage.getItem("loggedIn")));

  const setLoggedIn = (userId) => {
    if (userId) {
      window.localStorage.setItem("loggedIn", JSON.stringify(userId));
    } else {
      window.localStorage.removeItem('loggedIn');
    }

    setLoggedInState(userId);
  }

  return (
    <UserStateContext.Provider value={{ loggedInState, setLoggedIn }}>
      <Router>
        <Header />

        <Notifications>
          <ModalBox>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Register} />
              {/* <PrivateRoute path="/userpage" component={UserPage} /> */}

              <Route path='/viewOneEvent/:eventId' component={EventView} />
              <Route path='/viewBySelectedLocation/:eventLocation' component={LocationEventView} />
              <Route path='/viewBySelectedCategory/:categoryId' component={CategoryEventView} />

              {/* <Route path='/attendEvents/:eventId' component={AttendEvents} /> */}

              <Route path="/contact" component={ContactForm} />

              <Route path="/resetPassword/:token" component={Resetpasswordpage} />
              <Route path="/forgotPassword" component={Forgotpasswordpage} />
              <Route path="/savedEvent" component={savedEvents} />
              <Route path="/startNewEvent" component={StartNewEvent} exact />
              <Route path="/editProfile" component={Profilepage} />

              <Route path="/about" component={AboutUs} />


              {/* <Route path="/settings" component={Settings} /> */}

              <Route path="/logout" component={Logout} />
            </Switch>
          </ModalBox>
        </Notifications>
      </Router>
      <Footer />
    </UserStateContext.Provider>
  );

}

export default App;
