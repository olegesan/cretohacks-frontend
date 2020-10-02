import React, {useContext} from "react";
import {UserContext} from "../../utils/UserContext"
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'

function PostBoardBtn ({username, hackathonId}){
    console.log(hackathonId)
    const history = useHistory();
    const handlePostBoard = () =>{
        const url = "https://cretohacks-backend.herokuapp.com/api/"+hackathonId+"/board"
        const data = {
            username
        }
        const config = {
            headers: {
                "Content-Type":"application/json",
            }
        }
        axios.post(url, data, config)
        .then(res => {
            history.push("/hackathon/"+hackathonId)
        }
            )
        .catch(err => {
            console.log(err)
        })
    };
    return (
        <button className="btn btn-success" onClick={handlePostBoard}>
                Post Ad
        </button>
    )
}

export default PostBoardBtn