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
import QRCode from 'qrcode.react';
import { useGetAccountInfo , useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import { contractAddress } from 'config';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { sendTransactions } from '@multiversx/sdk-dapp/services';



export default function CampaignManager(props){

    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [fullCampaignCategory, setFullCampaignCategory] = useState('donate');
    const { address, account } = useGetAccountInfo();
    const [ sendEgldValue,setSendEgldValue] = useState(0);
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

    const [saveValueToUpdate, setSaveValueToUpdate] = useState(0);
    const onSuccess = async ()=>{
      const newValue = (saveValueToUpdate*33 + parseFloat(props.campaignData.amountCurrent))
      const newPeople = parseInt(props.campaignData.noPeople)+1
        try {
          const updateCampaign = await API.graphql(graphqlOperation(mutations.updateCampaign, {
              input: {
                id: props.campaignData.id,
                _version: props.campaignData._version,
                amountCurrent: newValue,
                noPeople: newPeople
              }
          }));
            console.log("Database updated with new amount current:", updateCampaign);
            window.location.reload();
          } catch (error) {
            console.log("Error updating exam:", error);
          }
    }
    const transactionStatus = useTrackTransactionStatus({
      transactionId:transactionSessionId,
      onSuccess
    })

    const sendTransactionToSC = async () => {
      let no = parseFloat(sendEgldValue); // Valoarea din input
      setSaveValueToUpdate(parseFloat(sendEgldValue));
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
        image.src = props.campaignData.photo;
  
        image.onload = () => {

          //de sters timeout => doar pt suspans
          setTimeout(()=>{
            setLoading(false);
          },400)
        };
      }
    }, [props.campaignData]);


    const makeInactive = async ()=>{
      console.log('Am apasat sa fie inactiva')

      try {
        // update answer in DB
        const updateCampaign = await API.graphql(graphqlOperation(mutations.updateCampaign, {
            input: {
              id: props.campaignData.id,
              _version: props.campaignData._version,
              isActive: false
            }
        }));
          console.log("Exam has been updated:", updateCampaign);
          window.location.reload();
        } catch (error) {
          console.log("Error updating exam:", error);
        }
    }

    const makeActive = async ()=>{
      console.log('Am apasat sa fie activa')

      try {
        // update answer in DB
        const updateCampaign = await API.graphql(graphqlOperation(mutations.updateCampaign, {
            input: {
              id: props.campaignData.id,
              _version: props.campaignData._version,
              isActive: true
            }
        }));
          console.log("Exam has been updated:", updateCampaign);
          window.location.reload();
        } catch (error) {
          console.log("Error updating exam:", error);
        }
    }

    const deteleCampaign = async ()=>{
      console.log('Am apasat sa fie stearsa')

      try {
        // update answer in DB
        const updateCampaign = await API.graphql(graphqlOperation(mutations.deleteCampaign, {
            input: {
              id: props.campaignData.id,
              _version: props.campaignData._version,
            }
        }));
          console.log("Exam has been updated:", updateCampaign);
          window.location.reload();
        } catch (error) {
          console.log("Error updating exam:", error);
        }
    }

    const downloadDocs = async () => {
      if (props.campaignData.docs)
      {
        const fileUrl = props.campaignData.docs; // Replace with the actual file URL
        const fileName = `${props.campaignData.title}.pdf`; // Replace with the desired file name
    
        try {
          const response = await fetch(fileUrl, {
            method: 'GET',
            responseType: 'blob', // Retrieve the file as a binary object
          });
    
          const blob = await response.blob();
    
          // Create a temporary link to trigger the download
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading file:', error);
        }
      }else
      {
        alert('No file uploaded for this campaign.')
      }
      
    }

    return(<>
    
    {
      props.moreInfo &&
      (
        <>
        <div className={`container-campaign-full2 ${fullCampaignCategory === 'approve' || fullCampaignCategory === 'file' ? 'filemode' : ''}`} >
          <FontAwesomeIcon className='close-container-full' icon={faClose} onClick={props.toggleMoreInfo}/>
            <div className={`container-campaign-full-1-2 ${fullCampaignCategory === 'approve' || fullCampaignCategory === 'file' ? 'filemode' : fullCampaignCategory === 'story' ? 'storymode' : ''}`} style={{backgroundImage:`url(${props.campaignData.photo})`}}>
              <div className={`info-tag-people-full ${fullCampaignCategory === 'approve' || fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{abbreviateAmount(props.campaignData.noPeople)} <FontAwesomeIcon className='icon-info-tag-people' icon={faUserTie}/></div>
              <div className={`info-tag-donated-full ${fullCampaignCategory === 'approve' || fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{parseFloat(abbreviateAmount(props.campaignData.amountCurrent)).toFixed(2)} <FontAwesomeIcon className='icon-info-tag-people' icon={faMoneyBill}/></div>
              <div className={`info-tag-title ${fullCampaignCategory === 'approve' || fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{props.campaignData.title}</div>
              <div className={`info-tag-date ${fullCampaignCategory === 'approve' || fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{new Date(props.campaignData.deadline).toLocaleDateString()}</div>
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
                      <input className='input-donation-forall2' type='number' placeholder='Amount' onChange={(e)=>setSendEgldValue(e.target.value)}></input>
                      <div className='input-donation-refresh-forall' onClick={sendTransactionToSC}>Send</div>
                      <div className='container-balance2'>Balance: {(account.balance/1000000000000000000).toFixed(2)} EGLD</div>
                    </div>
                  </div>
                  
                  <div className='box-details-donate2'>
                    <div className='other-methods'>Other donating methods</div>
                    <div className='other-methods-line'></div>
                    <br></br>
                    <div className='other-method1'><FontAwesomeIcon icon={faBank}/> Bank Accounts</div>
                    {props.campaignData.bankAccounts ? (<div>
                      {props.campaignData.bankAccounts.split(',').map((accountNumber, index) => (
                        <div key={index} className={`other-method${index + 2}`}>{accountNumber.trim()}</div>
                      ))}
                    </div>) : (<div></div>)

                    }
                    <br></br>
                    <div className='revolut-container'>
                      <div className='other-method1'>Revolut</div>
                      {props.campaignData.revolutAccounts ? (
                      <div>
                      {props.campaignData.revolutAccounts.split(',').map((accountNumber, index) => (
                        <div key={index} className={`other-method${index+2}`}>revolut.me/{accountNumber.trim()}</div>
                      ))}
                    </div>) 
                    : 
                    (<div></div>)
                    }
                    </div>
                    <QRCode className='qr-revolut' value={`revolut.me/${props.campaignData.revolutAccounts.split(',')[0]}`} />
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
                    Phone number: {props.campaignData.phoneContact}
                  </div>
                  <div className='contact-email'>
                    Email: {props.campaignData.emailContact}
                  </div>
                  <div className='contact-address'>
                    Address: {props.campaignData.address}
                  </div>
                    <ContactMap/>
                  
                </div>
                </>) :
                fullCampaignCategory === 'file' ? (<>
                <div className='download-btn-full-container'>
                  <div className='download-btn-full-text'>
                    You can download all data files that atest veridicity of campaign.
                  </div>
                  <div className='download-btn-full' onClick={downloadDocs}>
                    Download
                  </div>
                </div>
                </>) :
                fullCampaignCategory === 'approve' ? (<>
                {
                    props.activeFilter === 'Active' ? (<>
                        <div className='download-btn-full-container'>
                          <div className='decision-btn-full-text'>
                            <div className='other-methods2'>Please make your decision</div>
                            <div className='other-methods-line2'></div>
                          </div>
                          <div className='decisionBOX'>
                            <div className='deny-btn-full' onClick={deteleCampaign}>
                              Delete
                            </div>

                            <div className='approve-btn-full' onClick={makeInactive}>
                              Make Inactive
                            </div>
                          </div>
                        </div>
                    </>) :
                    (<>
                    
                        <div className='download-btn-full-container'>
                        <div className='decision-btn-full-text'>
                            <div className='other-methods2'>Please make your decision</div>
                            <div className='other-methods-line2'></div>
                          </div>
                          <div className='decisionBOX'>
                            <div className='deny-btn-full'>
                              Deny
                            </div>

                            <div className='approve-btn-full' onClick={makeActive}>
                              Approve
                            </div>
                          </div>
                        </div>
                    </>)
                }

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
            <div className='container-campaign-1' onClick={props.toggleMoreInfo} style={{backgroundImage:`url(${props.campaignData.photo})`}}>
              <div className='info-tag'>{Math.ceil((Date.parse(props.campaignData.deadline) - Date.now()) / (1000 * 60 * 60 * 24))} days left</div>
              {
                copied ? (
                  <div className='info-copied'>Link copied</div>
                  ):(
                    <FontAwesomeIcon className='info-share' onClick={()=>{setCopied(!copied);}} icon={faShareSquare}/>
                  )
              }
              <div className='info-tag-people'>{abbreviateAmount(props.campaignData.noPeople)} <FontAwesomeIcon className='icon-info-tag-people' icon={faUserTie}/></div>
            </div>
            <div className='container-campaign-2'>
              <div className='donate-bar'>
                <div className='bar-title2'>{props.campaignData.title}</div>

              </div>
            </div>
          </>) 
        }
      </div>
    </>)
}