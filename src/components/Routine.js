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
    const { user, token } = useContext(UserContext);
    const [isOwner, setIsOwner] = useState(true);
    const { id: routineId, name, goal, creatorName, activities } = routine.routine

    useEffect(() => {
        if (creatorName == user) {
            setIsOwner(true)
        } else {
            setIsOwner(false)
        }
    })

    const handleDelete = async () => {
        const respObj = await callApi({
            method: 'DELETE',
            url: `/routines/${routineId}`,
            token: token
        })
        if (respObj) {
            history.push('/myRoutines')
        }
    }

    return <>
        <Card id="routine">
            <CardHeader>{name}</CardHeader>
            <h3>{creatorName}</h3>
            <h3>{goal}</h3>
            <h3>{isOwner}</h3>
            <button onClick={handleDelete }>Delete Routine</button>
            {activities.map((activity, idx) => {
                return <Activity activity={activity} key={idx} />
            })}
        </Card>
    </>
}

export default Routine;