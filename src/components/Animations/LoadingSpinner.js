import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./LoadingSpinner.css"

export function LoadingSpinner(){

    return(
        <div className='d-flex justify-content-center flex-grow-1 mt-4'> 
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>    
        )
        }