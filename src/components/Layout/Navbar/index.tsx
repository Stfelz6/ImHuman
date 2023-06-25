import React from 'react';
import { useEffect } from 'react';
import {
  faChartSimple,
  faFileSignature,
  faFlag,
  faPowerOff,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dAppName } from 'config';
import { routeNames } from 'routes';
import { ReactComponent as MultiversXLogo } from '../../../assets/img/multiversx.svg';
import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  OperaWalletLoginButton
} from '@multiversx/sdk-dapp/UI';
import { AuthRedirectWrapper } from 'components';
import { walletConnectV2ProjectId } from 'config';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { contractAddress } from 'config';
import awsconfig from '../../../aws-exports.js';
Amplify.configure(awsconfig);

export const Navbar = () => {
  const commonProps = {
    callbackRoute: routeNames.dashboard,
    nativeAuth: true // optional
  };

  const { address, account } = useGetAccountInfo();
  {/* eslint-disable */ }

  
  function getCurrentDateAsString() {
    const currentDate = new Date();
  
    // Get day, month, and year components
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const year = currentDate.getFullYear();
  
    // Pad single-digit day/month with leading zero if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    // Format the date as "dd/mm/yyyy"
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  
    return formattedDate;
  }


  const [HeroTag, setHerotag] = useState('');
  const fetchHeroTag = () =>{
    const endpoint = "https://gateway.multiversx.com/address/";
    const bech32Address = address;
    const path = "/username";

    fetch(`${endpoint}${bech32Address}${path}`)
      .then((response) => response.json())
      .then((data) => {
        // do something with the returned data
        // alert("Welcome, @" + data.data.username + "");
        if(data.data.username != ''){
          const FinalUsername = '@' + data.data.username
          setHerotag(FinalUsername)
        }
      })
      .catch((error) => {
        // handle any errors
      });

  }

  fetchHeroTag();

  const censoredAddress = address.substring(0, 5) + '...' + address.substring(address.length-5);
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  
  const putNewUserToCustomDB = async () => {
    const userDetails = {
      wallet:account.address,
      herotag:HeroTag,
      totalDonated:0,
      role:'User',
      date_joined: getCurrentDateAsString()
    };
    try {
      const newUser = await API.graphql({
        query: mutations.createUser,
        variables: { input: userDetails }
      });
      console.log("User has been created:", newUser);
    } catch (error) {
      console.log("Error creating user:", error);
    }
  }

  const createUserIfNotExists = async () => {
    try {
      const variables = {
        filter: {
          wallet: {
            eq: account.address
          }
        }
      };

      const response = await (API.graphql({ query: queries.listUsers, variables: variables }) as Promise<{ data: { listUsers: { items: any[] } } }>);
      console.log(response);
      if (response.data.listUsers.items.length === 0) {
        putNewUserToCustomDB();
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  
  useEffect(() => {
    // assuming "account" is the user object
    if (account) {
      createUserIfNotExists();
    }
  }, [account, HeroTag]); // you may want to add "account" as a dependency as well
  

  
  const CustomTooltipLogout = (props) => (
    <Tooltip {...props} disabled={false} className='tooltip-custom-1'>
      Log out
    </Tooltip>
  );
  
  const CustomTooltipAddress = (props) => (
    <Tooltip {...props} disabled={false} className='tooltip-custom-2'>
      {address}
    </Tooltip>
  );
  const [isInSearch, setIsInSearch] = useState(false);

  return (
    <>
    {
      isInSearch && (
      <div className='allscreen' onClick={()=>{setIsInSearch(false)}}></div>
      )
    }

    <BsNavbar className='px-4 py-3 navbar-pos'>
    <div className='containerNavAll'>
      <div className='logo'>#imhuman</div>
      <input className={`searchBar ${isInSearch ? 'searchBarAnim' : ''}`} onClick={() => setIsInSearch(true)} placeholder='Search for a campaign'></input>
      <FontAwesomeIcon className='iconSearch' icon={faSearch}/>
      <div className='start-campaign-btn'><FontAwesomeIcon className='flag-create-campaign' icon={faFlag}/>Start a campaign</div>
    </div>
      <div className='container-fluid d-flex flex-row-reverse justify-content-start'>
        {/* is logged in ? da / nu */}
        {isLoggedIn && (
          <>
            {/* <NavItem>
              <Link to={routeNames.statistics} className='nav-link'>
                <FontAwesomeIcon
                  icon={faChartSimple}
                  className='text-muted'
                />
              </Link>
            </NavItem>
            <NavItem>
              <Link to={routeNames.signMessage} className='nav-link'>
                <FontAwesomeIcon
                  icon={faFileSignature}
                  className='text-muted'
                />
              </Link>
            </NavItem> */}
            <NavItem>
              <OverlayTrigger placement="left" overlay={CustomTooltipLogout}>
                <button className='btn btn-link' onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon={faPowerOff}
                    className='custom-logout-btn'
                  />
                </button>
              </OverlayTrigger>
            </NavItem>
          </>
        )}
        
        {isLoggedIn ? (
          HeroTag ? (
                      <OverlayTrigger placement="bottom" delay={10} overlay={CustomTooltipAddress}>
                        <WalletConnectLoginButton
                          className='d-flex custom-connect-btn align-items-center navbar-brand mr-0'
                          loginButtonText={isLoggedIn ? (HeroTag ? HeroTag : censoredAddress ?? '') : 'xPortal Connect'}
                          disabled={isLoggedIn} // disable button if user is already logged in
                          {...commonProps}
                          {...(walletConnectV2ProjectId
                            ? {
                                isWalletConnectV2: true
                              }
                            : {})}
                        /> 
                      </OverlayTrigger>
                    ) : (
                        <WalletConnectLoginButton
                          className='d-flex custom-connect-btn align-items-center navbar-brand mr-0'
                          loginButtonText={isLoggedIn ? (HeroTag ? HeroTag : censoredAddress ?? '') : 'xPortal Connect'}
                          disabled={isLoggedIn} // disable button if user is already logged in
                          {...commonProps}
                          {...(walletConnectV2ProjectId
                            ? {
                                isWalletConnectV2: true
                              }
                            : {})}
                        /> 
                    )
        ) :         
        <WalletConnectLoginButton
          className='d-flex custom-connect-btn align-items-center navbar-brand mr-0'
          loginButtonText={'xPortal Connect'}
          {...commonProps}
          {...(walletConnectV2ProjectId
            ? {
                isWalletConnectV2: true
              }
            : {})}
        /> 
      }

      </div>
    </BsNavbar>
    </>
  );
};
