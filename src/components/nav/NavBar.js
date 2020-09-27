import React, {useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import "./NavBar.css"
import logo from '../../images/twitter_header_photo_1.png';
import {UserContext} from "../../utils/UserContext"
import {logout} from '../../utils/helper'
function NavBar (){

  const history = useHistory()
  const {user, setUser} = useContext(UserContext)

  const handleLogout = (event) =>{
    event.preventDefault()
    logout(user,setUser)
    history.push('/')
  }
    return (
        <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between">
  <Link to='/'><img className="nav-logo " src={logo}/></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
        {user ? <li className="nav-item active">
          <Link className="nav-link" to={"/profile/"+user.username}>Home</Link>
        </li> : ""}
        <li className="nav-item">
          <Link className="nav-link" to="/hackathon">Hackathons</Link>
        </li>
        <div className="left">
          { user ? "":<li className="nav-item">
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>}
          {user ? '':<li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>}
          {user ? <li className="nav-item">
            <a className="nav-link" onClick={handleLogout} to="/login">Logout</a>
          </li> : ""}
        </div>
    </ul>
  </div>
</nav>
    )
}

export default NavBar;