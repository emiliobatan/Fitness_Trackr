import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Typography, AppBar, makeStyles } from "@material-ui/core";
import { UserContext } from '../context/UserContext';



const useStyles = makeStyles({

    title: {
        color: 'white',
        textAlign: 'center'
    },

    btn: {
        color: 'white',
        textDecoration: 'none',
        margin: '1rem',
        textAlign: 'center'
    }
})

const Navbar = () => {
    const classes = useStyles()
    const { setUser, loggedIn, setLoggedIn, setToken } = useContext(UserContext)
    const logOut = () => {
        setLoggedIn(false)
        setUser('')
        setToken('')
        localStorage.setItem('userToken', '')
    }

    return (
        <AppBar id='nav'>
            <Typography variant='h4' className={classes.title} > Fitness Tracker </Typography>

            <Typography variant='h6' id='nav-links'>
                <Link className={classes.btn} to='/'>Home</Link>
                <Link className={classes.btn} to='/activities'>Activities</Link>
                <Link className={classes.btn} to='/routines'>Routines</Link>

                {
                    loggedIn ? (<>
                        <Link className={classes.btn} to='/myRoutines'>My Routines</Link>
                        <Link className={classes.btn} to='/profile'>Profile</Link>
                        <Link className={classes.btn} to='/' onClick={logOut}>Log Out</Link>
                    </>) : (<>
                        <Link className={classes.btn} to='/users/login'>Log In</Link>
                        <Link className={classes.btn} to='/users/register'>Register</Link>
                    </>)
                }
            </Typography>
        </AppBar>
    )
}

export default Navbar;