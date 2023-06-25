import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/RecentDoner.css'
import Heartbeat from 'components/Heartbeat';

export default function RecentUser(){

    const [details, setDetails] = useState();

    return(<>
    <div className='container-recent-doner' onMouseEnter={()=>{setDetails(!details)}} onMouseLeave={()=>{setDetails(!details)}}>

        <div className='user-text'>Giurgiteanu Mihai Andrei</div>
        <div className='joined-text'>
        {
            details ? (<>JUST NOW</>) : 
            (<>JOINED</>)
        }
        
        </div>
    </div>
    </>)
}