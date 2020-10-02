import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {Redirect, useHistory} from 'react-router-dom'
import {UserContext} from "../../utils/UserContext"

function SignUp (){   
    const history = useHistory();
    const {user, setUser} = useContext(UserContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [spokenLanguages, setSpokenLanguages] = useState("");

    const handleConfirmPasswordChange = (event) =>{
        const confirmPassword = event.target.value;
        setConfirmPassword(confirmPassword);
    }
    const handleUsernameChange = (event) =>{
        const username = event.target.value;
        setUsername(username);
    }
    const handleFirstNameChange = (event) =>{
        const firstName = event.target.value;
        setFirstName(firstName);
    }
    const handleLastNameChange = (event) =>{
        const lastName = event.target.value;
        setLastName(lastName);
    }
    const handleEmailChange = (event) =>{
        const email = event.target.value;
        setEmail(email);
    }

    const handlePasswordChange = (event) =>{
        const password = event.target.value;
        setPassword(password);
    }

    const handleSpokenLanguagesChange = (event) =>{
        const spokenLanguages = event.target.value;
        setSpokenLanguages(spokenLanguages);
    }

    const handleSignUp = (event) =>{
        event.preventDefault()
        const url = "https://cretohacks-backend.herokuapp.com/api/signup"
        const data = {
            email,
            password,
            username,
            confirmPassword,
            firstName,
            lastName,
            spokenLanguages
        }
        const config = {
            headers: {
                "Content-Type":"application/json",
            }
        }
        axios.post(url, data, config)
        .then(res => {

            console.log(res);
            //update User infromtaion based on response from the server.
            setUser(res.data);

            //redirect to profile page. TODO:redirect to unique profile.
            history.push('/profile/'+res.data.username);
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="container-fluid mt-4">
            <form>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input type="text" value={firstName} className="form-control" onChange={handleFirstNameChange} id="first_name" aria-describedby="firstNameHelp"/>
            </div>

            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" value={lastName} className="form-control" onChange={handleLastNameChange} aria-describedby="lastNameHelp"/>
            </div>

            <div className="form-group">
                <label for="exampleSpokenLanguages">Spoken Languages</label>
                <input type="text" value={spokenLanguages} onChange={handleSpokenLanguagesChange} className="form-control" id="exampleSpokenLanguages"/>
            </div>

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" value={username} className="form-control" onChange={handleUsernameChange} id="username" aria-describedby="usernameHelp"/>
            </div>

            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" value={email} className="form-control" onChange={handleEmailChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" value={password} onChange={handlePasswordChange} className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" onClick={handleSignUp} className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}

export default SignUp;