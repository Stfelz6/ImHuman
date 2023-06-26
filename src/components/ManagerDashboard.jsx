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
import '../styles/ManagerDashboard.css'
import Campaign from './Campaign';
import { faArrowAltCircleDown, faArrowDown, faArrowUp, faCalendar, faEarthEurope, faFilter, faHeadSideCoughSlash } from '@fortawesome/free-solid-svg-icons';
import LoadingPage from './LoadingPage';
import CampaignManager from './CampaignManager';import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import { faker } from '@faker-js/faker';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Overview Campaigns',
      },
    }
  };
  
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Fulfilled',
        data: labels.map(() => faker.number.int()),
        borderColor: 'rgb(215, 82, 255)',
        backgroundColor: 'rgb(215, 82, 255, 0.5)',
      },
      {
        label: 'Pending',
        data: labels.map(() => faker.number.int()),
        borderColor: 'rgb(24, 159, 250)',
        backgroundColor: 'rgb(24, 159, 250,0.5)',
      },
    ],
  };


export default function ManagerDashboard(){
    const [dateDirection, setDateDirection] = useState(false);
    const [category, setCategory] = useState('all');
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
      setTimeout(()=>{
        setLoadPage(false);
      },4000)
    },[])

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
          description: " In a small town called Meadowville, there lived a young woman named Emily. Emily was a hardworking and kind-hearted individual who had fallen on tough times. She had recently lost her job and was struggling to make ends meetEmily lived in a modest apartment and was barely able to afford her basic necessities. She often skipped meals to save money and couldn't afford proper winter clothing to keep warm during the cold months. Despite her own challenges, she always maintained a positive attitude and never stopped believing that things would get better.One day, word about Emily's situation reached the community. The townspeople were deeply moved by her perseverance and decided to come together to help her. They organized a donation drive where they collected warm clothes, non-perishable food items, and essential supplies for Emily.The community's kindness didn't stop there. The local grocery store owner offered Emily a part-time job to help her regain financial stability. Additionally, a group of volunteers started a crowdfunding campaign to assist Emily in paying her rent and bills until she could find a new job.Overwhelmed with gratitude, Emily couldn't believe the generosity and support she received from her neighbors. Their collective efforts not only provided her with immediate relief but also restored her faith in humanity.With the support of the community, Emily was able to get back on her feet. She eventually found a new job and worked hard to rebuild her life. Inspired by the kindness she experienced, Emily became an active participant in community service initiatives, dedicated to helping others who were in need, just as she once was. This heartwarming story of compassion and solidarity reminds us of the power of community and the difference we can make in someone's life when we come together to lend a helping hand to those in need.",
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
          description: " In a small town called Meadowville, there lived a young woman named Emily. Emily was a hardworking and kind-hearted individual who had fallen on tough times. She had recently lost her job and was struggling to make ends meetEmily lived in a modest apartment and was barely able to afford her basic necessities. She often skipped meals to save money and couldn't afford proper winter clothing to keep warm during the cold months. Despite her own challenges, she always maintained a positive attitude and never stopped believing that things would get better.One day, word about Emily's situation reached the community. The townspeople were deeply moved by her perseverance and decided to come together to help her. They organized a donation drive where they collected warm clothes, non-perishable food items, and essential supplies for Emily.The community's kindness didn't stop there. The local grocery store owner offered Emily a part-time job to help her regain financial stability. Additionally, a group of volunteers started a crowdfunding campaign to assist Emily in paying her rent and bills until she could find a new job.Overwhelmed with gratitude, Emily couldn't believe the generosity and support she received from her neighbors. Their collective efforts not only provided her with immediate relief but also restored her faith in humanity.With the support of the community, Emily was able to get back on her feet. She eventually found a new job and worked hard to rebuild her life. Inspired by the kindness she experienced, Emily became an active participant in community service initiatives, dedicated to helping others who were in need, just as she once was. This heartwarming story of compassion and solidarity reminds us of the power of community and the difference we can make in someone's life when we come together to lend a helping hand to those in need.",
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
          description: " In a small town called Meadowville, there lived a young woman named Emily. Emily was a hardworking and kind-hearted individual who had fallen on tough times. She had recently lost her job and was struggling to make ends meetEmily lived in a modest apartment and was barely able to afford her basic necessities. She often skipped meals to save money and couldn't afford proper winter clothing to keep warm during the cold months. Despite her own challenges, she always maintained a positive attitude and never stopped believing that things would get better.One day, word about Emily's situation reached the community. The townspeople were deeply moved by her perseverance and decided to come together to help her. They organized a donation drive where they collected warm clothes, non-perishable food items, and essential supplies for Emily.The community's kindness didn't stop there. The local grocery store owner offered Emily a part-time job to help her regain financial stability. Additionally, a group of volunteers started a crowdfunding campaign to assist Emily in paying her rent and bills until she could find a new job.Overwhelmed with gratitude, Emily couldn't believe the generosity and support she received from her neighbors. Their collective efforts not only provided her with immediate relief but also restored her faith in humanity.With the support of the community, Emily was able to get back on her feet. She eventually found a new job and worked hard to rebuild her life. Inspired by the kindness she experienced, Emily became an active participant in community service initiatives, dedicated to helping others who were in need, just as she once was. This heartwarming story of compassion and solidarity reminds us of the power of community and the difference we can make in someone's life when we come together to lend a helping hand to those in need.",
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
          description: " In a small town called Meadowville, there lived a young woman named Emily. Emily was a hardworking and kind-hearted individual who had fallen on tough times. She had recently lost her job and was struggling to make ends meetEmily lived in a modest apartment and was barely able to afford her basic necessities. She often skipped meals to save money and couldn't afford proper winter clothing to keep warm during the cold months. Despite her own challenges, she always maintained a positive attitude and never stopped believing that things would get better.One day, word about Emily's situation reached the community. The townspeople were deeply moved by her perseverance and decided to come together to help her. They organized a donation drive where they collected warm clothes, non-perishable food items, and essential supplies for Emily.The community's kindness didn't stop there. The local grocery store owner offered Emily a part-time job to help her regain financial stability. Additionally, a group of volunteers started a crowdfunding campaign to assist Emily in paying her rent and bills until she could find a new job.Overwhelmed with gratitude, Emily couldn't believe the generosity and support she received from her neighbors. Their collective efforts not only provided her with immediate relief but also restored her faith in humanity.With the support of the community, Emily was able to get back on her feet. She eventually found a new job and worked hard to rebuild her life. Inspired by the kindness she experienced, Emily became an active participant in community service initiatives, dedicated to helping others who were in need, just as she once was. This heartwarming story of compassion and solidarity reminds us of the power of community and the difference we can make in someone's life when we come together to lend a helping hand to those in need.",
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
          description: " In a small town called Meadowville, there lived a young woman named Emily. Emily was a hardworking and kind-hearted individual who had fallen on tough times. She had recently lost her job and was struggling to make ends meetEmily lived in a modest apartment and was barely able to afford her basic necessities. She often skipped meals to save money and couldn't afford proper winter clothing to keep warm during the cold months. Despite her own challenges, she always maintained a positive attitude and never stopped believing that things would get better.One day, word about Emily's situation reached the community. The townspeople were deeply moved by her perseverance and decided to come together to help her. They organized a donation drive where they collected warm clothes, non-perishable food items, and essential supplies for Emily.The community's kindness didn't stop there. The local grocery store owner offered Emily a part-time job to help her regain financial stability. Additionally, a group of volunteers started a crowdfunding campaign to assist Emily in paying her rent and bills until she could find a new job.Overwhelmed with gratitude, Emily couldn't believe the generosity and support she received from her neighbors. Their collective efforts not only provided her with immediate relief but also restored her faith in humanity.With the support of the community, Emily was able to get back on her feet. She eventually found a new job and worked hard to rebuild her life. Inspired by the kindness she experienced, Emily became an active participant in community service initiatives, dedicated to helping others who were in need, just as she once was. This heartwarming story of compassion and solidarity reminds us of the power of community and the difference we can make in someone's life when we come together to lend a helping hand to those in need.",
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
    {
      loadPage && (<LoadingPage></LoadingPage>)
    }
      <div className='container-big2'>
        <div className='container-chart'>
        <Line options={options} data={data} />
        </div>
        <div className='container-campaigns-manager2SHADOW'></div>
        <div className='container-campaigns-manager2'>
            <div className={`container-campaign-full-empty ${activeMoreInfoIndex !== null ? 'filemode':''}`}>
                <FontAwesomeIcon className='arrowupfullempty' icon={faArrowUp}></FontAwesomeIcon>
            </div>
            {
              filteredCampaigns.map((campaignData, index) => (
                <CampaignManager key={index} campaignData={campaignData} moreInfo={activeMoreInfoIndex === index}
                toggleMoreInfo={() => toggleMoreInfo(index)}/>
              ))
            }
        </div>

      </div>
    </>)

}