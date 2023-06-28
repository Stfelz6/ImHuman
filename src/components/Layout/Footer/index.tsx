import React from 'react';
import {useState} from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowAltCircleLeft, faArrowAltCircleRight, faArrowDown, faArrowLeft, faChevronLeft, faCircle, faCircleQuestion, faClose, faHeart, faRectangleAd, faRectangleList, faRefresh, faRotateBack, faSquare, faTriangleCircleSquare, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/layout.css'
import Heartbeat from 'components/Heartbeat';
import RecentDoner from 'components/RecentDoner';
import { useEffect, useRef } from 'react';
import Marquee from 'react-marquee-slider';
import { useStore } from 'react-three-fiber';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import RecentUser from 'components/RecentUser';
import { ChevronLeft } from '@mui/icons-material';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { contractAddress } from 'config';
import { useGetTimeToPong, useGetPingAmount } from '../../../pages/Dashboard/components/Actions/helpers';//../pages/Dashboard/components/Actions/helpers
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Address, AddressValue, SmartContract, SmartContractAbi, U64Value } from "@multiversx/sdk-core";
import { AbiRegistry } from "@multiversx/sdk-core";
import { promises } from "fs";
import { Interaction, U32Value } from "@multiversx/sdk-core";
import { ApiNetworkProvider } from "@multiversx/sdk-network-providers";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers";
import { ResultsParser } from "@multiversx/sdk-core";
import axios from "axios";
import { Transaction } from '@multiversx/sdk-core';

const proxyNetworkProvider = new ProxyNetworkProvider("https://devnet-gateway.multiversx.com");

const apiNetworkProvider = new ApiNetworkProvider("https://devnet-api.multiversx.com");

/* eslint-disable */
export const Footer = () => {

  const [useri, setUseri] = useState([]);
  const [hoverDonateAll, setHoverDonateAll] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);
  
  const { hasPendingTransactions } = useGetPendingTransactions();
  const getTimeToPong = useGetTimeToPong();
  const pingAmount = useGetPingAmount();

  const [secondsLeft, setSecondsLeft] = useState();
  const [hasPing, setHasPing] = useState(false);
  const [transactionSessionId, setTransactionSessionId] = useState(null);

  useEffect(()=>{
    console.log(transactionSessionId);
  },[transactionSessionId])

  const distributeFunds = async (wallet) => {
    console.log('distributeFunds');
  
    let userAddress = new Address(wallet);
    const transaction = {
      value: 0,
      data: 'distribute_funds',
      receiver: contractAddress,
      gasLimit: '60000000',
      args: [userAddress],
    };
  
    const response = await sendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing distribute funds transaction',
        errorMessage: 'An error has occurred during distribute funds',
        successMessage: 'Distribute funds transaction successful',
      },
      redirectAfterSign: false,
    });
  
    console.log(response);
  };
  
  const handleDistributeFunds2 = () => {
    console.log('handleDistributeFunds');
    const wallet = 'erd19zh0k4s4q6856znc86jy8a2evsznmtgt6ndazqutt66qpqf2spgskzuft3';
  
    distributeFunds(wallet)
      .then(() => {
        // Handle success
        console.log('Funds distribution successful');
      })
      .catch((error) => {
        // Handle error
        console.error('Error occurred during funds distribution:', error);
      });
  };
  
  const handleDistributeFunds1 = async () => {

    try {

       const networkConfig = await apiNetworkProvider.getNetworkConfig();
       console.log(networkConfig.MinGasPrice);
       console.log(networkConfig.ChainID);
    
      //  let abiJson = await promises.readFile("./ping-pong.abi.json", { encoding: "utf8" });
       const response = await axios.get("https://testedwise-storage-bbc2484c230134-staging.s3.eu-north-1.amazonaws.com/public/ping-pong.abi.json");
       let abiRegistry = AbiRegistry.create(response.data);

      //  console.log(abiJson);
      //  let abiRegistry = AbiRegistry.create(abiObj);
       let scabi = new SmartContractAbi(abiRegistry);
       let existingContractAddress = new Address(contractAddress);
       let existingContract = new SmartContract({ address: existingContractAddress, abi: scabi });

       let legacyDelegationContract = new SmartContract({
           address: existingContractAddress,
           abi: scabi
       });

      //  const legacyDelegationAbi = AbiRegistry.create({
      //      name: "pleaseDistributeFunds",
      //      endpoints: ["distribute_funds"],
      //      types: ["Address"]
      //  });

      //  console.log(legacyDelegationAbi);

       const wallet = 'erd19zh0k4s4q6856znc86jy8a2evsznmtgt6ndazqutt66qpqf2spgskzuft3';
       let userAdr = new Address(wallet);
       let contAdr = new Address(contractAddress);
       const pleaseDistributeFunds = scabi.getEndpoint("distribute_funds");
       console.log(pleaseDistributeFunds)
       
       let tx1 = legacyDelegationContract.call({
        func: {name: "distribute_funds"},
        gasLimit: 5000000,
        args: [new AddressValue(userAdr)],
        chainID: "D"
       });

        tx1.setNonce(42);
        console.log(tx1);
        
       let query = legacyDelegationContract.createQuery({
           func: {name:"distribute_funds"},
           args: [new AddressValue(contAdr)]
       });
       console.log(query);
        
      let queryResponse = await apiNetworkProvider.queryContract(query);
      let { values } = new ResultsParser().parseQueryResponse(queryResponse, pleaseDistributeFunds);
      console.log(values[0].valueOf().toFixed(0));

      //  let queryResponse = await apiNetworkProvider.queryContract({address:contAdr,caller:contAdr, func:"distribute_funds", value:0, getEncodedArguments()});
      //  console.log(queryResponse);
      //  let { values } = new ResultsParser().parseQueryResponse(queryResponse, pleaseDistributeFunds);
      //  console.log(values[0].valueOf().toFixed(0));

      //    let interaction = legacyDelegationContract.methods.pleaseDistributeFunds([userAdr]);
      //    let query2 = interaction.check().buildQuery();
      //    console.log(query2);
           
    } catch (error) {
        console.log(error);
    }
  };

  const handleDistributeFund3 = async () => {

    try {
      let contractAddress2 = Address.fromString(contractAddress);
      console.log(contractAddress2)
      let userWallet = Address.fromString('erd19zh0k4s4q6856znc86jy8a2evsznmtgt6ndazqutt66qpqf2spgskzuft3');
      let contract = new SmartContract({ address: contractAddress2 });
      console.log(contract)
      let end = contract.getEndpoint("distribute_funds");
      console.log(end)
      let tx1 = contract.call({
          func: {name: "distribute_funds"},
          gasLimit: 5000000,
          args: [new AddressValue(userWallet)],
          chainID: "D"
      });
      
      tx1.setNonce(42);
      console.log(tx1);
           
    } catch (error) {
        console.log(error);
    }
  };


  const sendFunds = async (wallets) => {
    const addresses = wallets.map((address) => Address.fromBech32(address).hex()).join('');
  
    const distributeFundsTransaction = {
      value: 0,
      data: "distribute_funds@" + addresses,
      receiver: contractAddress,
      gasLimit: '60000000'
    };
  
    await refreshAccount();
  
    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: distributeFundsTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing distribute funds transaction',
        errorMessage: 'An error has occurred during funds distribution',
        successMessage: 'Funds distribution transaction successful'
      },
      redirectAfterSign: false
    });
  
    console.log(sessionId);
  
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };


  const handleDistributeFunds = async ()=>{
    let wallets = ['erd19zh0k4s4q6856znc86jy8a2evsznmtgt6ndazqutt66qpqf2spgskzuft3', 'erd1tyn9lhgg9c5f88q5u628guzsnd7hj8wexncmg2aeefwfvestelgsm9ndqf', 'erd1ywdpcad3fynzzeyqut59dl2atslud7t9e84yj23g4fhpe9l4ul3qfy8v4f']
    sendFunds(wallets);
  }
  


  
  

  return (
    <>
    <div className='footer text-center'>
        <a
          {...{
            target: '_blank'
          }}
          className='footertext'
          href='https://multiversx.com/'
        >
          Made with &nbsp; <FontAwesomeIcon
                  icon={faHeart}
                /> &nbsp; by Stefania Busuioc
        </a>
        <a className='build-tag'>Build v0.01 - License</a>
    </div>

    <Heartbeat></Heartbeat>
    {
      hoverDonateAll && (
      <>
        <div className='forall-container'>
            <FontAwesomeIcon className='icon-close-forall' icon={faClose} onClick={()=>{setHoverDonateAll(!hoverDonateAll)}}/>
          <div className='forall-container-title'>
            No need to make choices. 
          </div>
          <div className='forall-container-text'>
            In response to decision-making challenges, an alternative approach allows individuals to donate small percentages to multiple campaigns simultaneously.
          </div>
          <div className='forall-container-input'>
            <div className='circle-logo-egld'><img className='logo-egld' src='https://i.imgur.com/MFHKiPj.png'></img></div>
            <input className='input-donation-forall' type='number' placeholder='Amount'></input>
            <div className='input-donation-refresh-forall' ><FontAwesomeIcon icon={faRefresh}/></div>
            <div className='container-balance'>Balance: 0.4 EGLD</div>
          </div>

          {
            moreInfo ? (<>
            
                <div className='forall-container-qr'>
                  <div className='text-big-forall'>
                Through the implementation of a smart contract, a revolutionary system has been established where a percentage of the total funds is allocated each day to support all active campaigns. This innovative approach ensures equitable distribution and empowers a diverse range of initiatives by providing consistent financial assistance. By automating the process through a smart contract, transparency and efficiency are enhanced, fostering a fair and inclusive ecosystem for campaign funding.
                  </div>
                </div>
                <div className='moreinfo' onClick={()=>{setMoreInfo(!moreInfo)}}><FontAwesomeIcon icon={faChevronLeft}/> Back to QR</div>

            </>):(<>
            
                <div className='forall-container-qr'>
                  <img className='qr-all' src='https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png'/>
                </div>
                <div className='moreinfo' onClick={()=>{setMoreInfo(!moreInfo)}}><FontAwesomeIcon icon={faCircleQuestion}/> Need more info</div>

            </>)
          }


        </div>
      </>
      )
    }
    <FontAwesomeIcon border={true} className='arrowdown' onClick={()=>{setHoverDonateAll(!hoverDonateAll);handleDistributeFunds()}} icon={faHeart}/>
    <div className='arrowdown2'>
      <div className='label-recent-doners'><FontAwesomeIcon border={true} className='iconlabelsdoners' icon={faArrowAltCircleLeft}/>Recent Donators</div>
      <div className='label-recent-joiners'>Recent Users<FontAwesomeIcon border={true} className='iconlabelsdoners' icon={faArrowAltCircleRight}/></div>
    </div>
    <div className='bottom-scroll-container'>
      
      <div className='BR'>
        <div className='shadow-BR'></div>
        <div className='shadow-BR2'></div>
        <Marquee velocity={5} direction="rtl" scatterRandomly={false} resetAfterTries={1} onInit={()=>{}} onFinish={()=>{}}>
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
          <RecentDoner />
        </Marquee>
      </div>

      <div className='BL'>
        <div className='shadow-BL'></div>
        <div className='shadow-BL2'></div>
        <Marquee velocity={5} direction="ltr" scatterRandomly={false} resetAfterTries={1} onInit={()=>{}} onFinish={()=>{}}>
          <RecentUser />      
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
          <RecentUser />
        </Marquee>
      </div>

      </div>

      </>
  );
};
