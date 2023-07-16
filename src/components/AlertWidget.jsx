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
import Home from 'components/Home';
import CreateCampaign from 'components/CreateCampaign';
import ManagerDashboard from 'components/ManagerDashboard';
import CampaignManager from 'components/CampaignManager';
import ManageCampaigns from 'components/ManageCampaigns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle, faExclamationCircle, faHourglass, faTrash } from '@fortawesome/free-solid-svg-icons';



export default function AlertWidget(props) {

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
      if (props.alert && props.alert.type) {
        setShowAlert(true);
        const timer = setTimeout(() => {
          setShowAlert(false);
          props.setAlert(null);
        }, 5000);
        return () => clearTimeout(timer); // Clear the timer if the component unmounts or the alert changes
      }
    }, [props.alert]);

    return (<>
        {
            props.alert && showAlert && props.alert.type === 'createCampaign' ? (<>

                <div className='container-alert'>
                    <div className='logo-alert'>
                        <FontAwesomeIcon className='logoiconalert' icon={faCheckCircle}>
                        </FontAwesomeIcon></div>
                    <div className='container-text-alert'>
                        <div className='container-title-alert'>{props.alert.title}</div>
                        <div className='container-text-alert'>{props.alert.body}</div>
                    </div>
                </div>

            </>) : 
            props.alert && showAlert && props.alert.type === 'inactiveCampaign' ?
            (<>

                <div className='container-alert'>
                    <div className='logo-alert'>
                        <FontAwesomeIcon className='logoiconalert' icon={faExclamationCircle}>
                        </FontAwesomeIcon></div>
                    <div className='container-text-alert'>
                        <div className='container-title-alert'>{props.alert.title}</div>
                        <div className='container-text-alert'>{props.alert.body}</div>
                    </div>
                </div>

            </>) :
            props.alert && showAlert && props.alert.type === 'approveCampaign' ?
            (<>

                <div className='container-alert'>
                    <div className='logo-alert'>
                        <FontAwesomeIcon className='logoiconalert' icon={faCheckCircle}>
                        </FontAwesomeIcon></div>
                    <div className='container-text-alert'>
                        <div className='container-title-alert'>{props.alert.title}</div>
                        <div className='container-text-alert'>{props.alert.body}</div>
                    </div>
                </div>

            </>) :
            props.alert && showAlert && props.alert.type === 'deleteCampaign' ?
            (<>

                <div className='container-alert'>
                    <div className='logo-alert'>
                        <FontAwesomeIcon className='logoiconalert' icon={faTrash}>
                        </FontAwesomeIcon></div>
                    <div className='container-text-alert'>
                        <div className='container-title-alert'>{props.alert.title}</div>
                        <div className='container-text-alert'>{props.alert.body}</div>
                    </div>
                </div>

            </>) :
            props.alert && showAlert && props.alert.type === 'deleteUserCampaign' ?
            (<>

                <div className='container-alert'>
                    <div className='logo-alert'>
                        <FontAwesomeIcon className='logoiconalert' icon={faTrash}>
                        </FontAwesomeIcon></div>
                    <div className='container-text-alert'>
                        <div className='container-title-alert'>{props.alert.title}</div>
                        <div className='container-text-alert'>{props.alert.body}</div>
                    </div>
                </div>

            </>) :
            props.alert && showAlert && props.alert.type === 'updateUserCampaign' ?
            (<>

                <div className='container-alert'>
                    <div className='logo-alert'>
                        <FontAwesomeIcon className='logoiconalert' icon={faCheckCircle}>
                        </FontAwesomeIcon></div>
                    <div className='container-text-alert'>
                        <div className='container-title-alert'>{props.alert.title}</div>
                        <div className='container-text-alert'>{props.alert.body}</div>
                    </div>
                </div>

            </>) :
            props.alert && showAlert && props.alert.type === 'invalidValue' ?
            (<>

                <div className='container-alert'>
                    <div className='logo-alert'>
                        <FontAwesomeIcon className='logoiconalert' icon={faExclamationCircle}>
                        </FontAwesomeIcon></div>
                    <div className='container-text-alert'>
                        <div className='container-title-alert'>{props.alert.title}</div>
                        <div className='container-text-alert'>{props.alert.body}</div>
                    </div>
                </div>

            </>) :
            props.alert && showAlert && props.alert.type === 'waittingDistributeFunds' ?
            (<>

                <div className='container-alert'>
                    <div className='logo-alert'>
                        <FontAwesomeIcon className='logoiconalert' icon={faHourglass}>
                        </FontAwesomeIcon></div>
                    <div className='container-text-alert'>
                        <div className='container-title-alert'>{props.alert.title}</div>
                        <div className='container-text-alert'>{props.alert.body}</div>
                    </div>
                </div>

            </>) :
            (<></>)
        }
    </>);
}