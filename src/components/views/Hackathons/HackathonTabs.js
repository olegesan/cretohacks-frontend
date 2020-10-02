
import React, {useState, useEffect, useContext} from "react";
import {UserContext} from "../../../utils/UserContext"
import {Link} from 'react-router-dom'
import {TeamCard} from '../Teams/TeamCard.js'
import {PendingRequest} from '../Profile/PendingRequest.js'
import HackerView from './HackerView'
import axios from 'axios'; // [{'username': 'Oleg', 'firstName': 'Oleg', 'lastName': 'ww', 'biography': 'Very nice profile bio', 'spokenLanguages': 'ww', 'github': 'ol', 'linkedin': 'ba', 'portfolio': 'sa', 'codingLanguages': 'c++, python, java'}, {'username': 'Oleg', 'firstName': 'Oleg', 'lastName': 'ww', 'biography': 'Very nice profile bio', 'spokenLanguages': 'ww', 'github': 'ol', 'linkedin': 'ba', 'portfolio': 'sa', 'codingLanguages': 'c++, python, java'}]
export function HackathonTabs ({teams, username, hackathonId}){
    
    const {user, setUser} = useContext(UserContext)
    const [teamsTab, setTeamsTab] = useState(true)
    const [hackers, setHackers] = useState([])

    const handleChangeTab = (event) =>{
        event.preventDefault();
        setTeamsTab(!teamsTab)
    }

    useEffect(()=>{

        const url2 = "https://cretohacks-backend.herokuapp.com/api/"+hackathonId+"/board"
        ///api/<username>/my_teams" all teams for user
        // {"teamId":team_id, "teamName":team_name, "teamInformation":team_information, "teamDiscordLink":team_discord_link, "teamMembers":[member_info]}
        // 0: Object { team_discord_link: "discord.gg/falcons", team_id: "8675051c067f4f9aa7ea661f9e090230", team_information: "we are the falcons", … 
        axios.get(url2)
        .then(res => {
            console.log(res)
            setHackers(res.data)
            })
        .catch(err=>{
            console.log(err)
        })
    
        //     teams.map((team)=>{
        //         const url = "https://cretohacks-backend.herokuapp.com/api/teams/applicants/"+team.hackathonId+"/"+team.id
        //         ////api/teams/applicants/<hackathon_id>/<team_id>
        //         // {"teamId":team_id, "teamName":team_name, "teamInformation":team_information, "teamDiscordLink":team_discord_link, "teamMembers":[member_info]}
        //         // 0: Object { team_discord_link: "discord.gg/falcons", team_id: "8675051c067f4f9aa7ea661f9e090230", team_information: "we are the falcons", … 
        //         axios.get(url)
        //         .then(res => {
    
        //             console.log("request")
        //             console.log(res)
        //             const reqs = res.data.map((req)=>{
        //                 return {
        //                     teamId:team.id,
        //                     hackathonId:team.hackathonId,
        //                     teamName:team.name,
        //                     hackathonName:team.hackathonName,
        //                     username:req.username
        //                     }
        //             })
                    
                
        //             setRequests(reqs)
        //         })
        //         .catch(err => console.log(err))
        //     })
        // })
        // .catch(err => console.log(err))


        //get requests
        // console.log(t)
        

    }, [])
    
    return (
       <div>
           {username==user.username?
        (<div className='m-4' >
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button className={"nav-link "+ (teamsTab?"active":"")} onClick={handleChangeTab}>Teams</button>
                    </li>
                    <li className="nav-item">
                        <button className={"nav-link "+ (!teamsTab?"active":"") } onClick={handleChangeTab}>Hacker Board</button>
                    </li>
                </ul>

            {teamsTab ?

            (<div class='d-flex flex-wrap'>
            {teams!=null && teams.length>0 ? teams.map((team, idx)=>{
                return(
                    <div key={idx}>
                        <TeamCard name={team.name} info discordLink={team.discord} id={team.id} hackathon={team.hackathonName} hackathonId={hackathonId} members={team.members} />
                    </div>
                )

            }) : <div className="display-5 m-auto mt-5">There are no teams yet. Start a new one!</div>}
        </div>) : ( hackers ? 
        
        hackers.map((hacker, idx)=>{
            //username, teamId, teamName, hackathonId, hackathonName

            return(
                <div key={idx} className='m-3 list-group d-flex flex-wrap'> 
                    <HackerView name={hacker.username} info={hacker.biography}/>
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

export default HackathonTabs;

