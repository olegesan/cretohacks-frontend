import React from "react";
import NavBar from "./nav/NavBar"
function Layout ({children}){
    return (
        <div>
           <NavBar/>
           <div className="d-flex justify-content-center">
                <div className="constainer-fluid w-75">
                        {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;