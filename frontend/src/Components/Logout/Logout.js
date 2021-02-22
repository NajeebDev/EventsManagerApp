import React,{useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { UserStateContext } from '../../App';
export default function Logout() {

    const { setLoggedIn } = useContext(UserStateContext)
setLoggedIn(false)
    return (
        <Redirect to={'/'} />
    )
}
