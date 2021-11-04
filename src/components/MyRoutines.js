import React, { useState, useEffect, useContext } from 'react';
import { Routine } from '.';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router';
import { callApi, getMyRoutines } from '../util';
import { postRoutine } from '../util';

const MyRoutines = () => {
    const history = useHistory();
    const [routines, setRoutines] = useState([]);
    const { token, loggedIn, user} = useContext(UserContext);
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);


    const createRoutine = async (event) => {
        event.preventDefault();

        try {
            const res = await postRoutine(token, name, goal, isPublic);
            if (res) {
                setGoal("");
                setName("");
                // await fetchRoutines();
                // await fetchUserRoutines();
                await render();
            }

            return res;
        } catch (error) {
            throw error
        }
    }

    useEffect(async () => {
        if (!loggedIn) {
            history.push('/')
        } else {
            const exclusiveRoutine = await getMyRoutines(token)
            if (exclusiveRoutine) {
                setRoutines(exclusiveRoutine)
            }
        }
    }
        , [loggedIn])

    const render = async () => {
        const _myRoutines = await callApi({
            method: 'GET',
            url: `/users/${user}/routines`,
            token: token
        })
        if (_myRoutines) {
            setRoutines(_myRoutines)
        }
    }
    useEffect(async () => { 
        await render();
    },[])

    // useEffect(async () => {
    //     const _routines = await callApi({
    //         method: 'GET',
    //         url: `/routines`
    //     })
    //     if (_routines) {
    //         setRoutines(_routines)
    //     }
    // }, [])

    return (
        <>
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
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