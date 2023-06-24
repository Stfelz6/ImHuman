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
import Campaign from './Campaign';
import { faArrowAltCircleDown, faArrowDown, faArrowUp, faCalendar, faFilter, faHeadSideCoughSlash } from '@fortawesome/free-solid-svg-icons';


export default function Home(){
    const [dateDirection, setDateDirection] = useState(false);

    return(<>
      <div className='container-big'>
        <div className='container-filters'>
          <div className='filtru-date' onClick={()=>{setDateDirection(!dateDirection)}}>Date posted
            {
              dateDirection ? (<><FontAwesomeIcon className='filter-icon' border={true} icon={faArrowDown}/></>):(<><FontAwesomeIcon className='filter-icon' border={true} icon={faArrowUp}/></>)
            }
          </div>
        </div>

        <div className='container-campaigns'>
          <Campaign/>
          <Campaign/>
          <Campaign/>
          <Campaign/>
          <Campaign/>
          <Campaign/>
          <Campaign/>
          <Campaign/>
          <Campaign/>
          <Campaign/>
          <Campaign/>
          <Campaign/>
        </div>

      </div>
    </>)


}