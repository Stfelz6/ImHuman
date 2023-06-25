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
import Campaign from './Campaign';
import { faArrowAltCircleDown, faArrowDown, faArrowUp, faCalendar, faEarthEurope, faFilter, faHeadSideCoughSlash } from '@fortawesome/free-solid-svg-icons';


export default function Home(){
    const [dateDirection, setDateDirection] = useState(false);
    const [category, setCategory] = useState('all');

    const campaignDataArray = [
      {
          title: "Trisha's Village",
          description: "This is a sample campaign.",
          amountDonated: 0,
          amountTotal: 5000,
          image:'https://images.ctfassets.net/wvozpes63uc8/3r2HxoLc7yulCiFl5ugjRg/0d4c05c22e877bca637aa735ea8bdb32/charity-water-social-preview.jpeg',
          category:'education',
          date:'2/03/2021',
          daysLeft:17,
          noPeople:3
      },
      {
          title: "Giving water for the vulnerable",
          description: "Giving water to the most vulnerable.",
          amountDonated: 0,
          amountTotal: 10000,
          image:'https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/01/23/19/36-charity-afpgt.jpg',
          category:'education',
          date:'2/03/2023',
          daysLeft:33,
          noPeople:1.7
      },
      {
          title: "Campaign 3",
          description: "Yet another campaign.",
          amountDonated: 0,
          amountTotal: 7500,
          image:'https://www.canadahelps.org/media/Giving-Life-Blog_8-Unique-Charities-Supporting-People-Experiencing-Homelessness_Main-Image.png',
          category:'environment',
          date:'4/03/2022',
          daysLeft:33,
          noPeople:2.7
      },
      {
          title: "Campaign 4",
          description: "Sample campaign number four.",
          amountDonated: 0,
          amountTotal: 3000,
          image:'https://www.we-are-one.dk/wp-content/uploads/2019/03/Skjermbilde-2019-04-02-kl.-13.24.15-1024x530.png',
          category:'environment',
          date:'2/03/2022',
          daysLeft:17,
          noPeople:5.4
      },
      {
          title: "Campaign 5",
          description: "Fifth campaign description.",
          amountDonated: 0,
          amountTotal: 20000,
          image:'https://u4h.org.uk/wp-content/uploads/2020/12/PHOTO-2020-04-29-14-17-57.jpg',
          category:'education',
          date:'2/03/2022',
          daysLeft:28,
          noPeople:3.3
      },
      {
          title: "Campaign 6",
          description: "This is the sixth campaign.",
          amountDonated: 0,
          amountTotal: 15000,
          image:'https://offloadmedia.feverup.com/secretmanchester.com/wp-content/uploads/2018/11/17105211/RS12279_DSC03208-e1542216569150-1024x671.jpg',
          category:'environment',
          date:'2/03/2022',
          daysLeft:45,
          noPeople:3
      },
      {
          title: "Campaign 7",
          description: "Lucky number seven campaign.",
          amountDonated: 0,
          amountTotal: 4000,
          image:'https://astanatimes.com/wp-content/uploads/2020/07/DSC_1001-%D0%9A%D1%8B%D0%B4%D1%8B%D1%80%D0%B0%D0%BB%D0%B81.jpg',
          category:'environment',
          date:'2/03/2022',
          daysLeft:19,
          noPeople:9.3
      },
      {
          title: "Campaign 8",
          description: "Campaign number eight description.",
          amountDonated: 0,
          amountTotal: 9000,
          image:'https://faresharemidlands.org.uk/articlemanager/userfiles/images/iCare%20Pic%202.jpg',
          category:'education',
          date:'2/03/2022',
          daysLeft:22,
          noPeople:4.2
      },
      {
          title: "Campaign 9",
          description: "Ninth campaign for testing.",
          amountDonated: 0,
          amountTotal: 6000,
          image:'https://www.nspcc.org.uk/globalassets/blocks---please-dont-save-images-here/03.-support-us/partner-with-us/partners-in-business/25296-exp-2024-01.jpg?width=876&mode=crop&anchor=middlecenter',
          category:'education',
          date:'2/03/2022',
          daysLeft:66,
          noPeople:1.8
      },
      {
          title: "Campaign 10",
          description: "Tenth and final campaign.",
          amountDonated: 0,
          amountTotal: 12000,
          image:'https://miro.medium.com/v2/resize:fit:1400/1*7t2hbYeUqGyKWW6P-zZ-YA.jpeg',
          category:'environment',
          date:'2/03/2022',
          daysLeft:87,
          noPeople:1.4
      },
      {
          title: "Campaign 11",
          description: "Tenth and final campaign.",
          amountDonated: 0,
          amountTotal: 12000,
          image:'https://i.ytimg.com/vi/AmPbr1432c8/maxresdefault.jpg',
          category:'education',
          date:'2/03/2022',
          daysLeft:90,
          noPeople:20
      },
      {
          title: "Campaign 12",
          description: "Tenth and final campaign.",
          amountDonated: 0,
          amountTotal: 12000,
          image:'https://www.bbcchildreninneed.co.uk/wp-content/uploads/2020/03/Trevor-Rose-Pudsey-Nick-Knowles-and-Gaby-Blackman-at-the-CRS-for-the-launch-of-DIY-SOS-Big-Build-Special-for-Children-in-Need_small-1920x1280.jpg',
          category:'environment',
          date:'2/03/2022',
          daysLeft:90,
          noPeople:5.3
      }
  ];
  
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

    useEffect(()=>{
      setFilteredCampaigns( category === 'all' ? campaignDataArray : campaignDataArray.filter(campaign => campaign.category === category));
    },[category])

    useEffect(() => {
      let sortedCampaigns = [...campaignDataArray];
    
      if (category !== 'all') {
        sortedCampaigns = sortedCampaigns.filter(campaign => campaign.category === category);
      }
    
      if (dateDirection) {
        sortedCampaigns.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
    
      setFilteredCampaigns(sortedCampaigns);
    }, [category, dateDirection]);
    
  
    return(<>
      <div className='container-big'>
        <div className='container-filters'>
          <div className='container-categories'>
            <div className='filtru-allfields' onClick={()=>{setCategory("all")}}><FontAwesomeIcon className='icon-allfields' border={false} icon={faEarthEurope}/>All fields</div>
            <div className={`filtru-category ${category === 'education' ? 'topline' : ''}`} onClick={() => { setCategory('education') }}>Education</div>
            <div className={`filtru-category ${category === 'environment' ? 'topline' : ''}`} onClick={()=>{setCategory("environment")}}>Environment</div>
          </div>
          <div className='filtru-date' onClick={()=>{setDateDirection(!dateDirection)}}>Date posted
            {
              dateDirection ? (<><FontAwesomeIcon className='filter-icon' border={true} icon={faArrowDown}/></>):(<><FontAwesomeIcon className='filter-icon' border={true} icon={faArrowUp}/></>)
            }
          </div>
        </div>

        <div className='container-campaigns'>
        {
          filteredCampaigns.map((campaignData, index) => (
            <Campaign key={index} campaignData={campaignData} />
          ))
        }
        </div>

      </div>
    </>)

}