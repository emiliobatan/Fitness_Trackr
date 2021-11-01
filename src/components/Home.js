import React, { useContext } from 'react'
import { UserContext } from "../context/UserContext";


function Home() {
    const { user, loggedIn } = useContext(UserContext);

    return <>
        <div>
            <h1> Welcome to Fitness Trckr</h1>
            {
                loggedIn && user ? <h3> 
                    Logged in as {user} 
                    </h3> : <h3> Don't have an account? Click on the Register button to get started!</h3>
            }
        </div>
        </> 
}

export default Home