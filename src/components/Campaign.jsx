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
import '../styles/home.css'
import { faArrowAltCircleDown, faArrowDown, faArrowUp, faBank, faBoltLightning, faCalendar, faClose, faDove, faFile, faFilter, faHandshakeAlt, faHandSparkles, faHeadSideCoughSlash, faInfo, faInfoCircle, faMoneyBill, faMoneyCheck, faPeopleArrows, faPerson, faQuestion, faRefresh, faShare, faShareAlt, faShareAltSquare, faUser, faUserTie, faX } from '@fortawesome/free-solid-svg-icons';
import { faShareSquare, faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import LinearWithValueLabel from './LinearProgressWithLabel';
import { PromptProps } from 'react-router-dom';
import ContactMap from './ContactMap';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { Link } from 'react-router-dom';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import moment from 'moment';
import { contractAddress } from 'config';
import { useGetTimeToPong, useGetPingAmount } from '../pages/Dashboard/components/Actions/helpers';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Transaction } from '@multiversx/sdk-core';


export default function Campaign(props){

    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [btnDropdown,setBtnDropdown] = useState(false);
    const [fullCampaignCategory, setFullCampaignCategory] = useState('donate');

    const { hasPendingTransactions } = useGetPendingTransactions();
    const getTimeToPong = useGetTimeToPong();
    const pingAmount = useGetPingAmount();
  
    const [secondsLeft, setSecondsLeft] = useState();
    const [hasPing, setHasPing] = useState(false);
    const [transactionSessionId, setTransactionSessionId] = useState(null);


    function abbreviateAmount(amount) {
      if (amount >= 1000 && amount < 1000000) {
        const abbreviatedAmount = (amount / 1000).toFixed(1);
        return `${abbreviatedAmount}K`;
      } else if (amount >= 1000000) {
        const abbreviatedAmount = (amount / 1000000).toFixed(1);
        return `${abbreviatedAmount}M`;
      }
      return amount;
    }

    useEffect(()=>{
      console.log(transactionSessionId);
    },[transactionSessionId])
    

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


    const sendTransactionToSC = async () => {
      let no = 1;
      let copy = no;
      if (no < 0) {
        const decimalCount = no.toString().split('.')[1].length;
        const zeroesCount = 20 - decimalCount;
        copy = Math.abs(no * Math.pow(10, zeroesCount)).toFixed(0);
      } else {
        copy = (no * 1000000000000000000).toFixed(0);
      }
  
      console.log("-----------");
  
      const pingTransaction = {
        // value: pingAmount,
        value: copy,
        data: 'ping',
        receiver: contractAddress,
        gasLimit: '60000000'
      };
      await refreshAccount();
  
      const { sessionId /*, error*/ } = await sendTransactions({
        transactions: pingTransaction,
        transactionsDisplayInfo: {
          processingMessage: 'Processing Ping transaction',
          errorMessage: 'An error has occured during Ping',
          successMessage: 'Ping transaction successful'
        },
        redirectAfterSign: false
      });

      
      console.log(sessionId);
      
      if (sessionId != null) {
        setTransactionSessionId(sessionId);
      }
    };
    
    



    return(<>
    {
      props.moreInfo &&
      (
        <div className={`container-campaign-full ${fullCampaignCategory === 'file' ? 'filemode' : ''}`} >
          <FontAwesomeIcon className='close-container-full' icon={faClose} onClick={props.toggleMoreInfo}/>
            <div className={`container-campaign-full-1 ${fullCampaignCategory === 'file' ? 'filemode' : fullCampaignCategory === 'story' ? 'storymode' : ''}`} style={{backgroundImage:`url(${props.campaignData.image})`}}>
              <div className={`info-tag-people-full ${fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{props.campaignData.noPeople}K <FontAwesomeIcon className='icon-info-tag-people' icon={faUserTie}/></div>
              <div className={`info-tag-donated-full ${fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{props.campaignData.noPeople}K <FontAwesomeIcon className='icon-info-tag-people' icon={faMoneyBill}/></div>
              <div className={`info-tag-title ${fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{props.campaignData.title}</div>
              <div className={`info-tag-date ${fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{props.campaignData.date}</div>
            </div>
            <div className={`container-campaign-full-2 ${fullCampaignCategory === 'file' ? 'filemode' : ''}`}>
              <div className='container-switch'>
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
              </div>
            </div>
            <div className={`container-campaign-full-3 ${fullCampaignCategory === 'file' ? 'filemode' : ''}`}>
              {
                fullCampaignCategory === 'donate' ? 
                (<> 
                  <div className='box-details-donate'>
                    <div className='forall-container-input2'>
                      <div className='circle-logo-egld'><img className='logo-egld' src='https://i.imgur.com/MFHKiPj.png'></img></div>
                      <input className='input-donation-forall2' type='number' placeholder='Amount'></input>
                      <div className='input-donation-refresh-forall' onClick={()=>{sendTransactionToSC();}}>Send</div>
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
                </>) : (<></>)
              }
            </div>
        </div>
      )
    }
      <div className='container-campaign'>
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
                <div className='bar-amountDonated'>
                <div className='bar-money'>
                  {abbreviateAmount(props.campaignData.amountDonated)} $ / {abbreviateAmount(props.campaignData.amountTotal)} $
                </div>
                  <div className='bar-bar'><LinearWithValueLabel/></div>

                </div>

              </div>
            </div>
            <div className='container-campaign-3'>
              <div className='donate-btn' onMouseEnter={()=>{setBtnDropdown(true)}} onMouseLeave={()=>{setBtnDropdown(false)}}><FontAwesomeIcon className='fast-donate-icon' icon={faBoltLightning}/> Fast Donate</div>
              {
                btnDropdown && (
                  <>
                    <div className='donate-btn-dropdown' onMouseEnter={()=>{setBtnDropdown(true)}} onMouseLeave={()=>{setBtnDropdown(false)}}> <FontAwesomeIcon className='donate-icon-arrow-down' icon={faArrowAltCircleDown}/> You will sign a transaction of 0.5 EGLD.</div>
                  </>
                )
              }
              <div className='donate-info' onClick={props.toggleMoreInfo}>
                {
                  props.moreInfo ? (<FontAwesomeIcon icon={faClose}/>) : (<FontAwesomeIcon icon={faDove}/>)
                }
              </div>
            </div>
          </>) 
        }
      </div>
    </>)
}