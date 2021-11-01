import React, { useContext, useState, useEffect } from "react";
import { callApi } from "../util";
import { useParams, useHistory, Link } from 'react-router-dom'
import { UserContext } from "../context/UserContext";


const LoginReg = () => {

    const { setUser, setToken, setLoggedIn, loggedIn } = useContext(UserContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const params = useParams();
    const history = useHistory();

    const usernameHandler = (event) => {
        setUsername(event.target.value)
    };

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    useEffect(async ()=>{
        if (loggedIn===true){
            history.push("/")
        }
    }, [loggedIn])


    const loginResp = async () => {
        try {

            const response = await callApi({
                url: `/users/${params.method}`,
                method: "POST",
                body: {
                    username,
                    password
                }   
            })
            if (response.message === "you're logged in!") {
                history.push("/")
                localStorage.setItem('userToken', response.token);
                setToken(response.token)
                setLoggedIn(true)
                setUser(response.user.username)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault()
        loginResp()
        setUsername('');
        setPassword('');
    }

    return <>
        <h1> Login/Register </h1>
        <div> This is the {params.method} method. </div>
        <form onSubmit={submitHandler}>
            <input type='text' placeholder='username' value={username} onChange={usernameHandler}></input>
            <br />
            <br />
            <input type='password' placeholder='password' value={password} onChange={passwordHandler}></input>
            <br />
            <button disabled={!password || !username || password.length < 7} >Submit</button>
        </form>
        {params.method === 'login' ?
            <Link to='/users/register'> Click here to register</Link> :
            <Link to='/users/login'> Click here to login </Link>}
    </>
}

export default LoginReg;

