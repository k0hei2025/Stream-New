import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { IoVideocam } from 'react-icons/io5'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from './Button';

import PopupJoin from './pages/joinPopup'

import "./Navbar.css";
import Auth from './Auth';
import Signup from '../Authentication/signup';


function Navbar(props) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);
    const { sign } = props;
    const [popup, setPopup] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {

        if (window.innerWidth <= 960) {
            setButton(false);
        }
        else {
            setButton(true);
        }
    };


    const popupHandler = () => {

        setPopup(!popup);
        console.log('popup State', popup)
    }

    window.addEventListener('resize', showButton);

    return (
        <>
            {popup ? <PopupJoin activation={popup} /> : null}
            <div className="navbarr" >
                <div className="navbar-container containerr">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu} >
                        <IoVideocam className="navbar-icon" />
                        STREAM-LITE
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>

                        {click ? <FaTimes /> : <FaBars />}
                    </div>
                    {sign ? (
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className="nav-item">
                                <div className='nav-links' style={{ textDecoration: "none" }} onClick={closeMobileMenu} >
                                    About
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className='nav-links' style={{ textDecoration: "none" }} onClick={closeMobileMenu}>
                                    Contacts
                                </div>
                            </li>

                        </ul>)
                        :
                        (
                            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                                <li className="nav-btn">
                                    <Button style={{ marginTop: "15px", textDecoration: "none", backgroundColor: "#316B83" }} onClick={() => { closeMobileMenu(); setOpenPopup(true) }}>
                                        SIGN IN
                                    </Button>
                                </li>

                                <li className="nav-btn">
                                    {button ? (

                                        <Button style={{ backgroundColor: "#316B83" }} buttonStyle='btn--outline' buttonColor='blue' onClick={popupHandler}>JOIN</Button>

                                    ) : (

                                        <Button onClick={popupHandler} buttonStyle='btn--outline' buttonSize='btn--mobile'>JOIN</Button>

                                    )}
                                </li>
                            </ul>)}
                </div>
            </div>
            <Auth
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                <Signup />
            </Auth>


        </>
    )
}

export default Navbar
