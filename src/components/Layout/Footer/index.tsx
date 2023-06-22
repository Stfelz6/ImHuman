import React from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
/* eslint-disable */
export const Footer = () => {
  return (
    <footer className='text-center mt-2 mb-3'>
      <div>
        <a
          {...{
            target: '_blank'
          }}
          className='d-flex text-white text-footer align-items-center'
          href='https://multiversx.com/'
        >
          Made with &nbsp; <FontAwesomeIcon
                  icon={faHeart}
                /> &nbsp; by Stefania Busuioc
        </a>
        <a className='build-tag'>Build v0.01 - just for conquest</a>
      </div>
    </footer>
  );
};
