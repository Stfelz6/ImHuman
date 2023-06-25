import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/RecentDoner.css'
import Heartbeat from 'components/Heartbeat';

export default function RecentDoner(){

    const [details, setDetails] = useState();

    return(<>
    <div className='container-recent-doner' onMouseEnter={()=>{setDetails(!details)}} onMouseLeave={()=>{setDetails(!details)}}>
        <div className='user-text'>Flavian Ene</div>
        <div className='amount-text'>
        {
            details ? (<>THANK YOU!</>) : 
            (<>200 $</>)
        }
        </div>
    </div>
    </>)
}