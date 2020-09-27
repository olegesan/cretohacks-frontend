import React, {useEffect, useState, useContext} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {LoadingSpinner} from "../../Animations/LoadingSpinner.js"
// import {LoadingSpinner} from '/client/src/components/Animations/LoadingSpinner'
import {TeamCard} from '../Teams/TeamCard.js'
import {UserContext} from '../../../utils/UserContext.js'
function TeamView ({match}){

    const {user, setUser} = useContext(UserContext)
    const [hackathon, setHackathon] = useState(null)
    const [team, setTeam] = useState(null)
    const [isTeamMember, setIsTeamMember] = useState(false);
    const [isTeamLead, setIsTeamLead] = useState(false);
    const hackathonId = match.params.hackathonId
    const teamId = match.params.teamId
    useEffect(()=>{ // {"teamId":team_id, "teamName":team_name, "teamInformation":team_information, "teamDiscordLink":team_discord_link, "teamMembers":[member_info]}
        
        
        const url = "http://cretohacks-backend.herokuapp.com/api/teams/"+hackathonId+"/"+teamId
        
        axios.get(url)
        .then(res => {
            const team = res.data;
            const teamInfo ={ 
                id: team.teamId,
                name: team.teamName,
                discord:team.teamDiscordLink,
                info: team.teamInformation,
                members: team.teamMembers
            }
            setTeam(teamInfo)
            teamInfo.members.map(member => {
                if(member.username == user.username){
                    setIsTeamMember(true);
                }
            })
            console.log(teamInfo.members)
            console.log(teamInfo.members[0].username == user.username)
            if (teamInfo.members[0].username == user.username){
                setIsTeamLead(true);
            }

            
            console.log(team)
        })
        .catch(err => console.log(err))

    }, []);

    //apply to join the team
    const handleApply = () =>{
        //"/api/teams/apply/<hackathon_id>/<team_id>"
        const url = "http://cretohacks-backend.herokuapp.com/api/teams/apply/"+hackathonId+"/"+teamId
        const data = {
            username:user.username
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
    }
    let teamButton = '';
    if(isTeamLead){
        teamButton = (<div className='btn btn-primary '>
        <Link to={`/team/${hackathonId}/${teamId}/edit`}>Edit Team</Link>
    </div>)
    }else if(!isTeamMember && !isTeamLead){
        teamButton = (<button className='btn btn-primary ' onClick={handleApply}>
        Join Team
    </button>)
    }
    // {"email":info[1], "username":info[2], "firstName":info[3], "lastName":info[4], "biography":info[6], "spokenLanguages":info[7], "github":info[8], "linkedin":info[9], "portfolio":info[10], "codingLanguages":info[11]}
    return (
        <div id='hackathon-all'>
            {team!=null ? (<div className = "jumbotron">
    <div className='text-center'>
        <div className="display-4">
            {team.name}!
        </div>
    <p>{team.info}</p>
    {teamButton}
        <hr/>
        <p>{team.discord}</p>
    </div>
    <div className='container d-flex w-50 justify-content-around'>
        </div>
    <ul>
        {team.members.map((member, idx)=>{
            return(
                <li key={idx}>
                    <Link className='text-body'to={"/profile/"+member.username}>{member.username}</Link>
                </li>
            )
        })} 
    </ul>
</div>) : <LoadingSpinner/>}

        </div>
    )
}

export default TeamView;