import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Activity } from ".";
import { callApi, postActivity } from "../util";

const Activities = ({ fetchActivities }) => {
    const token = localStorage.getItem("token");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [activities, setActivities] = useState([]);

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postActivity(token, name, description);
            if (response) {
                setName("");
                setDescription("");
                await fetchActivities();
                history.push("/activities");
            }
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(async () => {
        const _activities = await callApi({
            method: 'GET',
            url: '/activities'
        })
        console.log("_activities", _activities)
        if (_activities) {
            setActivities(_activities);
        }
    }, [])

    return (
        <>
            {token ? (
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <label>Name: </label>
                            <input
                                type="text"
                                placeholder="enter activity name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            ></input>
                        </fieldset>
                        <fieldset>
                            <label>Description: </label>
                            <input
                                type="text"
                                value={description}
                                placeholder="enter activity description"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            ></input>
                        </fieldset>
                        <button type="submit">Add activity</button>
                    </form>
                </div>
            ) : null}
            {activities ? (
                <div className="activities">
                    <span>Activities:</span>
                    {activities.map((activity) => (
                        <Activity key={activity.id} activity={activity} />
                    ))}
                </div>
            ) : (
                "Loading..."
            )}
        </>
    );
};

export default Activities;