import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {IoVideocam} from 'react-icons/io5'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from './Button';
import "./Navbar.css";

function Navbar()
{
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [show, setShow] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () =>
    {
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
            <div className="navbarr" show={show}>
                <div className="navbar-container containerr">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu} >
                        <IoVideocam className="navbar-icon" />
                        STREAM
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        {click ? <FaTimes/> : <FaBars />}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to="/auth" className='nav-links' onClick={closeMobileMenu}>
                                SIGN IN
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/auth" className='nav-links' onClick={closeMobileMenu}>
                                SIGN UP
                            </Link>
                        </li>
                        <li className="nav-btn">
                            {button ? (
                            <Link to="/newcall" className='btn-link' >
                                <Button buttonStyle='btn--outline' buttonColor='blue'>JOIN</Button>
                            </Link>
                            ) : (
                                <Link to="/newcall"  className='btn-link' onClick={closeMobileMenu}>
                                <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>JOIN</Button>
                            </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            
        </>
    )
}

export default Navbar
