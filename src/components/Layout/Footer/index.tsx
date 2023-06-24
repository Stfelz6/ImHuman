import React from 'react';
import {useState} from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowDown, faCircle, faHeart, faRectangleAd, faRectangleList, faSquare, faTriangleCircleSquare, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/layout.css'
import Heartbeat from 'components/Heartbeat';
import RecentDoner from 'components/RecentDoner';
import { useEffect, useRef } from 'react';
import Marquee from 'react-marquee-slider';
import { useStore } from 'react-three-fiber';
import RecentUser from 'components/RecentUser';

/* eslint-disable */
export const Footer = () => {

  const [useri, setUseri] = useState([]);
  const [hoverDonateAll, setHoverDonateAll] = useState(false);

  return (
    <>
    <div className='footer text-center'>
        <a
          {...{
            target: '_blank'
          }}
          className='footertext'
          href='https://multiversx.com/'
        >
          Made with &nbsp; <FontAwesomeIcon
                  icon={faHeart}
                /> &nbsp; by Stefania Busuioc
        </a>
        <a className='build-tag'>Build v0.01 - License</a>
    </div>

    <Heartbeat></Heartbeat>
    {
      hoverDonateAll && (
      <>
        <div className='forall-container'>Donate for all</div>
      </>
      )
    }
    <FontAwesomeIcon border={true} className='arrowdown' onClick={()=>{setHoverDonateAll(!hoverDonateAll)}} icon={faHeart}/>
    <div className='arrowdown2'>
      <div className='label-recent-doners'>Recent Donators</div>
      <div className='label-recent-joiners'>Recent Users</div>
    </div>
    <div className='bottom-scroll-container'>
      
      <div className='BR'>
        <div className='shadow-BR'></div>
        <div className='shadow-BR2'></div>
        <Marquee velocity={5} direction="rtl" scatterRandomly={false} resetAfterTries={1} onInit={()=>{}} onFinish={()=>{}}>
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
        </Marquee>
      </div>

      <div className='BL'>
        <div className='shadow-BL'></div>
        <div className='shadow-BL2'></div>
        <Marquee velocity={5} direction="ltr" scatterRandomly={false} resetAfterTries={1} onInit={()=>{}} onFinish={()=>{}}>
          <RecentUser />      
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
        </Marquee>
      </div>

      </div>

      </>
  );
};
