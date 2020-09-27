import React, {useEffect, useState, useMemo} from 'react';
import logo from './logo.svg';
import './App.css';
import Index from "./components/views/Index.js"
import SignUp from "./components/views/SignUp.js"
import Login from "./components/views/Login.js"
import Profile from "./components/views/Profile.js"
import EditProfile from "./components/views/EditProfile.js"
import HackathonAll from "./components/views/Hackathons/HackathonAll.js"
import HackathonView from "./components/views/Hackathons/HackathonView.js"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Layout from "./components/Layout"
import {UserContext} from './utils/UserContext';

import CreateTeam from './components/views/Teams/CreateTeam.js'

import EditTeam from './components/views/Teams/EditTeam.js'
// import Teams from './components/views/Teams/Teams.js'
import TeamView from './components/views/Teams/TeamView.js'
import FindTeams from './components/views/Teams/FindTeams.js'



function App() {
  const [user, setUser] = useState({})

  const providerValue = useMemo(()=> ({user,setUser}), [user, setUser]);

  return (
    <Router>

   
      <UserContext.Provider value={providerValue}>
      <Switch>
        <RouteWrapper exact path="/" component={Index} layout={Layout}/>
        <RouteWrapper path="/signup" component={SignUp} layout={Layout}/>
        <RouteWrapper path="/login" component={Login} layout={Layout}/>

        {/* lists all the available hackathons */}
        <RouteWrapper exact path="/hackathon" component={HackathonAll} layout={Layout}/>

        {/* show all the teams in a hackathon */}
        <RouteWrapper exact path="/hackathon/team" component={EditProfile} layout={Layout}/>

         {/* info about one hackathon*/}
         <RouteWrapper path="/hackathon/:hackathonId" component={HackathonView} layout={Layout}/>

        {/* takes to user - edit profile page */}
        <RouteWrapper exact path="/profile/edit" component={EditProfile} layout={Layout}/>

        {/* takes to user - edit profile page */}
        <RouteWrapper exact path="/profile/find-teams" component={FindTeams} layout={Layout}/>

        {/* takes user to his/her profile page */} 
        <RouteWrapper  path="/profile/:username" component={Profile} layout={Layout}/>



        {/* create a team for a particular hackathon */}
        <RouteWrapper path="/team/create" component={CreateTeam} layout={Layout}/>

        {/* show team info page/index page for a team */}
        <RouteWrapper  exact path="/team/:hackathonId/:teamId" component={TeamView} layout={Layout}/>
        
        {/* show team info page/index page for a team */}
        <RouteWrapper  exact path="/team/:hackathonId/:teamId/edit" component={EditTeam} layout={Layout}/>

        {/* takes user to his/her profile page */}
        {/* <RouteWrapper exact path="/loginorsignup" component={LogInOrSignUp} layout={Layout}/> */}
        </Switch>
        {/* edit team info page  */}
        {/* <RouteWrapper path="/team/:teamId/edit" component={EditProfile} layout={Layout}/> */}
      </UserContext.Provider>
      
    </Router>
 
  );
}
function RouteWrapper({
  component: Component, 
  layout: Layout, 
  ...rest
}) {
  return (
    <Route {...rest} render={(props) =>
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    } />
  );
}

export default App;
