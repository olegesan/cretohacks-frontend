import React from "react";
import {UserContext} from "../../../utils/UserContext"
import {Link} from 'react-router-dom'

export function TeamCard ({name, info, discordLink, id, hackathon, hackathonId, members}){
    const numberOfMembers = members.length;
    console.log(discordLink)
    return (
        
        <div className='m-4' >
                <div className="card" style={{width:"300px"}}>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Hakckathon:{hackathon}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Discord: {discordLink}</h6>

                    <div className="card-text mb-2">{info}</div>
                <div className='d-flex justify-content-around align-items-baseline'>
                    <button  className=" btn btn-success"><Link to={`/team/${hackathonId}/${id}`}>View Team</Link></button>
                    <div className="card-text text-secondary ">{numberOfMembers} { numberOfMembers>1 || numberOfMembers == 0 ? "Members" : "Member" }</div>
                </div>
                </div>
                </div>
            </div>

    )
}

export default TeamCard;