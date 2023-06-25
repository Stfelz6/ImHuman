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
import { faArrowAltCircleDown, faArrowDown, faArrowUp, faCalendar, faDove, faFile, faFilter, faHandshakeAlt, faHeadSideCoughSlash, faInfo, faInfoCircle, faPeopleArrows, faPerson, faQuestion, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import LinearWithValueLabel from './LinearProgressWithLabel';
import { PromptProps } from 'react-router-dom';


export default function Campaign(props){

    return(<>
      <div className='container-campaign'>
        <div className='container-campaign-1' style={{backgroundImage:`url(${props.campaignData.image})`}}>
          <div className='info-tag'>{props.campaignData.daysLeft} days left</div>
          <div className='info-tag-people'>{props.campaignData.noPeople}K <FontAwesomeIcon className='icon-info-tag-people' icon={faUserTie}/></div>
        </div>
        <div className='container-campaign-2'>
          <div className='donate-bar'>
            <div className='bar-title'>{props.campaignData.title}</div>
            <div className='bar-amountDonated'>
              <div className='bar-money'>{props.campaignData.amountDonated}$ / {props.campaignData.amountTotal}$ </div>
              <div className='bar-bar'><LinearWithValueLabel/></div>
              
            </div>
            
          </div>
        </div>
        <div className='container-campaign-3'>
          <div className='donate-btn'>Help campaign</div>
          <div className='donate-info'><FontAwesomeIcon icon={faDove}></FontAwesomeIcon></div>
        </div>
      </div>
    </>)
}