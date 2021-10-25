import React, { useContext, Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Navbar = () => {

    const { LoggedIn, setloggedIn, setUser, setToken } = useContext(UserContext);

    const logOut = () => {
        setUser('');
        setloggedIn(false);
        setToken('');
    }

    return (
        <div id='nav'>
            <span> Fitness Tracker </span>
            <div id='nav-links'>
                <Link className='nav-link' to='/'>Home</Link>
                <Link className='nav-link' to='/activities'>Activities</Link>
                <Link className='nav-link' to='/routines'>Routines</Link>

                {
                    LoggedIn ? (<>
                        <Link className='nav-link' to='/myRoutines'>My Routines</Link>
                        <Link className='nav-link' to='/profile'>Profile</Link>
                        <Link className='nav-link' to='/' onClick={logOut}>Log Out</Link>
                    </>) : (<>
                        <Link className='nav-link' to='/user/login'>Log In</Link>
                        <Link className='nav-link' to='/user/register'>Register</Link>
                    </>)
                }
            </div>
        </div>
    )
}

export default Navbar;