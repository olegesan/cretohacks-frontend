import React, {useEffect, useState, useContext} from "react";
import {UserContext} from "../../../utils/UserContext"
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./HackathonsAll.css"
import {LoadingSpinner} from "../../Animations/LoadingSpinner.js"
// import {LoadingSpinner} from '/client/src/components/Animations/LoadingSpinner'
import {TeamCard} from '../Teams/TeamCard.js'
import PostBoardBtn from '../../input/PostBoardBtn'
import {HackathonTabs} from './HackathonTabs'
function HackathonView ({match}){
    
    const {user, setUser} = useContext(UserContext)
    const [hackathon, setHackathon] = useState(null)
    const [teams, setTeams] = useState(null)

    useEffect(()=>{
        const hackathonId = match.params.hackathonId
        const url = "https://cretohacks-backend.herokuapp.com/api/hackathon/info/"+hackathonId
        axios.get(url)
        .then(res => {
            const hackInfo = 
               {email: res.data.hackathonEmail,
                    //fix name! to hackathonName
                name: res.data.hackathonName,
                id:hackathonId,
                info: res.data.hackathonInfo}
        
            setHackathon(hackInfo)
            console.log(res.data)
        })
        .catch(err => console.log(err))
        // /api/teams/<hackathon_id>
        const url2 = "https://cretohacks-backend.herokuapp.com/api/teams/"+hackathonId
        // {"teamId":team_id, "teamName":team_name, "teamInformation":team_information, "teamDiscordLink":team_discord_link, "teamMembers":[member_info]}
        // 0: Object { team_discord_link: "discord.gg/falcons", team_id: "8675051c067f4f9aa7ea661f9e090230", team_information: "we are the falcons", … 
        axios.get(url2)
        .then(res => {
            console.log(res)
            const teams = res.data.map((team)=>{
                return {id: team.teamId,
                        name: team.teamName,
                        discord:team.teamDiscordLink,
                        info: team.teamInformation,
                        members:team.teamMembers
                    }
            })
            console.log(teams)
        
            setTeams(teams)
        })
        .catch(err => console.log(err))

    }, []);
    
    return (
        <div id='hackathon-all'>
            <div>
            {hackathon!=null && teams!=null ? (<div className = "jumbotron">
    <div className='text-center'>
        <div className="display-4">
            {hackathon.name}!
        </div>
    <p>{hackathon.info}</p>
        <hr/>
    </div>
    <div className='container d-flex w-50 justify-content-around flex-wrap'>
        <div className='btn btn-primary '>
            <Link to='/team/create'>Create Team</Link>
        </div>
        <PostBoardBtn hackathonId={hackathon.id} username={user.username}/>
    </div>
    <div className='d-flex flex-wrap'>

    </div>
</div>
) : <LoadingSpinner/>}

</div>
            {hackathon? <HackathonTabs username={user.username} teams={teams} hackathonId={hackathon.id}/> : ""}
        </div>
    )
}

export default HackathonView;