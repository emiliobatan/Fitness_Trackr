import React, { useState, useEffect, useContext } from 'react';
import { Routine } from '.';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router';
import { getMyRoutines } from '../util';

const MyRoutines = () => {
    const history = useHistory();
    const [routines, setRoutines] = useState([]);
    const { token, loggedIn } = useContext(UserContext);
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const createRoutine = async (event) => {
        event.preventDefault();
    }

    useEffect(async () => {
        if (!loggedIn) {
            history.push('./Home.js')
        } else {
            const exclusiveRoutine = await getMyRoutines(token)
                if (exclusiveRoutine) {
                    setRoutines(exclusiveRoutine)
                }
            }
        }
    , [loggedIn])

    return (
        <>
            <div>
                <div> My Routine</div>
                <h2> Create Routine </h2>
                <form onSubmit={createRoutine}>
                    <input onChange={(event) => setName(event.target.value)} />
                    <input onChange={(event) => setGoal(event.target.value)} />
                    <select onChange={(event) => setIsPublic(event.target.value)}>
                        <option value="false"> no </option>
                        <option value="true"> yes </option>
                    </select>
                    <button type="submit">Create Routines</button>
                </form>
                {routines.map((routine, idx) => {
                    return <Routine routine={routine} key={idx} />
                })}
            </div>
        </>
    )
}


export default MyRoutines;