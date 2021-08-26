import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoVideocam } from 'react-icons/io5'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from './Button';
import "./Navbar.css";
import Auth from './Auth';
import Signup from '../Authentication/signup';

function Navbar(props) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);

    const { sign } = props;



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

    window.addEventListener('resize', showButton);

    return (
        <>
            <div className="navbarr" >
                <div className="navbar-container containerr">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu} >
                        <IoVideocam className="navbar-icon" />
                        STREAM
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
                                <li className="nav-item">
                                    <div className='nav-links' style={{ textDecoration: "none" }} onClick={() => { closeMobileMenu(); setOpenPopup(true) }}>
                                        SIGN IN
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className='nav-links' style={{ textDecoration: "none" }} onClick={() => { closeMobileMenu(); setOpenPopup(true) }}>
                                        SIGN UP
                                    </div>
                                </li>
                                <li className="nav-btn">
                                    {button ? (
                                        <Link to="/join" style={{ textDecoration: "none" }} className='btn-link' >
                                            <Button buttonStyle='btn--outline' buttonColor='blue'>JOIN</Button>
                                        </Link>
                                    ) : (
                                        <Link to="/join" className='btn-link' onClick={closeMobileMenu}>
                                            <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>JOIN</Button>
                                        </Link>
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
