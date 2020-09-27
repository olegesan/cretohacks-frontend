
import React, {useState, useEffect, useContext} from "react";
import {UserContext} from "../../../utils/UserContext"
import {Link} from 'react-router-dom'
import {TeamCard} from '../Teams/TeamCard.js'
import axios from 'axios';
export function PendingRequest ({handleRequest, username, teamId, teamName, hackathonId, hackathonName}){

    const {user, setUser} = useContext(UserContext)
    const [myTeams, setTeams] = useState([])

    const handleAccept = (event)=>{
        ///api/teams/accept/<hackathon_id>/<team_id>
        const url = "http://cretohacks-backend.herokuapp.com/api/teams/accept/"+hackathonId+"/"+teamId
        const data = {
            username,
            leader:user.username
        }
        const config = {
            headers: {
                "Content-Type":"application/json",
            }
        }
        axios.post(url, data, config)
        .then(res=>{
            console.log(res)
            handleRequest(username)
        })
    }
    const handleDecline = (event)=>{
        ///api/teams/deny/<hackathon_id>/<team_id>
        const url = "http://cretohacks-backend.herokuapp.com/api/teams/deny/"+hackathonId+"/"+teamId
        const data = {
            username
        }
        const config = {
            headers: {
                "Content-Type":"application/json",
            }
        }
        axios.post(url, data, config)
        .then(res=>{
            console.log(res)
            
        })
        handleRequest(username)
    }
    useEffect(()=>{
        

    }, [])
    
    return (
        
     <div className="d-flex">
         <div className='p-4'>Name:{username}</div>
         <div className='p-4'>Team:{teamName}</div>
         <div className='p-4'>Hackathon:{hackathonName}</div>
         <button className='btn btn-success m-4' onClick={handleAccept}>Accept</button>
         <button className='btn btn-danger m-4' onClick={handleDecline}>Decline</button>
        <Link className='btn btn-warning m-4'to={'/profile/'+username}>View</Link>
          
    </div>

    )
}

export default PendingRequest;

