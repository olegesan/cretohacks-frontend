import React, {useContext} from "react";
import {UserContext} from "../../../utils/UserContext"
import {Link} from 'react-router-dom'

function HackerView ({name,info, value, handleChange, type}){

    return (
        <div class="card w-25">
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{info}</h6>
                <Link className=" btn btn-info" to={`/profile/${name}`}>View Profile</Link>
            </div>
        </div>
    )
}

export default HackerView;