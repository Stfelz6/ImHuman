import * as React from 'react';
/* eslint-disable */ 
import { useEffect, useState } from 'react';
import { faArrowUp, faArrowDown, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { Link } from 'react-router-dom';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import moment from 'moment';
import { contractAddress } from 'config';
import { useGetTimeToPong, useGetPingAmount } from './helpers';
import { routeNames } from 'routes';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

export const Actions = (props) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const getTimeToPong = useGetTimeToPong();
  const pingAmount = useGetPingAmount();
  const { address, account } = useGetAccountInfo();
  
  // const AmountToSend = (parseInt(account.balance)/1000000000000000000).toPrecision(5);

  const [secondsLeft, setSecondsLeft] = useState<number>();
  const [hasPing, setHasPing] = useState<boolean>();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);
  const mount = () => {
    if (secondsLeft) {
      const interval = setInterval(() => {
        setSecondsLeft((existing) => {
          if (existing) {
            return existing - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  };

  useEffect(mount, [hasPing]);

  const setSecondsRemaining = async () => {
    const secondsRemaining = await getTimeToPong();

    switch (secondsRemaining) {
      case undefined:
      case null:
        setHasPing(true);
        break;
      case 0:
        setSecondsLeft(0);
        setHasPing(false);
        break;
      default: {
        setSecondsLeft(secondsRemaining);
        setHasPing(false);
        break;
      }
    }
  };

  useEffect(() => {
    setSecondsRemaining();
  }, [hasPendingTransactions]);

  const sendPingTransaction = async () => {
    console.log("-----------");
    console.log(props.inputValue.current)
    let copy = props.inputValue.current;
if (props.inputValue.current < 0) {
  const decimalCount = props.inputValue.current.toString().split('.')[1].length;
  const zeroesCount = 20 - decimalCount;
  copy = Math.abs(props.inputValue.current * Math.pow(10, zeroesCount)).toFixed(0);
} else {
  copy = (props.inputValue.current * 1000000000000000000).toFixed(0);
}
console.log(`props.inputValue:${props.inputValue.current}`);
console.log(`copy:${copy}`);
console.log(`account.balance:${account.balance}`);

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
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendPongTransaction = async () => {
    const pongTransaction = {
      value: '0',
      data: 'pong',
      receiver: contractAddress,
      gasLimit: '60000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: pongTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Pong transaction',
        errorMessage: 'An error has occured during Pong',
        successMessage: 'Pong transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const pongAllowed = secondsLeft === 0 && !hasPendingTransactions;
  const notAllowedClass = pongAllowed ? '' : 'not-allowed disabled';

  const timeRemaining = moment()
    .startOf('day')
    .seconds(secondsLeft || 0)
    .format('mm:ss');

  return (
    <>
      {props.locked === false ? (
        <>
          {hasPing !== undefined && (
            <>
              {/* {hasPing && !hasPendingTransactions ? ( */}
                <div className='action-btn custom-btn-heart mt-3 text-white' onClick={sendPingTransaction}>
                      <FontAwesomeIcon
                        className='custom-icon'
                        icon={faHeart as IconProp}
                      />
                </div>
              {/* // ) : (
              //    <>
              //      <div className='d-flex flex-column'>
              //        <div
              //          {...{
              //            className: `action-btn ${notAllowedClass}`,
              //            ...(pongAllowed ? { onClick: sendPongTransaction } : {})
              //          }}
              //        >
              //          <button className={`btn ${notAllowedClass}`}>
              //            <FontAwesomeIcon
              //              icon={faArrowDown}
              //              className='text-primary'
              //            />
              //          </button>
              //          <span className='text-white'>
              //            {pongAllowed ? (
              //              <a href='/' className='text-white text-decoration-none'>
              //                Pong
              //              </a>
              //            ) : (
              //              <>Pong</>
              //            )}
              //          </span>
              //        </div>
              //        {!pongAllowed && !hasPendingTransactions && (
              //          <span className='opacity-6 text-white'>
              //            {timeRemaining} until able to Pong
              //          </span>
              //        )}
              //      </div>
              //    </>
              //  )}  */}
            </>
          )}
        </>
      ):(
        <div className='action-btn custom-btn-lock mt-3 text-white'>
          <Link to={routeNames.unlock}>
            <FontAwesomeIcon
              className='custom-icon'
              icon={faLock as IconProp}
            />
          </Link>
        </div>
      )
      }
    </>
  );
};
