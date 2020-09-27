import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./HackathonsAll.css"
import {LoadingSpinner} from "../../Animations/LoadingSpinner.js"
// import {LoadingSpinner} from '/client/src/components/Animations/LoadingSpinner'

function HackathonAll (){
    
    const [hackathons, setHackathons] = useState([])

    useEffect(()=>{
        
        const url = "http://cretohacks-backend.herokuapp.com/api/hackathon/list"
        axios.get(url)
        .then(res => {
            const hackInfo = res.data.map((data) => {
                return {email: data.hackathonEmail,
                    //fix name! to hackathonName
                name: data.hackathoName,
                id:data.hackathonId,
            information: data.hackathonInformation}
                 })
            setHackathons(hackInfo)
            console.log(res.data)
            console.log(hackInfo)
        })
        .catch(err => console.log(err))
    }, []);
    
    const hacks = hackathons.length>0 ? hackathons.map((hackathon, idx)=>{
        return(
            <div key={idx} className='m-4' >
                <div className="card" style={{width:"300px"}}>
                <div className="card-body">
                    <h5 className="card-title">{hackathon.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{hackathon.email}</h6>
                <p className="card-text">{hackathon.information}</p>
                    <button  className=" btn btn-success"><Link to={`/hackathon/${hackathon.id}`}>View Hackathon</Link></button>
                </div>
                </div>
            </div>
        )
    }) : <LoadingSpinner/>
    return (
        <div id='hackathon-all'>
            <div className='d-flex flex-wrap justify-content-center'>
            {
                hacks
            }   
            </div>
            

        </div>
    )
}

export default HackathonAll;