import React from 'react';
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
// import { Amplify, API, graphqlOperation } from 'aws-amplify';
// import * as queries from './graphql/queries';
// import * as mutations from './graphql/mutations';
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

// Amplify.configure(awsconfig);
// var AWS = require("aws-sdk");

export const App = () => {
  // const putNewUserToCustomDB = async (user) => {
  //   console.log("User was put in DB.");
  //   const userDetails = {
  //     nickname: user.attributes['custom:nickname'],
  //     role: user.attributes['custom:role'],
  //     uICode: user.attributes['custom:uICode'],
  //     email: user.attributes['email'],
  //     sub:user.attributes['sub'],
  //     currency:0,
  //     grade:0,
  //     subjectsLiked:"",
  //     expectations:"",
  //     totalHrsSpent:0,
  //     totalGoodAns:0,
  //     totalBadAns:0,
  //     totalCheatTries:0,
  //     avgRoGrade:0,
  //     avgMatGrade:0
  //   };
  //   try {
  //     const newUser = await API.graphql({
  //       query: mutations.createUser,
  //       variables: { input: userDetails }
  //     });
  //     console.log("User has been created:", newUser);
  //   } catch (error) {
  //     console.log("Error creating user:", error);
  //   } finally {
  //     createUserLockRef.current = false; // Release the lock
  //   }
  // }

  return (
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
            <Layout>
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
              </Routes>
            </Layout>
          </DappProvider>
        </Router>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
};
