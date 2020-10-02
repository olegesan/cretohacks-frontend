
import React, {useState, useEffect, useContext} from "react";
import {UserContext} from "../../../utils/UserContext"
import {Link} from 'react-router-dom'
import {TeamCard} from '../Teams/TeamCard.js'
import {PendingRequest} from './PendingRequest.js'
import axios from 'axios';
export function ProfileTeamTab ({username}){
    
    const {user, setUser} = useContext(UserContext)
    const [teamsTab, setTeamsTab] = useState(true)
    const handleChangeTab = (event) =>{
        event.preventDefault();
        setTeamsTab(!teamsTab)
        reloadData()

    }

    
    const [teams, setTeams] = useState([])
    const [requests, setRequests] = useState([])


    const reloadData = () =>{
        const url2 = "https://cretohacks-backend.herokuapp.com/api/"+user.username+"/my_teams"
        ///api/<username>/my_teams" all teams for user
        // {"teamId":team_id, "teamName":team_name, "teamInformation":team_information, "teamDiscordLink":team_discord_link, "teamMembers":[member_info]}
        // 0: Object { team_discord_link: "discord.gg/falcons", team_id: "8675051c067f4f9aa7ea661f9e090230", team_information: "we are the falcons", … 
        let t = [];
        axios.get(url2)
        .then(res => {
            console.log(res)
            const teams = res.data.map((team)=>{
                return {id: team.teamId,
                        name: team.teamName,
                        discord:team.teamDiscordLink,
                        info: team.teamInformation,
                        members:team.teamMembers,
                        hackathonId:team.hackathonId,
                        hackathonName:team.hackathonName
                    }
            })
            console.log("team")
            console.log(teams)
        
            setTeams(teams)
            teams.map((team)=>{
                const url = "https://cretohacks-backend.herokuapp.com/api/teams/applicants/"+team.hackathonId+"/"+team.id
                ////api/teams/applicants/<hackathon_id>/<team_id>
                // {"teamId":team_id, "teamName":team_name, "teamInformation":team_information, "teamDiscordLink":team_discord_link, "teamMembers":[member_info]}
                // 0: Object { team_discord_link: "discord.gg/falcons", team_id: "8675051c067f4f9aa7ea661f9e090230", team_information: "we are the falcons", … 
                axios.get(url)
                .then(res => {
    
                    console.log("request")
                    console.log(res)
                    const reqs = res.data.map((req)=>{
                        return {
                            teamId:team.id,
                            hackathonId:team.hackathonId,
                            teamName:team.name,
                            hackathonName:team.hackathonName,
                            username:req.username
                            }
                    })
                    
                
                    setRequests(reqs)
                })
                .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err))
    }
    useEffect(()=>{

        reloadData();
        

    }, [])
    const handleRequest = (username) =>{
        const reqs = requests.filter((request)=> request.usernam == username)
        setRequests(reqs)
    }
    return (
       <div>
           {username==user.username?
        (<div className='m-4' >
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button className={"nav-link "+ (teamsTab?"active":"")} onClick={handleChangeTab}>My Teams</button>
                    </li>
                    <li className="nav-item">
                        <button className={"nav-link "+ (!teamsTab?"active":"") } onClick={handleChangeTab}>Team Applications</button>
                    </li>
                </ul>

            {teamsTab ?

            (<div class='d-flex flex-wrap'>
            {teams ? teams.map((team, idx)=>{
                return(
                    <div key={idx}>
                        <TeamCard name={team.name} info discordLink={team.discord} id={team.id} hackathon={team.hackathonName} hackathonId={team.hackathonId} members={team.members} />
                    </div>
                )

            }) : "You have no teams"}
        </div>) : ( requests ? 
        
        requests.map((request, idx)=>{
            //username, teamId, teamName, hackathonId, hackathonName
            console.log(request)
            return(
                <div key={idx} className='m-3 list-group'> 
                    <PendingRequest username={request.username} handleRequest={handleRequest} teamId={request.teamId} teamName={request.teamName} 
                    hackathonId = {request.hackathonId} hackathonName={request.hackathonName} />
                </div>
            )
        })
        
        :<div>Team Applications </div>)

        

            }
            
            </div>
        ):""}
       </div>
       

    )
}

export default ProfileTeamTab;

