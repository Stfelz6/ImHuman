import React from 'react';
import {useState} from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowAltCircleLeft, faArrowAltCircleRight, faArrowDown, faArrowLeft, faChevronLeft, faCircle, faCircleQuestion, faClose, faHeart, faRectangleAd, faRectangleList, faRefresh, faRotateBack, faSquare, faTriangleCircleSquare, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/layout.css'
import Heartbeat from 'components/Heartbeat';
import RecentDoner from 'components/RecentDoner';
import { useEffect, useRef } from 'react';
import Marquee from 'react-marquee-slider';
import { useStore } from 'react-three-fiber';
import RecentUser from 'components/RecentUser';
import { ChevronLeft } from '@mui/icons-material';

/* eslint-disable */
export const Footer = () => {

  const [useri, setUseri] = useState([]);
  const [hoverDonateAll, setHoverDonateAll] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);

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
        <div className='forall-container'>
            <FontAwesomeIcon className='icon-close-forall' icon={faClose} onClick={()=>{setHoverDonateAll(!hoverDonateAll)}}/>
          <div className='forall-container-title'>
            No need to make choices. 
          </div>
          <div className='forall-container-text'>
            In response to decision-making challenges, an alternative approach allows individuals to donate small percentages to multiple campaigns simultaneously.
          </div>
          <div className='forall-container-input'>
            <div className='circle-logo-egld'><img className='logo-egld' src='https://i.imgur.com/MFHKiPj.png'></img></div>
            <input className='input-donation-forall' type='number' placeholder='Amount'></input>
            <div className='input-donation-refresh-forall' ><FontAwesomeIcon icon={faRefresh}/></div>
            <div className='container-balance'>Balance: 0.4 EGLD</div>
          </div>

          {
            moreInfo ? (<>
            
                <div className='forall-container-qr'>
                  <div className='text-big-forall'>
                Through the implementation of a smart contract, a revolutionary system has been established where a percentage of the total funds is allocated each day to support all active campaigns. This innovative approach ensures equitable distribution and empowers a diverse range of initiatives by providing consistent financial assistance. By automating the process through a smart contract, transparency and efficiency are enhanced, fostering a fair and inclusive ecosystem for campaign funding.
                  </div>
                </div>
                <div className='moreinfo' onClick={()=>{setMoreInfo(!moreInfo)}}><FontAwesomeIcon icon={faChevronLeft}/> Back to QR</div>

            </>):(<>
            
                <div className='forall-container-qr'>
                  <img className='qr-all' src='https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png'/>
                </div>
                <div className='moreinfo' onClick={()=>{setMoreInfo(!moreInfo)}}><FontAwesomeIcon icon={faCircleQuestion}/> Need more info</div>

            </>)
          }


        </div>
      </>
      )
    }
    <FontAwesomeIcon border={true} className='arrowdown' onClick={()=>{setHoverDonateAll(!hoverDonateAll)}} icon={faHeart}/>
    <div className='arrowdown2'>
      <div className='label-recent-doners'><FontAwesomeIcon border={true} className='iconlabelsdoners' icon={faArrowAltCircleLeft}/>Recent Donators</div>
      <div className='label-recent-joiners'>Recent Users<FontAwesomeIcon border={true} className='iconlabelsdoners' icon={faArrowAltCircleRight}/></div>
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
