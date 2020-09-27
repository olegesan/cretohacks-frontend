import React, {useContext} from "react";
import {UserContext} from "../../utils/UserContext"
import {Link} from 'react-router-dom'

function TextArea ({name, value, handleChange}){

    return (
        <div class="form-group">
            <label>{name}</label>
            <textarea class="form-control" onChange={handleChange} id="exampleFormControlTextarea1" rows="3" value={value}></textarea>
        </div>
    )
}

export default TextArea;