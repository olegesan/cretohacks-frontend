import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {Redirect, useHistory} from 'react-router-dom'
import {UserContext} from "../../../utils/UserContext"
import Input from '../../input/Input'
import TextArea from '../../input/textArea'
import {handleChange} from "../../../utils/helper"
import {Autocomplete} from "@material-ui/lab"
import {TextField} from "@material-ui/core"
import {LoadingSpinner} from '../../Animations/LoadingSpinner';
import {TeamCard} from './TeamCard'
import {PostBoardBtn} from '../../input/PostBoardBtn'
function FindTeam (){   

    const history = useHistory();
    const {user, setUser} = useContext(UserContext)

    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");
    const [teamDiscordLink, setTeamDiscordLink] = useState("");
    const [hackathonId, setHackathonId] = useState("");
    const [hackathons, setHackathons] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loadedHackathons, setLoadedHackathons] = useState(false);
    const [didLoadTeams, setDidLoadTeams] = useState(false)
    const [didSelectHackathon, setDidSelectHackthon] =useState(false);
   

    //load hackathon data
    useEffect(()=>{
        const url = "http://cretohacks-backend.herokuapp.com/api/hackathon/list"
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

    const handlePostBoard= ()=>{

    }
    const handleLoadTeams = (hackathonId)=>{
        ///api/teams/<hackathon_id>
        const url = "http://cretohacks-backend.herokuapp.com/api/teams/"+hackathonId.id
        axios.get(url)
        .then(res => {
            console.log(res)
            const teams = res.data.map((team)=>{
                return {id: team.teamId,
                        name: team.teamName,
                        discord:team.teamDiscordLink,
                        info: team.teamInformation,
                        members:team.teamMembers,
                        hackathonName:team.hackathonName,
                        hackathonId:team.hackathonId
                    }
            })
            console.log(teams)
        
            setTeams(teams)
            setDidLoadTeams(true)
        })
        .catch(err => console.log(err))
    }
    const teamsComponents = (didLoadTeams ? 
        (<div>
            {teams.map}
        </div>)
        :
        "")
    return (
        <div className="container-fluid mt-4 d-flex justify-content-center flex-column align-items-center">
            <div className='w-50'>
                <Autocomplete id="combo-box-demo"
                className='form-group'
            options={hackathons}
            getOptionLabel={(option) => {
                return option.name}}
                onChange = {(event, newValue)=>{
                    setDidSelectHackthon(true)
                    setHackathonId(newValue? newValue.id : "")
                    handleLoadTeams(newValue)}
                    } 
                onInputChange={(event, newValue)=>{
                    setDidSelectHackthon(true)
                    setHackathonId(newValue? newValue.id : "")
                }}

            renderInput={(params) => { return(
                <div>
                <label>Hackathon</label>
            <TextField {...params} size='small' label="Select Hackathon" variant='outlined'/></div>)
            }}/>
            <div className='d-flex justify-content-around'>
                <button  className="btn btn-success">View Hackathon</button>
                <button  className="btn btn-success">Post Ad</button>
            </div>
            </div>
            {didSelectHackathon?(didLoadTeams? 
                (<div className='d-flex flex-wrap justify-content-center'>
                    {teams.map((team, idx)=>{
                    //name, info, discordLink, id, hackathon, hackathonId, members
                    return (
                        <TeamCard key={idx} name={team.name} info={team.info} discordLink={team.discord} 
                        id={team.id} hackathon={team.hackathonName} hackathonId={team.hackathonId} members={team.members}  />
                    )
                })
            }</div>)
                : <LoadingSpinner/>):""}
        </div>
    )
}

export default FindTeam;
