import React, {useContext} from "react";
import {UserContext} from "../../utils/UserContext"
import {Link} from 'react-router-dom'

function Input ({name, value, handleChange, type}){

    return (
        <div className="form-group">
                <label>{name}</label>
                <input type={type} value={value} className="form-control" onChange={handleChange} id={`exampleInput${name}`}/>
        </div>
    )
}

export default Input;