import React from 'react';
/* eslint-disable */ 
import { AuthenticatedRoutesWrapper } from '@multiversx/sdk-dapp/wrappers';
import { useLocation } from 'react-router-dom';
import { routes, routeNames } from 'routes';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { Canvas, useFrame } from '@react-three/fiber';
import CanvasBackground from './CanvasBackground';
import styles from './../dashboard.module.scss';
import { Link } from 'react-router-dom';
import videoSource from '../../../assets/videos/baloons.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/img/logo.png';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { contractAddress } from 'config';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { useRef } from 'react';
import { useThree } from '@react-three/fiber';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { search } = useLocation();
  return (
    <>
    <div style={{ position: 'relative', zIndex: 0  }}>
      <div style={{ position: 'relative'}}>
      <div className='bg-img d-flex flex-column flex-fill wrapper'>
        <Navbar/>
        <main className='d-flex flex-column flex-grow-1'>
          <AuthenticatedRoutesWrapper
            routes={routes}
            unlockRoute={`${routeNames.unlock}${search}`}
          >
            {children}
          </AuthenticatedRoutesWrapper>
        </main>
        <Footer />
      </div>
      </div>
      <CanvasBackground />
    </div>
    </>
  );
};
