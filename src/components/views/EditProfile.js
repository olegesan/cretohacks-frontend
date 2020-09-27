import React, {useState, useEffect, useContext} from "react";
import axios from 'axios'
import Input from '../input/Input'
import TextArea from '../input/textArea'
import {handleChange} from "../../utils/helper"
import {UserContext} from '../../utils/UserContext'
import {useHistory} from 'react-router-dom'
import {LoadingSpinner} from "../Animations/LoadingSpinner.js"

function EditProfile (){

    const history = useHistory();
    const {user, setUser} = useContext(UserContext)
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [spokenLanguages, setSpokenLanguages] = useState("");
    const [codingLanguages, setCodingLanguages] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [bio, setBio] = useState("");

    const[loadedData, setLoadedData] = useState(false);

    const handleUsernameChange = (event) =>{
        handleChange(event.target.value, setUsername);
    }
    const handleEmailChange = (event) =>{
        handleChange(event.target.value, setEmail)
    }
    const handleFirstNameChange = (event) =>{
        handleChange(event.target.value, setFirstName)
    }
    const handleLastNameChange = (event) =>{
        handleChange(event.target.value, setLastName)
    }
    const handleSpokenLanguageChange = (event) =>{
        handleChange(event.target.value, setSpokenLanguages)
    }
    const handleLinkedinChange = (event) =>{
        handleChange(event.target.value, setLinkedin)
    }
    const handleGithubChange = (event) =>{
        handleChange(event.target.value, setGithub)
    }
    const handleBioChange = (event) =>{
        handleChange(event.target.value, setBio)
    }
    const handleCodingLanguagesChange = (event) =>{
        handleChange(event.target.value, setCodingLanguages)
    }
    const handlePortfolioChange = (event) =>{
        handleChange(event.target.value, setPortfolio)
    }

    // const handlePasswordChange = (event) =>{
    //     const password = event.target.value;
    //     setPassword(password);
    // }
    useEffect(()=>{
        const url = "http://cretohacks-backend.herokuapp.com/api/user/info/"+user.token
        axios.get(url)
        .then(res => {
            
            res = res.data
            console.log(res)
            setFirstName(res.firstName ? res.firstName : '')
            setLastName(res.lastName ? res.lastName : '')
            setUsername(res.username ? res.username : '')
            setEmail(res.email ? res.email : '')
            setGithub(res.github ? res.github : '')
            setLinkedin(res.linkedin ? res.linkedin : '')
            setPortfolio(res.portfolio ? res.portfolio : '')
            setBio(res.biography ? res.biography : '')
            setCodingLanguages(res.codingLanguages ? res.codingLanguages : '')
            setSpokenLanguages(res.spokenLanguages ? res.spokenLanguages : '')
            setLoadedData(true);
        }
            )
        .catch(err => console.log(err))
    },[])

    const handleSave = (event) =>{
        event.preventDefault()
        const url = "http://cretohacks-backend.herokuapp.com/api/user/"+user.token
        const data = {
            email,
            username,
            github,
            linkedin,
            portfolio,
            biography: bio,
            firstName,
            lastName,
            codingLanguages:codingLanguages,
            spokenLanguages:spokenLanguages

        }
        const config = {
            headers: {
                "Content-Type":"application/json",
            }
        }
        axios.put(url, data, config)
        .then(res => {
            setUser({
                ...user,
                username,
                email
            })
            history.push('/profile/'+username)
        })
        .catch(err => console.log(err))
    }
    const editForm = loadedData ? (<div className='w-50' >
    <Input  value={firstName} type={'text'} name={"First Name"} handleChange={handleFirstNameChange}/>
    <Input  value={lastName} type={'text'} name={"Last Name"} handleChange={handleLastNameChange}/>
    <Input  value={username} type={'text'} name={"Username"} handleChange={handleUsernameChange}/>
    <Input  value={email} type={'email'} name={"Email"} handleChange={handleEmailChange}/>
    <Input  value={spokenLanguages} type={'text'} name={"Spoken Language"} handleChange={handleSpokenLanguageChange}/>
    <Input  value={github} type={'text'} name={"Github"} handleChange={handleGithubChange}/>
    <Input  value={linkedin} type={'text'} name={"Linkedin"} handleChange={handleLinkedinChange}/>
    <Input  value={portfolio} type={'text'} name={"Portfolio"} handleChange={handlePortfolioChange}/>
    <Input  value={codingLanguages} type={'text'} name={"Coding Languages"} handleChange={handleCodingLanguagesChange}/>
    <TextArea value={bio} name={"Bio"} handleChange={handleBioChange}/>
    <button type="submit" onClick={handleSave} className="btn btn-success">Save Changes</button>
    </div>) : <LoadingSpinner/>


    return (
        <div id='hackathon-all'>
            <div className='d-flex justify-content-center m-4'>
            
                {editForm}
            </div>
            

        </div>
    )

    
}
export default EditProfile;