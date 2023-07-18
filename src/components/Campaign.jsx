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
import { signTransactions } from '@multiversx/sdk-dapp/services';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { Link } from 'react-router-dom';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import moment from 'moment';
import { contractAddress } from 'config';
import { useGetTimeToPong, useGetPingAmount } from '../pages/Dashboard/components/Actions/helpers';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useGetAccountInfo, useSignTransactions, useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import { Address, Transaction } from '@multiversx/sdk-core';
import QRCode from 'qrcode.react';
import { sendSignedTransactions } from '@multiversx/sdk-dapp/apiCalls';
import { TransactionPayload } from "@multiversx/sdk-core";
import { TokenTransfer } from "@multiversx/sdk-core";
import { Account } from "@multiversx/sdk-core";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers";
import { ApiNetworkProvider } from "@multiversx/sdk-network-providers";
import { TransactionWatcher } from "@multiversx/sdk-core";
import { useGetAccountProvider } from '@multiversx/sdk-dapp/hooks';
import { smartContract } from 'pages/Dashboard/components/Actions/helpers/smartContract';


export default function Campaign(props) {
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [btnDropdown, setBtnDropdown] = useState(false);
  const [fullCampaignCategory, setFullCampaignCategory] = useState('donate');
  const { hasPendingTransactions } = useGetPendingTransactions();
  const getTimeToPong = useGetTimeToPong();
  const pingAmount = useGetPingAmount();
  const [secondsLeft, setSecondsLeft] = useState();
  const [hasPing, setHasPing] = useState(false);
  const [transactionSessionId, setTransactionSessionId] = useState(null);
  const { address, account } = useGetAccountInfo();
  const [sendEgldValue, setSendEgldValue] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);


  useEffect(() => {
    if (props.campaignData && props.campaignData.latitude_longitude) {
      const [lat, long] = props.campaignData.latitude_longitude.split('/');
      setLatitude(parseFloat(lat));
      setLongitude(parseFloat(long));
    }
  }, [props.campaignData]);

  useEffect(() => {

    console.log('latitude', latitude)
    console.log('longitude', longitude)
  }, [latitude, longitude]);


  function abbreviateAmount(amount) {
    if (amount >= 1000 && amount < 1000000) {
      const abbreviatedAmount = (amount / 1000).toFixed(1);
      return `${abbreviatedAmount}K`;
    } else if (amount >= 1000000) {
      const abbreviatedAmount = (amount / 1000000).toFixed(1);
      return `${abbreviatedAmount}M`;
    }
    return parseFloat(amount).toFixed(1);
  }

  const [saveValueToUpdate, setSaveValueToUpdate] = useState(0);

  useEffect(() => {
    console.log(transactionSessionId);
  }, [transactionSessionId])

  const onSuccess = async () => {
    const newValue = saveValueToUpdate * 33 + parseFloat(props.campaignData.amountCurrent);
    const newPeople = parseInt(props.campaignData.noPeople) + 1;
    try {
      const updatedCampaign = await API.graphql(
        graphqlOperation(mutations.updateCampaign, {
          input: {
            id: props.campaignData.id,
            _version: props.campaignData._version,
            amountCurrent: newValue,
            noPeople: newPeople
          }
        })
      );
      console.log("Database updated with new amount current:", updateCampaign);
      const updateCampaign = updatedCampaign.data.updateCampaign;
      // Update the filteredCampaigns and campaignDataArray arrays
      const updatedFilteredCampaigns = [...props.filteredCampaigns];
      const updatedCampaignDataArray = [...props.campaignDataArray];

      for (let i = 0; i < updatedFilteredCampaigns.length; i++) {
        if (updatedFilteredCampaigns[i].id === updateCampaign.id) {
          updatedFilteredCampaigns[i] = updateCampaign;
          break;
        }
      }

      for (let i = 0; i < updatedCampaignDataArray.length; i++) {
        if (updatedCampaignDataArray[i].id === updateCampaign.id) {
          updatedCampaignDataArray[i] = updateCampaign;
          break;
        }
      }

      props.setFilteredCampaigns(updatedFilteredCampaigns);
      props.setCampaignDataArray(updatedCampaignDataArray);

      // window.location.reload();
    } catch (error) {
      console.log("Error updating exam:", error);
    }
  };

  const transactionStatus = useTrackTransactionStatus({
    transactionId: transactionSessionId,
    onSuccess
  })


  const { providerType, provider } = useGetAccountProvider();

  const sendTransactionToWallet = async () => {
    let no = parseFloat(sendEgldValue); // Valoarea din input
    setSaveValueToUpdate(parseFloat(sendEgldValue));
    let copy = no;

    if (isNaN(no) || no === 0) {
      console.log("Invalid input. Please enter a valid number.");
      props.setAlert({
        type: 'invalidValue',
        title: 'Invalid Value.',
        body: 'You try to send an invalid amount of EGLD.',
      });
      return;
    }

    copy = no * 1000000000000000000;

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
        processingMessage: 'Sending funds in campaign',
        errorMessage: 'An error has occured during sending funds',
        successMessage: 'Sending funds successful'
      },
      redirectAfterSign: false
    });


    console.log(sessionId);

    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }







    // const apiNetworkProvider = new ApiNetworkProvider("https://devnet-api.multiversx.com");
    // const proxyNetworkProvider = new ProxyNetworkProvider("https://devnet-gateway.multiversx.com");
    // // const networkConfig = await apiNetworkProvider.getNetworkConfig();
    // const alice = new Account(props.campaignData.wallet);
    // const adr = new Address(alice.address);
    // const sen = new Address(account.address);
    // console.log('adr', adr.bech32())
    // console.log('props.campaignData.wallet', props.campaignData.wallet)
    // const frumix = Address.fromBech32(props.campaignData.wallet).hex();
    // console.log('frumix', frumix)

    // // const aliceOnNetwork = await apiNetworkProvider.getAccount(frumix);
    // // console.log(aliceOnNetwork);
    // // alice.update(aliceOnNetwork);
    // alice.incrementNonce();
    // console.log("Nonce:", alice.nonce);
    // // let firstTransfer = TokenTransfer.egldFromAmount("1.5");

    // const tx = new Transaction({
    //   data: new TransactionPayload("XEGLD transfer"),
    //   gasLimit: 60000000,
    //   sender: sen,
    //   receiver: adr,
    //   value: 12344,
    //   chainID: "D"
    // });

    // console.log(tx)
    // const transac = await signTransactions({
    //   transactions: [tx],
    //   transactionsDisplayInfo: {
    //     processingMessage: 'Processing send funds transaction',
    //     errorMessage: 'An error has occurred during send',
    //     successMessage: 'Send funds transaction successful',
    //   },
    //   customTransactionInformation:{
    //     redirectAfterSign: false
    //   }
    // });
    // console.log(transac)
    

    // BROADCAST MUST BE SIGNED BEFORE
    // console.log("proxyNetworkProvider:", proxyNetworkProvider); 
    // let txHash = await proxyNetworkProvider.sendTransaction(tx); 
    // const watcher = new TransactionWatcher(apiNetworkProvider);
    // const transactionOnNetwork = await watcher.awaitCompleted(tx);
    // console.log("watcher:", watcher); 
    // console.log("transactionOnNetwork:", transactionOnNetwork); 
  };

  useEffect(() => {
    setTimeout(() => {
      if (copied)
        setCopied(false);
    }, 1000);
  }, [copied])

  useEffect(() => {
    console.log(props.campaignData);
    if (props.campaignData) {
      setLoading(true);

      const image = new Image();
      image.src = props.campaignData.photo;

      image.onload = () => {

        //de sters timeout => doar pt suspans
        setTimeout(() => {
          setLoading(false);
        }, 400)
      };
    }
  }, [props.campaignData]);


  const downloadDocs = async () => {
    if (props.campaignData.docs) {
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
    } else {
      alert('No file uploaded for this campaign.')
    }

  }

  const fastDonate = async () => {
    let no = 0.5; // Valoarea din input
    setSaveValueToUpdate(0.5);
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

  useEffect(() => {
    console.log(account);
  }, [account])

  return (<>
    {
      props.moreInfo &&
      (
        <div className={`container-campaign-full ${fullCampaignCategory === 'file' ? 'filemode' : ''}`} >
          <FontAwesomeIcon className='close-container-full' icon={faClose} onClick={props.toggleMoreInfo} />
          <div className={`container-campaign-full-1 ${fullCampaignCategory === 'file' ? 'filemode' : fullCampaignCategory === 'story' ? 'storymode' : ''}`} style={{ backgroundImage: `url(${props.campaignData.photo})` }}>
            <div className={`info-tag-people-full ${fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{abbreviateAmount(props.campaignData.noPeople)} <FontAwesomeIcon className='icon-info-tag-people' icon={faUserTie} /></div>
            <div className={`info-tag-donated-full ${fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{abbreviateAmount(props.campaignData.amountCurrent)} <FontAwesomeIcon className='icon-info-tag-people' icon={faMoneyBill} /></div>
            <div className={`info-tag-title ${fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{props.campaignData.title}</div>
            <div className={`info-tag-date ${fullCampaignCategory === 'file' ? 'filemode' : ''}`}>{new Date(props.campaignData.createdAt).toLocaleDateString()}</div>
          </div>
          <div className={`container-campaign-full-2 ${fullCampaignCategory === 'file' ? 'filemode' : ''}`}>
            <div className='container-switch'>
              <div className='switch-donate' onClick={() => { setFullCampaignCategory('donate') }}>
                <FontAwesomeIcon className='faHandSparkles-donate' icon={faHandSparkles} /> Donate
              </div>
              <div className={`switch-story ${fullCampaignCategory === 'story' ? 'active' : ''}`} onClick={() => { setFullCampaignCategory('story') }}>
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
                      <div className='circle-logo-egld-2'><img className='logo-egld' src='https://i.imgur.com/MFHKiPj.png'></img></div>
                      <input className='input-donation-forall2' type='number' placeholder='Amount' onChange={(e) => setSendEgldValue(e.target.value)}></input>
                      <div className='input-donation-refresh-forall' onClick={() => { sendTransactionToWallet(); }}>Send</div>
                      <div className='container-balance2'>
                        {
                          account.balance !== '...' ? (<>Balance: {(account.balance / 1000000000000000000).toFixed(2)} EGLD</>) : (<>Not connected</>)
                        }
                      </div>
                    </div>
                  </div>

                  <div className='box-details-donate2'>
                    <div className='other-methods'>Other donating methods</div>
                    <div className='other-methods-line'></div>
                    <br></br>
                    <div className='other-method1'><FontAwesomeIcon icon={faBank} /> Bank Accounts</div>
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
                            <div key={index} className={`other-method${index + 2}`}>revolut.me/{accountNumber.trim()}</div>
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
                      <ContactMap longitude={longitude} latitude={latitude} />

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
            <div className='container-campaign-1' onClick={props.toggleMoreInfo} style={{ backgroundImage: `url(${props.campaignData.photo})` }}>
              <div className='info-tag'>{Math.ceil((Date.parse(props.campaignData.deadline) - Date.now()) / (1000 * 60 * 60 * 24))} days left</div>
              {
                copied ? (
                  <div className='info-copied'>Link copied</div>
                ) : (
                  <FontAwesomeIcon className='info-share' onClick={() => { setCopied(!copied); }} icon={faShareSquare} />
                )
              }
              <div className='info-tag-people'>{abbreviateAmount(props.campaignData.noPeople)} <FontAwesomeIcon className='icon-info-tag-people' icon={faUserTie} /></div>
            </div>
            <div className='container-campaign-2'>
              <div className='donate-bar'>
                <div className='bar-title'>{props.campaignData.title}</div>
                <div className='bar-amountDonated'>
                  <div className='bar-money'>
                    {abbreviateAmount(props.campaignData.amountCurrent)} $ / {abbreviateAmount(props.campaignData.amountNeeded)} $
                  </div>
                  <div className='bar-bar'><LinearWithValueLabel campaignData={props.campaignData} /></div>

                </div>

              </div>
            </div>
            <div className='container-campaign-3'>
              <div className='donate-btn' onMouseEnter={() => { setBtnDropdown(true) }} onMouseLeave={() => { setBtnDropdown(false) }} onClick={fastDonate}><FontAwesomeIcon className='fast-donate-icon' icon={faBoltLightning} /> Fast Donate</div>
              {
                btnDropdown && (
                  <>
                    <div className='donate-btn-dropdown' onMouseEnter={() => { setBtnDropdown(true) }} onMouseLeave={() => { setBtnDropdown(false) }}> <FontAwesomeIcon className='donate-icon-arrow-down' icon={faArrowAltCircleDown} /> You will sign a transaction of 0.5 EGLD.</div>
                  </>
                )
              }
              <div className='donate-info' onClick={props.toggleMoreInfo}>
                {
                  props.moreInfo ? (<FontAwesomeIcon icon={faClose} />) : (<FontAwesomeIcon icon={faDove} />)
                }
              </div>
            </div>
          </>)
      }
    </div>
  </>)



}