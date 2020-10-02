import React, {useState, useEffect, useContext} from "react";
import axios from 'axios'
import Input from '../../input/Input'
import TextArea from '../../input/textArea'
import {handleChange} from "../../../utils/helper"
import {UserContext} from '../../../utils/UserContext'
import {useHistory} from 'react-router-dom'
import {LoadingSpinner} from "../../Animations/LoadingSpinner.js"
import {Autocomplete} from '@material-ui/lab'
import {TextField} from '@material-ui/core'
function EditTeam ({match}){

    const history = useHistory();
    const {user, setUser} = useContext(UserContext)

    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");
    const [teamDiscordLink, setTeamDiscordLink] = useState("");
    const [members, setTeamMembers] = useState([])
    const [team, setTeam] = useState(null);
    const [hackathonId, setHackathonId] = useState("");
    const [hackathons, setHackathons] = useState([]);
    const [loadedData, setLoadedData] = useState(false);
    const [loadedHackathons, setLoadedHackathons] = useState(false)
    const [hackathon, setHackathon] = useState(null);
    
    
    const teamId = match.params.teamId;

    //load hackathon data
    useEffect(()=>{
        //get info about current team
        const hackId = match.params.hackathonId
        const url = "https://cretohacks-backend.herokuapp.com/api/teams/"+hackId+"/"+teamId
        
        axios.get(url)
        .then(res => {
            const team = res.data;
            

            setTeamName(team.teamName)
            setTeamDiscordLink(team.teamDiscordLink)
            setTeamDescription(team.teamInformation)
            setTeamMembers(team.teamMembers)
            setHackathonId(hackId)
        
            setLoadedData(true)
            
            console.log(team)
        })
        .catch(err => console.log(err))

        //get hackathons info
         const url2 = "https://cretohacks-backend.herokuapp.com/api/hackathon/list"
        axios.get(url2)
        .then(res => {
            const hackInfo = res.data.map((data) => {
                console.log("hackathonID " + hackId)
                console.log("hackathonID of hackathon " + data.hackathonId)
                if(data.hackathonId == hackId) {
                    console.log("found hackathon")
                    setHackathon(data)}
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
    // const handleHackathonIdChange = (event) =>{
    //     console.log(event.target)
    //     handleChange(event.target.value, setHackathonId);
    // }

    const handleSaveTeam = (event) =>{
        event.preventDefault()
        console.log(teamId)
        const url = "https://cretohacks-backend.herokuapp.com/api/teams/edit/"+hackathonId+"/"+teamId
        ///api/teams/edit/<hackathon_id>/<team_id>
        const data = {
           teamName,
           teamInformation:teamDescription,
           teamDiscordLink,
           teamMembers:members
        }
        const config = {
            headers: {
                "Content-Type":"application/json",
            }
        }
       
        axios.put(url, data, config)
        .then(res => {
            history.push('/team/'+hackathonId+'/'+teamId);
        })
        .catch(err => console.log(err))
    }
    const handleDelete = (event) =>{
        const url = "https://cretohacks-backend.herokuapp.com/api/teams/delete/"+hackathonId+"/"+teamId
        ////api/teams/delete/<hackathon_id>/<team_id>
        const data = {
            username:user.username
         }
         const config = {
             headers: {
                 "Content-Type":"application/json",
             }
         }
        axios.post(url, data, config)
        .then(res => {
            history.push('/hackathon/'+hackathonId);
        })
        .catch(err => console.log(err))
    }
    const editForm = loadedData ? ( <div className="container-fluid mt-4 d-flex justify-content-center">
    <div className='w-50'>
        <Input value={teamName} type={"text"} name={"Team Name"} handleChange={handleTeamNameChange}/>
        {/* <Autocomplete id="combo-box-demo"
        className='form-group'
    options={hackathons}
    getOptionLabel={(option) => {
        return option.name}}
        onChange = {(event, newValue)=>setHackathonId(newValue? newValue.id : "")}
    renderInput={(params) => { return(
        <div>
        <label>Hackathon</label>
    <TextField {...params} size='small' variant='outlined'/></div>)
    }}/> */}
        <Input value={teamDiscordLink} type={"text"} name={"Discord Link"} handleChange={handleTeamDiscordLinkChange}/>
        <TextArea value={teamDescription} type={"text"} name={"Team Description"} handleChange={handleTeamDescriptionChange}/>
       <div className="d-flex justify-content-around">
        <button  className="btn btn-success" onClick={handleSaveTeam}>Save Team</button>

        <button  className="btn btn-danger" onClick={handleDelete}>Delete Team</button>
        </div>
    </div>
</div>) : <LoadingSpinner/>


    return (
        <div id='hackathon-all'>
            <div className='d-flex justify-content-center m-4'>
            
                {editForm}
            </div>
            

        </div>
    )

    
}
export default EditTeam;