import React, {useState} from "react"
import logo from '../UMKC_Logo.png';
import {Link} from 'react-router-dom';
import { logoutUser } from "../actions/authActions";
import { useDispatch } from "react-redux";

import Breadcrumbs from "../Components/Breadcrumbs";

import { useCallback } from "react";
import store from '../store';


function NavBar() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();


    const isAuthenticated = store.getState().auth.isAuthenticated;

    const logout = useCallback(() => {
        dispatch(logoutUser(dispatch));

    }, [dispatch]);

    if(isAuthenticated){
        return(
            <div>
                <nav>
                    <div className="logo"> <img src={logo} alt="UMKC" /> </div>
                    <ul className="nav-links" style={{transform: open ? "translateX(0px)" : "" }}>
                        <Link to='/'>
                            <li><a>Home</a></li>
                        </Link>
                        <Link to='/my-account'>
                            <li><a>My Account</a></li>
                        </Link>
                        <Link to='/'>
                            <li onClick={logout}><a>Logout</a></li>
                        </Link>
                    </ul>
                    <i onClick={() => setOpen(!open)} class="fa-solid fa-bars burger" />
                </nav>
                <Breadcrumbs/>
            </div>
        )

    }
    else if(!isAuthenticated){
        return(
            <div>
                <nav>
                    <div className="logo"> <img src={logo} alt="UMKC" /> </div>
                    <ul className="nav-links" style={{transform: open ? "translateX(0px)" : "" }}>
                        <Link to='/'>
                            <li><a>Home</a></li>
                        </Link>
                        <Link to='/login'>
                            <li><a>Login</a></li>
                        </Link>
                    </ul>
                    <i onClick={() => setOpen(!open)} class="fa-solid fa-bars burger" />
                </nav>
                <Breadcrumbs/>
            </div>


        )
            
    }
    
}

export default NavBar