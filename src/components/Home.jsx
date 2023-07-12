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
import LoadingPage from './LoadingPage';
import { Auth } from "aws-amplify";
var AWS = require("aws-sdk");




export default function Home(){
    const [dateDirection, setDateDirection] = useState(false);
    const [category, setCategory] = useState('');
    const [loadPage, setLoadPage] = useState(true);
    const [activeMoreInfoIndex, setActiveMoreInfoIndex] = useState(null);
    
    useEffect(() => {
      const pathnameWithoutFirstSlash = location.pathname.substring(1);
      const capitalizedPathname = pathnameWithoutFirstSlash.charAt(0).toUpperCase() + pathnameWithoutFirstSlash.substring(1);
      document.title = `Home • Human`;
    }, [location]);

    const toggleMoreInfo = (index) => {
      if (index === activeMoreInfoIndex) {
        setActiveMoreInfoIndex(null);  // If the active index is clicked again, close the active more info
      } else {
        setActiveMoreInfoIndex(index); // Otherwise, set the active index to the clicked index
      }
    }


    useEffect(()=>{
      getCampaignFromDB();
      
      setTimeout(()=>{
        setLoadPage(false);
      },4000)
      
    },[])

  //   {
  //     title: "Campaign 12",
  //     description: " In a small town called Meadowville, there lived a young woman named Emily. Emily was a hardworking and kind-hearted individual who had fallen on tough times. She had recently lost her job and was struggling to make ends meetEmily lived in a modest apartment and was barely able to afford her basic necessities. She often skipped meals to save money and couldn't afford proper winter clothing to keep warm during the cold months. Despite her own challenges, she always maintained a positive attitude and never stopped believing that things would get better.One day, word about Emily's situation reached the community. The townspeople were deeply moved by her perseverance and decided to come together to help her. They organized a donation drive where they collected warm clothes, non-perishable food items, and essential supplies for Emily.The community's kindness didn't stop there. The local grocery store owner offered Emily a part-time job to help her regain financial stability. Additionally, a group of volunteers started a crowdfunding campaign to assist Emily in paying her rent and bills until she could find a new job.Overwhelmed with gratitude, Emily couldn't believe the generosity and support she received from her neighbors. Their collective efforts not only provided her with immediate relief but also restored her faith in humanity.With the support of the community, Emily was able to get back on her feet. She eventually found a new job and worked hard to rebuild her life. Inspired by the kindness she experienced, Emily became an active participant in community service initiatives, dedicated to helping others who were in need, just as she once was. This heartwarming story of compassion and solidarity reminds us of the power of community and the difference we can make in someone's life when we come together to lend a helping hand to those in need.",
  //     amountDonated: 0,
  //     amountTotal: 12000,
  //     image:'https://www.bbcchildreninneed.co.uk/wp-content/uploads/2020/03/Trevor-Rose-Pudsey-Nick-Knowles-and-Gaby-Blackman-at-the-CRS-for-the-launch-of-DIY-SOS-Big-Build-Special-for-Children-in-Need_small-1920x1280.jpg',
  //     category:'environment',
  //     date:'2/03/2022',
  //     daysLeft:90,
  //     noPeople:5.3
  // } 


    const [campaignDataArray, setCampaignDataArray] = useState([]);
    const getCampaignFromDB = async ()=>{
      try {
          let variables = {
            filter:{
            _deleted:{
              ne:true
            },
            isActive:{
              eq:'true'
            }
          },
              limit: 1000
          };

          let items = [];
          let data;
          do {
            data = await API.graphql({
              query: queries.listCampaigns,
              variables: variables,
              authMode: 'API_KEY' // Specify the authentication mode
            });            
            items = [...items, ...data.data.listCampaigns.items];
            variables.nextToken = data.data.listCampaigns.nextToken;
          } while (variables.nextToken);

          if (items.length === 0) {
              console.log("N-am chestii");
              return;
          }else{
            console.log("Campaign retrieved and added to capmaigns array.");
            console.log(items);
            setCampaignDataArray(items);
            setCategory('all')
          }

      } catch (error) {
          console.error("Error retrieving question:", error);
      }
  };
  
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
    {
      loadPage && (<LoadingPage></LoadingPage>)
    }
      <div className='container-big'>
        <div className='container-filters'>
          <div className='container-categories'>
            <div className='filtru-allfields' onClick={()=>{setCategory("all")}}><FontAwesomeIcon className='icon-allfields' border={false} icon={faEarthEurope}/>All fields</div>
            <div className={`filtru-category ${category === 'education' ? 'topline' : ''}`} onClick={() => { setCategory('education') }}>Education</div>
            <div className={`filtru-category ${category === 'environment' ? 'topline' : ''}`} onClick={() => {setCategory("environment")}}>Environment</div>
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
            <Campaign key={index} campaignData={campaignData} moreInfo={activeMoreInfoIndex === index}
            toggleMoreInfo={() => toggleMoreInfo(index)}/>
          ))
        }
        </div>

      </div>
    </>)

}