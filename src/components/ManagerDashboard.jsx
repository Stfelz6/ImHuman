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
import CampaignManager from './CampaignManager'; import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { PieChartOutline } from '@mui/icons-material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
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
      text: 'Overview users joined',
    },
  }
};


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];





// {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//   datasets: [
//     {
//       label: '# of People helped',
//       data: [132, 149, 23, 54, 25, 93],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };



export default function ManagerDashboard(props) {
  const [dateDirection, setDateDirection] = useState(false);
  const [category, setCategory] = useState('');
  const [loadPage, setLoadPage] = useState(true);
  const [activeMoreInfoIndex, setActiveMoreInfoIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Active');
  const [dataPie, setDataPie] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: '# of People helped',
        data: [132, 149, 23, 54, 25, 93],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })
  const [dataLine, setDataLineChart] = useState({
    labels,
    datasets: [
      {
        label: 'Active',
        data: labels.map(() => faker.number.int(10)),
        borderColor: 'rgb(215, 82, 255)',
        backgroundColor: 'rgb(215, 82, 255, 0.5)',
      },
      {
        label: 'Pending',
        data: labels.map(() => faker.number.int(10)),
        borderColor: 'rgb(24, 159, 250)',
        backgroundColor: 'rgb(24, 159, 250,0.5)',
      },
    ],
  });

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

  useEffect(() => {
    getQuestionFromDB();
    setTimeout(() => {
      setLoadPage(false);
    }, 4000)
  }, [])

  const getAllUsers = async () => {
    try {

      let variables = {
        limit: 1000
      };

      let items = [];
      let data;
      do {
        data = await API.graphql({
          query: queries.listUsers,
          variables: variables,
          authMode: 'API_KEY' // Specify the authentication mode
        });
        items = [...items, ...data.data.listUsers.items];
        variables.nextToken = data.data.listUsers.nextToken;
      } while (variables.nextToken);

      if (items.length === 0) {
        console.log("N-am chestii");
        return null;
      } else {
        console.log("Question retrieved and added to questions array.");
        return items;
      }

    } catch (error) {
      console.error("Error retrieving question:", error);
    }
  }


  const [campaignDataArray, setCampaignDataArray] = useState([]);
  const getQuestionFromDB = async () => {
    try {

      let variables = {
        filter: {
          _deleted: {
            ne: true
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
      } else {
        console.log("Question retrieved and added to questions array.");
        const monthsToCount = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        const monthsToCount2 = ['08','09','10','11', '12','01', '02', '03', '04', '05', '06', '07'];

        const itemCountByMonth = monthsToCount.map(month => {
          const count = items.reduce((acc, item) => {
            const itemMonth = item.createdAt.slice(5, 7);
            return itemMonth === month ? acc + 1 : acc;
          }, 0);

          return count;
        });

        setDataPie({
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: '# number of Campaigns',
              data: itemCountByMonth,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        })

        const users = await getAllUsers();
        console.log(users);
        const usersCountByMonth = monthsToCount2.map(month => {
          const count = users.reduce((acc, item) => {
            const itemMonth = item.createdAt.slice(5, 7);
            return itemMonth === month ? acc + 1 : acc;
          }, 0);

          return count;
        });

        setDataLineChart({
          labels: ['August','September','October','November','December','January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'No. users',
              data: usersCountByMonth,
              borderColor: 'rgb(24, 159, 250)',
              backgroundColor: 'rgb(24, 159, 250,0.5)',
            },
          ],
        })

        setCampaignDataArray(items);
        setCategory('all')
      }


    } catch (error) {
      console.error("Error retrieving question:", error);
    }
  };

  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

  useEffect(() => {
    setFilteredCampaigns(category === 'all' ? campaignDataArray : campaignDataArray.filter(campaign => campaign.category === category));
  }, [category])

  useEffect(() => {
    let sortedCampaigns = [...campaignDataArray];
    console.log(category, dateDirection, activeFilter)
    if (category !== 'all') {
      sortedCampaigns = sortedCampaigns.filter(campaign => campaign.category === category);
    }

    if (dateDirection) {
      sortedCampaigns.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (activeFilter === 'Active') {

      sortedCampaigns = sortedCampaigns.filter(campaign => campaign.isActive === "true");
    }

    if (activeFilter === 'Pending') {
      sortedCampaigns = sortedCampaigns.filter(campaign => campaign.isActive === "false");
    }

    setFilteredCampaigns(sortedCampaigns);
  }, [category, dateDirection, activeFilter]);


  return (<>
    {
      loadPage && (<LoadingPage></LoadingPage>)
    }
    {
      props.role === 'Admin' ? (
        <div className='container-big2'>
          <div className='container-big2-1'>
            <div className='container-big2-1MODIFIED2'>
              <div className='container-big2-1-FILTERS'>
                <div className={`filter-1 ${activeFilter === 'Active' ? 'active' : ''}`} onClick={() => { setActiveFilter('Active') }}>
                  Active
                </div>
                <div className={`filter-2 ${activeFilter === 'Pending' ? 'active' : ''}`} onClick={() => { setActiveFilter('Pending') }}>
                  Pending
                </div>
              </div>
              {/* <div className='container-campaigns-manager2SHADOW'></div> */}
              <div className='container-big2-1-SCROLLABLE'>
                <div className='container-campaigns-manager2'>
                  <div className={`container-campaign-full-empty ${activeMoreInfoIndex !== null ? 'filemode' : ''}`}>
                    <FontAwesomeIcon className='arrowupfullempty' icon={faArrowUp}></FontAwesomeIcon>
                  </div>
                  {
                    filteredCampaigns.map((campaignData, index) => (
                      <CampaignManager key={index} activeFilter={activeFilter} setActiveFilter={setActiveFilter} filteredCampaigns={filteredCampaigns} setFilteredCampaigns={setFilteredCampaigns} campaignData={campaignData} campaignDataArray={campaignDataArray} setCampaignDataArray={setCampaignDataArray} alert={props.alert} setAlert={props.setAlert} moreInfo={activeMoreInfoIndex === index}
                        toggleMoreInfo={() => toggleMoreInfo(index)} />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='container-big2-3'>
            <div className='container-chart'>
              <Line options={options} data={dataLine} />
            </div>
            <div className='container-chart2'>
              <Pie data={dataPie} />
            </div>
          </div>
        </div>
      ) : (<div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', left: '0px', top: '0px', fontSize: '35px', color: 'red' }}>You are not an Admin.</div>)
    }
  </>)

}