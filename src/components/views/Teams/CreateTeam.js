import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {Redirect, useHistory} from 'react-router-dom'
import {UserContext} from "../../../utils/UserContext"
import Input from '../../input/Input'
import TextArea from '../../input/textArea'
import {handleChange} from "../../../utils/helper"
import {Autocomplete} from "@material-ui/lab"
import {TextField} from "@material-ui/core"
function CreateTeam (){   

    const history = useHistory();
    const {user, setUser} = useContext(UserContext)

    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");
    const [teamDiscordLink, setTeamDiscordLink] = useState("");
    const [hackathonId, setHackathonId] = useState("");
    const [hackathons, setHackathons] = useState([]);
    const [loadedHackathons, setLoadedHackathons] = useState(false);
   

    //load hackathon data
    useEffect(()=>{
        const url = "https://cretohacks-backend.herokuapp.com/api/hackathon/list"
        axios.get(url)
        .then(res => {
            const hackInfo = res.data.map((data) => {
                return {email: data.hackathonEmail,
                name: data.hackathoName,
                id:data.hackathonId,
            information: data.hackathonInformation}
                 })
            setHackathons(hackInfo)
            setLoadedHackathons(true)
    
        })
        .catch(err => console.log(err))
    },[])

    const handleTeamNameChange = (event) =>{
        handleChange(event.target.value, setTeamName);
    }
    const handleTeamDescriptionChange = (event) =>{
        handleChange(event.target.value, setTeamDescription);
    }
    const handleTeamDiscordLinkChange = (event) =>{
        handleChange(event.target.value, setTeamDiscordLink);
    }
    const handleHackathonIdChange = (event) =>{
        console.log(event.target)
        handleChange(event.target.value, setHackathonId);
    }

    const handleCreateTeam = (event) =>{
        event.preventDefault()
        const url = "https://cretohacks-backend.herokuapp.com/api/teams/create/"+hackathonId
        const data = {
           teamName,
           teamDescription,
           teamDiscordLink,
           userToken: user.token
        }
        const config = {
            headers: {
                "Content-Type":"application/json",
            }
        }
       
        axios.post(url, data, config)
        .then(res => {
            const {teamId} = res.data
            history.push('/team/'+hackathonId+'/'+teamId);
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="container-fluid mt-4 d-flex justify-content-center">
            <div className='w-50'>
                <Input value={teamName} type={"text"} name={"Team Name"} handleChange={handleTeamNameChange}/>
                <Autocomplete id="combo-box-demo"
                className='form-group'
            options={hackathons}
            getOptionLabel={(option) => {
                return option.name}}
                onChange = {(event, newValue)=>setHackathonId(newValue? newValue.id : "")}
            renderInput={(params) => { return(
                <div>
                <label>Hackathon</label>
            <TextField {...params} size='small' variant='outlined'/></div>)
            }}/>
                <Input value={teamDiscordLink} type={"text"} name={"Discord Link"} handleChange={handleTeamDiscordLinkChange}/>
                <TextArea value={teamDescription} type={"text"} name={"Team Description"} handleChange={handleTeamDescriptionChange}/>
                <button  className="btn btn-success" onClick={handleCreateTeam}>Create Team</button>
            </div>
        </div>
    )
}

export default CreateTeam;
