import React, { useState, useEffect, useContext} from "react"; 
import { callApi } from "../util";
import { Routine } from ".";
import { getAllRoutines } from "../util";
import { typography } from "@mui/system";

const Routines = () => { 
    const [ routines, setRoutines ] = useState([]);
    
    useEffect(async () => {
        const _routines = await callApi({
            method: 'GET',
            url: `/routines`
        })
        if (_routines) {
            setRoutines(_routines)
        }
    }, [])
    return (
        <div>
        <div>Routines</div>
        {routines.map((routine, idx)=>{
            return <Routine routine={routine} key={idx}/>
        })}
    </div>
    )
}

export default Routines;