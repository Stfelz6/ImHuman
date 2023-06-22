import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/* eslint-disable */ 
import { useState } from 'react';
import styles from './../dashboard.module.scss';
import { Link } from 'react-router-dom';
import { Actions } from './Actions';
import { TopInfo } from './TopInfo';
import { routeNames } from 'routes';
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
import { Canvas, useFrame } from '@react-three/fiber';
import Scene from './Cylinder3d';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  Glitch
} from "@react-three/postprocessing";
import {
  Html,
  Icosahedron,
  useTexture,
  useCubeTexture,
  MeshDistortMaterial
} from "@react-three/drei";
import awsconfig from '../../../aws-exports';
Amplify.configure(awsconfig);

export const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const { address, account } = useGetAccountInfo();
  /* eslint-disable */ 
  const Balance = (parseInt(account.balance)/1000000000000000000).toPrecision(5);
  const location = useLocation();
  // console.log(6*10000000000000000000)
  let inputValue = useRef(0);

  function handleInputChange(event) {
    inputValue.current = event.target.value;
    console.log(inputValue.current)
  }


  useEffect(() => {
    const pathnameWithoutFirstSlash = location.pathname.substring(1);
    const capitalizedPathname = pathnameWithoutFirstSlash.charAt(0).toUpperCase() + pathnameWithoutFirstSlash.substring(1);
    document.title = `${capitalizedPathname} • Human`;
  }, [location]);

  let inputClicked = useRef(false);
  
  const handleButtonClick = () => {
    if(inputClicked.current === true){
      inputClicked.current = false;
    }else{
      inputClicked.current = true;
    }
  }
  return (
    /* eslint-disable */ 
<div className='d-flex flex-fill align-items-center container custom-container'>
<div className='row w-100'>
  <div className='col-12 col-md-12 col-lg-12 mx-auto'>
    <div className='card animation-load-card custom-card-main shadow-sm rounded p-4 border-0'>
      <div className='card-body d-flex text-center'>
        <div className='row w-100'>
          <div className='col-md-6 col-12'>
            <Canvas className="animation-heart">
                  <EffectComposer multisampling={0} disableNormalPass={true}>
                    <DepthOfField
                      focusDistance={0}
                      focalLength={0.4}
                      bokehScale={0}
                      height={480}
                    />
                    <Bloom
                      luminanceThreshold={0.1}
                      luminanceSmoothing={1}
                      height={100}
                      opacity={2}
                    />
                    <Noise opacity={0.2} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    {/* <Glitch
                      delay={new THREE.Vector2(6, 6)}
                    /> */}

                  </EffectComposer>
              <Scene inputClicked={inputClicked}/>
            </Canvas>
          </div>

          <div className='col-md-6 col-12'>
            {/* <h2 className='mb-3' data-testid='title'>
              {dAppName}
            </h2> */}
            <div className='row w-100 animation-q1'>
              <p className='mb-3 custom-quote-1'>
                <strong className='strongus'>
                The portal to the Metaverse.
                </strong>
                &nbsp;The home of your heart. Everything pure. A dream. A wish. A
                future. Accessible to anyone, anywhere in the world.
              </p>
            </div>

            {/*  eslint-disable */}
            <div className='row w-100 animation-q2'>
              <p className='mb-3 custom-quote-1'>
                <strong className='strongus'>
                Make a change.
                </strong>
                &nbsp;We are here for a reason. Be the one that is making the change and inspire others by deeds, not words
              </p>
            </div>
            
            <div className='row w-100 animation-q3'>
              <p className='mb-3 custom-quote-1'>
                <strong className='strongus'>
                It's harder to give, than to earn.
                </strong>
                &nbsp;Sometimes you have to make the hard decision.
              </p>
            </div>

            
            <div className='row mt-3 w-100 animation-btn'>
                    <div className='col-12 col-md-6'>
                      <input onChange={handleInputChange} onClick={handleButtonClick} inputMode='decimal' min='0' max={Balance} autoComplete='off' className='dapp-core-component__globals-module__input dapp-core-component__amountInput-module__amount-input custom-input-field' data-testid="firstAmount" id="inputAmount" name="firstAmount" placeholder="Amount" type="number" defaultValue={'Amount'} />
                    </div>
                      <img className='custom-icon-egld' src={`${process.env.PUBLIC_URL}/logo.png`} width="60" height="60" />
                    <div className='offset-md-1 col-md-5 col-12'>
                      <input inputMode='decimal' readOnly={true} autoComplete='off' className='dapp-core-component__globals-module__input dapp-core-component__amountInput-module__amount-input custom-balance-field' data-testid="firstAmount" id="firstAmount" name="firstAmount" placeholder={'Balance: '+Balance} type="number" defaultValue={'Balance: '+Balance} />
                    </div>
            </div>

            <div className='row w-100 mt-5 animation-btn'>
              <div className='col-6 col-md-10'>
                <a className='custom-hint'>Make the donation &nbsp; |</a>
              </div>
              <div className='col-6 col-md-2'>
                <Actions inputValue={inputValue} locked={false}/>
              </div>
            </div>
            
            <div className='row w-100 animation-btn'>
              {/* <div className={styles.transactions}>{children}</div> */}
              {/* <TopInfo /> */}
              &nbsp;
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
};