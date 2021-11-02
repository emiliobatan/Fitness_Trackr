import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useHistory } from 'react-router'
import { Card, Typography} from "@material-ui/core"
import { getMe } from '../util'

const Profile = () => {
    const history = useHistory()
    const { token, loggedIn } = useContext(UserContext)
    const [ username, setUsername ] = useState('')
    const [ id, setId] = useState('')

    useEffect(async () => {
        if(!loggedIn) {
            history.push('/homepage')
        } else {
            const user = await getMe(token)
            if (user) {
                setId(user.id)
                setUsername(user.username)
            }
        }
    }, [loggedIn])

    return (
        <Card id = "profile">
            <div>{username? `Username:${username}`:null}</div>
            <div>{id? `User Id #:${id}`:null}</div>
            
        </Card>
    )
}
    
export default Profile