import React from 'react';
import {
  faChartSimple,
  faFileSignature,
  faPowerOff
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

import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { contractAddress } from 'config';

export const Navbar = () => {
  const commonProps = {
    callbackRoute: routeNames.dashboard,
    nativeAuth: true // optional
  };

  const { address, account } = useGetAccountInfo();
  {/* eslint-disable */ }

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

  return (
    <BsNavbar className='px-4 py-3 animation-heart navbar-pos'>
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
                        <div className='ceva'>
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
                        </div>
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
  );
};
