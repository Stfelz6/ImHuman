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
import '../styles/loadingPage.css'
import { faArrowAltCircleDown, faArrowDown, faArrowUp, faBoltLightning, faCalendar, faClose, faDove, faFile, faFilter, faHandshakeAlt, faHeadSideCoughSlash, faInfo, faInfoCircle, faPeopleArrows, faPerson, faQuestion, faUser, faUserTie, faX } from '@fortawesome/free-solid-svg-icons';
import { faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import LinearWithValueLabel from './LinearProgressWithLabel';
import { PromptProps } from 'react-router-dom';

export default function LoadingPage(){

    return(
        <>
            <div className="loadingPage">
                <div className='loadingPageText'>#imhuman</div>
                
                <div id='loading-screen-main' className='loading-screen-loadingPage'>  
                  <svg className="spinner" viewBox="0 0 50 50">
                    <circle id='path' className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
                  </svg>
                </div>
            </div>
        </>
    )
}