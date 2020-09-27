import React, {useContext} from "react";
import {UserContext} from "../../utils/UserContext"
import {Link} from 'react-router-dom'


function Index (){

    const {user, setUser} = useContext(UserContext)
    console.log(user)
    return (
        <div id='index'>
            <div className = "jumbotron">
                <div className='text-center'>
                    <div className="display-4">
                        Welcome to CretoHack
                    </div>
                    <p>Find your team. Find new friends.</p>
                    <hr/>
                </div>
                <div className='container d-flex w-50 justify-content-around'>
                    <div className='btn btn-primary '>
                        {user ? (
                             <Link to="/team/create">Create Team</Link>
                        ) : (
                            <Link to="/signup">Create Team</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;