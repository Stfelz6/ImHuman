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
import { faArrowAltCircleDown, faArrowDown, faArrowUp, faBoltLightning, faCalendar, faClose, faDove, faFile, faFilter, faHandshakeAlt, faHandSparkles, faHeadSideCoughSlash, faInfo, faInfoCircle, faMoneyBill, faMoneyCheck, faPeopleArrows, faPerson, faQuestion, faShare, faShareAlt, faShareAltSquare, faUser, faUserTie, faX } from '@fortawesome/free-solid-svg-icons';
import { faShareSquare, faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import LinearWithValueLabel from './LinearProgressWithLabel';
import { PromptProps } from 'react-router-dom';


export default function Campaign(props){

    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [fullCampaignCategory, setFullCampaignCategory] = useState('donate');

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
        <div className={`container-campaign-full ${fullCampaignCategory === 'file' ? 'filemode' : ''}`} >
          <FontAwesomeIcon className='close-container-full' icon={faClose} onClick={props.toggleMoreInfo}/>
            <div className='container-campaign-full-1' style={{backgroundImage:`url(${props.campaignData.image})`}}>
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
                  <div className='box-details-donate'></div>
                  <div className='qr-box-donate'>
                   <img className='qr-image-details' src="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png"/>
                  </div>
                </>) :
                fullCampaignCategory === 'story' ? 
                (<>

                  <div className='container-text-story'>
                    In a small town called Meadowville, there lived a young woman named Emily. Emily was a hardworking and kind-hearted individual who had fallen on tough times. She had recently lost her job and was struggling to make ends meet
                    Emily lived in a modest apartment and was barely able to afford her basic necessities. She often skipped meals to save money and couldn't afford proper winter clothing to keep warm during the cold months. Despite her own challenges, she always maintained a positive attitude and never stopped believing that things would get better.
                    One day, word about Emily's situation reached the community. The townspeople were deeply moved by her perseverance and decided to come together to help her. They organized a donation drive where they collected warm clothes, non-perishable food items, and essential supplies for Emily.
                    The community's kindness didn't stop there. The local grocery store owner offered Emily a part-time job to help her regain financial stability. Additionally, a group of volunteers started a crowdfunding campaign to assist Emily in paying her rent and bills until she could find a new job.
                    Overwhelmed with gratitude, Emily couldn't believe the generosity and support she received from her neighbors. Their collective efforts not only provided her with immediate relief but also restored her faith in humanity.
                    With the support of the community, Emily was able to get back on her feet. She eventually found a new job and worked hard to rebuild her life. Inspired by the kindness she experienced, Emily became an active participant in community service initiatives, dedicated to helping others who were in need, just as she once was.
                    This heartwarming story of compassion and solidarity reminds us of the power of community and the difference we can make in someone's life when we come together to lend a helping hand to those in need.
                  </div>
                
                </>) :
                fullCampaignCategory === 'contact' ? (<></>) :
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
              <div className='donate-btn'><FontAwesomeIcon className='fast-donate-icon' icon={faBoltLightning}/> Fast Donate</div>
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