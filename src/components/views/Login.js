import React, {useState, useContext} from "react";
import {UserContext} from "../../utils/UserContext"
import axios from 'axios'
import {Redirect, useHistory, Link} from 'react-router-dom'

function Login (){
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user, setUser} = useContext(UserContext)
    const handleEmailChange = (event) =>{
        const email = event.target.value;
        setEmail(email);
    }

    const handlePasswordChange = (event) =>{
        const password = event.target.value;
        setPassword(password);
    }

    const handleLogin = (event) =>{

        event.preventDefault()
        
        
        const url = "http://cretohacks-backend.herokuapp.com/api/login"
        const data = {
            email: email,
            password: password
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

            //redirect to unique profile.
            history.push('/profile/'+res.data.username);
        }
            )
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="container-fluid mt-4">
            <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" value={email} className="form-control" onChange={handleEmailChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" value={password} onChange={handlePasswordChange} className="form-control" id="exampleInputPassword1"/>
            </div>
            
            {/* {setPassword || setEmail ? (
                <div class="alert alert-danger" role="alert">
                    Email address or Password has been entered incorrectly, <Link to="/signup" class="alert-link">click here</Link> to sign up.
                </div>
            ):(
                ''
            )} */}
            <button type="submit" onClick={handleLogin} className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}
export default Login;