import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  OperaWalletLoginButton
} from '@multiversx/sdk-dapp/UI';
import { AuthRedirectWrapper } from 'components';
import { walletConnectV2ProjectId } from 'config';
import { routeNames } from 'routes';
import logoMultiversx from '../assets/img/GlowingX.png';

const UnlockPage = () => {
  const commonProps = {
    callbackRoute: routeNames.home,
    nativeAuth: true // optional
  };
  const location = useLocation();
  /* eslint-disable */ 
  useEffect(() => {
    const pathnameWithoutFirstSlash = location.pathname.substring(1);
    const capitalizedPathname = pathnameWithoutFirstSlash.charAt(0).toUpperCase() + pathnameWithoutFirstSlash.substring(1);
    document.title = `${capitalizedPathname} • Human`;
  }, [location]);

  return (
    <div className='home d-flex flex-fill align-items-center'>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='card animation-load-card-login custom-card-login-vars my-4 text-center'>
          <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
            <Link to={routeNames.home} className='nav-link'>
              <img className='login-methods' src={logoMultiversx} />
            </Link>
            <br></br>

            <ExtensionLoginButton
              className='custom-button'
              loginButtonText='MultiversX DeFi Wallet'
              {...commonProps}
            />

            <OperaWalletLoginButton
              className='custom-button'
              loginButtonText='Opera Crypto Wallet - Beta'
              {...commonProps}
            />

            <WebWalletLoginButton
              className='custom-button'
              loginButtonText='MultiversX Web Wallet'
              {...commonProps}
            />
            <LedgerLoginButton
              loginButtonText='Ledger'
              className='test-class_name custom-button disabled'
              {...commonProps}
            />
            <WalletConnectLoginButton
              className='custom-button'
              loginButtonText='xPortal App'
              {...commonProps}
              {...(walletConnectV2ProjectId
                ? {
                    isWalletConnectV2: true
                  }
                : {})}
            />
            <p className='mt-4 hint-login'>
              Please pick a login method from the ones listed above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Unlock = () => (
  <AuthRedirectWrapper>
    <UnlockPage />
  </AuthRedirectWrapper>
);
