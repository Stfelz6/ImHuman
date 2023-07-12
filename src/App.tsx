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
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import Home from 'components/Home';
import CreateCampaign from 'components/CreateCampaign';
import ManagerDashboard from 'components/ManagerDashboard';
import Actions from './pages/Dashboard/components/Actions/Actions'
// import * as subscriptions from './graphql/subscriptions';
// import schema from './models/schema'
// import {
// 	BrowserRouter as Router,
// 	Routes,
// 	Route,
// 	Link,
//   Navigate,
//   useParams,
//   useNavigate
// } from 'react-router-dom';
// import consoleLogo from './consoleLogo.png';
// import AddQuestionJUSTTESTING from './Components/HUD/LoggedDashboard/AddQuestionJUSTTESTING';
// var AWS = require("aws-sdk");

export const App = () => {

  const [role, setRole] = useState('');

  return (
    <>
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomanis={sampleAuthenticatedDomains}
      >
        <Router>
          <DappProvider
            environment={EnvironmentsEnum.devnet}
            customNetworkConfig={{
              name: 'customConfig',
              apiTimeout,
              walletConnectV2ProjectId
            }}
          >
            <Layout role={role} setRole={setRole}>
              <AxiosInterceptorContext.Listener />
              <TransactionsToastList />
              <NotificationModal />
              <SignTransactionsModals className='custom-class-for-modals' />
              <Routes>
                <Route path={routeNames.unlock} element={<Unlock />} />
                {routes.map((route, index) => (
                  <Route
                    path={route.path}
                    key={'route-key-' + index}
                    element={<route.component />}
                  />
                ))}
                <Route path='*' element={<PageNotFound />} />
                <Route path='/CreateCampaign' element={<CreateCampaign/>} />
                <Route path='/Home' element={<Home />} />
                <Route path='/ManagerDashboard' element={<ManagerDashboard role={role}></ManagerDashboard>}/>
                <Route path='/Actions' element={<Actions locked={false}/>}/>
              </Routes>
            </Layout>
            
          </DappProvider>
        </Router>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
    
    </>
  );
};
