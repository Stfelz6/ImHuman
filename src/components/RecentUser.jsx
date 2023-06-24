import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/RecentDoner.css'
import Heartbeat from 'components/Heartbeat';

export default function RecentUser(){

    return(<>
    <div className='container-recent-doner'>
        <div className='user-text'>Giurgiteanu Mihai Andrei</div>
        <div className='joined-text'>JOINED</div>
    </div>
    </>)
}