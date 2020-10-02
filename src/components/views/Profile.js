import React, {useContext, useState, useEffect} from "react";
import {UserContext} from "../../utils/UserContext"
import {Link} from 'react-router-dom'
import axios from 'axios'
import {LoadingSpinner} from '../Animations/LoadingSpinner'
import {Avatar} from '@material-ui/core';
import {deepPurple, deepOrange} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import {ProfileTeamTab} from './Profile/ProfileTeamTab.js'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      width:"200px",
      height:"200px",
      fontSize:"5rem"
    },
  }));


function Profile ({match}){

    const classes = useStyles();
    const {user, setUser} = useContext(UserContext)
    const [profile, setProfile] = useState(null);
    
    const username = match.params.username;
    console.log(user) // {"error":"username not found"} oo oo

    useEffect(()=>{
        //"/api/info/<username>"
        const url = "https://cretohacks-backend.herokuapp.com/api/info/"+username
        axios.get(url)
        .then(res => {
            const userInfo = res.data;
            const profileInfo =
            // setTeam(teamInfo)
            {
                bio:userInfo.biography,
                codingLanguages: userInfo.codingLanguages,
                firstName: userInfo.firstName,
                github: userInfo.github,
                lastName:userInfo.lastName,
                linkedin: userInfo.linkedin,
                portfolio: userInfo.portfolio,
                spokenLanguages:userInfo.spokenLanguages,
                username: userInfo.username
              }
            setProfile(profileInfo)
            console.log(userInfo, profileInfo)
        })
        .catch(err => console.log(err)) 
        // {"username":info[2], "firstName":info[3], "lastName":info[4], "biography":info[6], "spokenLanguages":info[7], "github":info[8], "linkedin":info[9], "portfolio":info[10], "codingLanguages":info[11]}
        
    },[])

    const profileView = profile ? (<div><div className = "jumbotron">
    <div className=''>
        <div className="d-flex">
            <div className='mr-5'>
                <Avatar className={classes.purple}>OL</Avatar>
            </div>

            <div className='ml-5'>
                <div className="display-4">
                    {profile.username}
                </div>
                <p>{profile.bio}</p>
                {profile.github? <p>Github:<a className="text-info font-weight-light pl-4"href={profile.github}>{profile.github}</a></p>:''}
                {profile.linkedin?<p>LinkedIn:<a className="text-info font-weight-light pl-4"href={profile.linkedin}>{profile.linkedin}</a></p>:''}
                {profile.portfolio?<p>Portfolio:<a className="text-info font-weight-light pl-4"href={profile.portfolio}>{profile.portfolio}</a></p>:''}
                {profile.codingLanguages ?<p>Programming Languages:<span className='text-info font-weight-light pl-4'> {profile.codingLanguages}</span></p> : ''}
                {profile.github?<p>Spoken Languages:<span className='text-info font-weight-light pl-4'>{profile.spokenLanguages}</span></p>:''}
            </div>
            <hr/>

        </div>

    </div>
    <div className='container d-flex w-50 justify-content-around'>
        
        { user.username == username ? <div className='btn btn-primary '>
            <Link to="/profile/edit">Edit Profile</Link>
        </div> : "" }
        <div className='btn btn-primary '>
            <Link to="/profile/find-teams">Find Team</Link>
        </div>
        <div className='btn btn-primary '>
            <Link to='/team/create'>Create Team</Link>
        </div>
    </div>
</div>
<ProfileTeamTab username={username}/>
</div>
) : <LoadingSpinner/>


    return (
        <div id='profile'>
            {profileView}
        </div>
    )
}

export default Profile;