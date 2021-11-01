import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router'
import { Card, CardContent, CardHeader } from "@material-ui/core"
import { callApi } from '../util';

const Activity = (activity) => {
    const { creatorId, duration, name, goal, count } = activity.activity
    return (
        <div id='routines'>
            <div> {creatorId} </div>
            <div> {name} </div>
            <div> {goal} </div>
            <div> Count: {count} </div>
            <div> Duration: {duration}s </div>
        </div>
    )
}

const Routine = (routine) => {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [isOwner, setIsOwner] = useState(true);
    const { id, name, goal, creatorName, activities } = routine.routine

    useEffect(() => {
        if (creatorName == user) {
            setIsOwner(true)
        } else {
            setIsOwner(false)
        }
    })

    const handleDelete = async (token, routineId) => {
        const respObj = await callApi({
            method: 'DELETE',
            url: `/routines/${routineId}`,
            token
        })
        if (handleDelete) {
            history.push('/.MyRoutines.js')
        }
    }

    return <>
        <Card id="routine">
            <CardHeader>{name}</CardHeader>
            <CardContent>{creatorName}</CardContent>
            <CardContent>{goal}</CardContent>
            <CardContent>{isOwner}</CardContent>
            <button onClick={handleDelete}>Delete Routine</button>
            {activities.map((activity, idx) => {
                return <Activity activity={activity} key={idx} />
            })}
        </Card>
    </>
}

export default Routine;