import React, { useEffect, useState } from 'react';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@multiversx/sdk-dapp/UI';
import {
  DappProvider,
  AxiosInterceptorContext // using this is optional
} from '@multiversx/sdk-dapp/wrappers';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'components';
import {
  apiTimeout,
  walletConnectV2ProjectId,
  sampleAuthenticatedDomains
} from 'config';
import { PageNotFound, Unlock } from 'pages';
import { routeNames } from 'routes';
import { routes } from 'routes';
// import { DataStore } from '@aws-amplify/datastore';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/ManagerDashboard.css'
import { faArrowAltCircleDown, faArrowDown, faArrowTurnUp, faArrowUp, faBank, faBoltLightning, faCalendar, faCheck, faClose, faDove, faFile, faFilter, faHandshakeAlt, faHandSparkles, faHeadSideCoughSlash, faIdCard, faImagePortrait, faInfo, faInfoCircle, faMoneyBill, faMoneyCheck, faPeopleArrows, faPerson, faQuestion, faRefresh, faShare, faShareAlt, faShareAltSquare, faUser, faUserTie, faX } from '@fortawesome/free-solid-svg-icons';
import { faShareSquare, faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import LinearWithValueLabel from './LinearProgressWithLabel';
import { PromptProps } from 'react-router-dom';
import ContactMap from './ContactMap';


export default function CampaignManager(props){

    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [fullCampaignCategory, setFullCampaignCategory] = useState('donate');
    

    useEffect(()=>{
      setTimeout(()=>{
        if(copied)
        setCopied(false);
      },1000);
    },[copied])

    useEffect(() => {
      console.log(props.campaignData);
      if (props.campaignData) {
        setLoading(true);
  
        const image = new Image();
        image.src = props.campaignData.image;
  
        image.onload = () => {

          //de sters timeout => doar pt suspans
          setTimeout(()=>{
            setLoading(false);
          },400)
        };
      }
    }, [props.campaignData]);

    return(<>
    
    {
      props.moreInfo &&
      (
        <>
        <div className={`container-campaign-full2 ${fullCampaignCategory === 'approve' || fullCampaignCategory === 'file' ? 'filemode' : ''}`} >
          <FontAwesomeIcon className='close-container-full' icon={faClose} onClick={props.toggleMoreInfo}/>
            <div className={`container-campaign-full-1-2 ${fullCampaignCategory === 'approve' || fullCampaignCategory === 'file' ? 'filemode' : fullCampaignCategory === 'story' ? 'storymode' : ''}`} style={{backgroundImage:`url(${props.campaignData.image})`}}>
              <div className={`info-tag-people-full ${fullCampaignCategory === 'approve' || fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{props.campaignData.noPeople}K <FontAwesomeIcon className='icon-info-tag-people' icon={faUserTie}/></div>
              <div className={`info-tag-donated-full ${fullCampaignCategory === 'approve' || fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{props.campaignData.noPeople}K <FontAwesomeIcon className='icon-info-tag-people' icon={faMoneyBill}/></div>
              <div className={`info-tag-title ${fullCampaignCategory === 'approve' || fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{props.campaignData.title}</div>
              <div className={`info-tag-date ${fullCampaignCategory === 'approve' || fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{props.campaignData.date}</div>
            </div>
            <div className={`container-campaign-full-2 ${fullCampaignCategory === 'approve'  || fullCampaignCategory === 'file' ? 'filemode' : ''}`}>
              <div className='container-switch2'>
                <div className='switch-donate' onClick={()=>{setFullCampaignCategory('donate')}}>
                 <FontAwesomeIcon className='faHandSparkles-donate' icon={faHandSparkles}/> Donate
                </div>
                <div className={`switch-story ${fullCampaignCategory === 'story' ? 'active' : ''}`} onClick={()=>{setFullCampaignCategory('story')}}>
                  Story
                </div>
                <div className={`switch-story ${fullCampaignCategory === 'contact' ? 'active' : ''}`} onClick={() => { setFullCampaignCategory('contact') }}>
                  Contact
                </div>
                <div className={`switch-file ${fullCampaignCategory === 'file' ? 'active' : ''}`} onClick={() => { setFullCampaignCategory('file') }}>
                 <FontAwesomeIcon icon={faFile} />
                </div>
                <div className={`switch-approve ${fullCampaignCategory === 'approve' ? 'active' : ''}`} onClick={() => { setFullCampaignCategory('approve') }}>
                 <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
            </div>
            <div className={`container-campaign-full-3 ${fullCampaignCategory === 'approve'  || fullCampaignCategory === 'file' ? 'filemode' : ''}`}>
              {
                fullCampaignCategory === 'donate' ? 
                (<> 
                  <div className='box-details-donate'>
                    <div className='forall-container-input2'>
                      <div className='circle-logo-egld'><img className='logo-egld' src='https://i.imgur.com/MFHKiPj.png'></img></div>
                      <input className='input-donation-forall2' type='number' placeholder='Amount'></input>
                      <div className='input-donation-refresh-forall'>Send</div>
                      <div className='container-balance2'>Balance: 0.4 EGLD</div>
                    </div>
                  </div>
                  
                  <div className='box-details-donate2'>
                    <div className='other-methods'>Other donating methods</div>
                    <div className='other-methods-line'></div>
                    <br></br>
                    <div className='other-method1'><FontAwesomeIcon icon={faBank}/> Bank Accounts</div>
                    <div className='other-method2'>RO11RNCB0049538375</div>
                    <div className='other-method3'>RO11RNCB0074574593</div>
                    <br></br>
                    <div className='revolut-container'>
                      <div className='other-method1'>Revolut</div>
                      <div className='other-method2'>revolut.me/steflz</div>
                      <div className='other-method3'>revolut.me/iamhuman</div>
                    </div>
                      <img className='qr-revolut' src="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png"/>
                  </div>
                  

                  {/* 
                    <div className='qr-box-donate'>
                     <img className='qr-image-details' src="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png"/>
                    </div> 
                  */}
                </>) :
                fullCampaignCategory === 'story' ? 
                (<>

                  <div className='container-text-story'>
                   {props.campaignData.description}
                  </div>
                
                </>) :
                fullCampaignCategory === 'contact' ? (<>
                <div className='container-contact'>
                  
                  <div className='contact-phoneNo'>
                    Phone number: 07834785343
                  </div>
                  <div className='contact-email'>
                    Email: iamhuman@gmail.com
                  </div>
                  <div className='contact-address'>
                    Address: Bulevardul Ion C. Brătianu 44, București 030177
                  </div>
                    <ContactMap/>
                  
                </div>
                </>) :
                fullCampaignCategory === 'file' ? (<>
                <div className='download-btn-full-container'>
                  <div className='download-btn-full-text'>
                    You can download all data files that atest veridicity of campaign.
                  </div>
                  <div className='download-btn-full'>
                    Download
                  </div>
                </div>
                </>) :
                fullCampaignCategory === 'approve' ? (<>
                <div className='download-btn-full-container'>
                  <div className='decision-btn-full-text'>
                    Please make your decision
                  </div>
                  <div className='decisionBOX'>
                    <div className='deny-btn-full'>
                      Deny
                    </div>

                    <div className='approve-btn-full'>
                      Approve
                    </div>
                  </div>
                </div>
                </>): (<></>)
              }
            </div>
        </div>
        </>
      )
    }
      <div className='container-campaign2'>
        {
          loading ? 
          (<>
                <div id='loading-screen-main' className='loading-screen'>  
                  <svg className="spinner" viewBox="0 0 50 50">
                    <circle id='path' className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
                  </svg>
                </div>
          </>) : 
          (<>
            <div className='container-campaign-1' onClick={props.toggleMoreInfo} style={{backgroundImage:`url(${props.campaignData.image})`}}>
              <div className='info-tag'>{props.campaignData.daysLeft} days left</div>
              {
                copied ? (
                  <div className='info-copied'>Link copied</div>
                  ):(
                    <FontAwesomeIcon className='info-share' onClick={()=>{setCopied(!copied);}} icon={faShareSquare}/>
                  )
              }
              <div className='info-tag-people'>{props.campaignData.noPeople}K <FontAwesomeIcon className='icon-info-tag-people' icon={faUserTie}/></div>
            </div>
            <div className='container-campaign-2'>
              <div className='donate-bar'>
                <div className='bar-title'>{props.campaignData.title}</div>

              </div>
            </div>
          </>) 
        }
      </div>
    </>)
}