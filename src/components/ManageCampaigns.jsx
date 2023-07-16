import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowDown, faClose, faDeleteLeft, faDroplet, faFileAlt, faFileArchive, faFileUpload, faHeart, faImage, faUserTie } from '@fortawesome/free-solid-svg-icons';
import '../styles/createCampaign.css';
import '../styles/ManageCampaigns.css';
import Heartbeat from 'components/Heartbeat';
import LoadingPage from './LoadingPage';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import { Auth } from "aws-amplify";
var AWS = require("aws-sdk");
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import CampaignManager from './CampaignManager';

const ManageCampaigns = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [loadPage, setLoadPage] = useState(true);
  const [activeDiv, setActiveDiv] = useState(null);
  const [fromXtoD, setFromXtoD] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);

  const [fileDoc, setFileDoc] = useState(null)
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileDoc(file);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getCampaignsFromDB();
    setTimeout(() => {
      setLoadPage(false);
    }, 4000)
  }, [])

  const convertFromEgldToUSD = (e) => {
    let USD = e.target.value * 33;
    setFromXtoD(USD.toFixed(1));
  }

  const [fromDtoX, setFromDtoX] = useState(0);


  const handleDivClick2 = () => {
    // Open the file dialog when the div is clicked
    document.getElementById('fileInput').click();
  };

  const [file, setFile] = useState(null)
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      // Set the image source to the dropped/selected file
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
    setFile(file);

  };

  const handleDragOver2 = (event) => {
    event.preventDefault();
  };

  const handleDrop2 = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      // Set the image source to the dropped file
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
    setFile(file);

  };


  const putFileInUserFolder = async (campaign) => {
    if (file) {
      try {
        const fileExtension = file.type === 'application/pdf' ? 'pdf' : 'png';
        await Storage.put(`${campaign.id}/${fileExtension}/${campaign.id}.${fileExtension}`, file, {
          contentType: file.type
        });
        console.log('File uploaded successfully');
      } catch (err) {
        console.error(err);
      }
    }
    if (fileDoc) {
      try {
        const fileExtension = fileDoc.type === 'application/pdf' ? 'pdf' : 'png';
        await Storage.put(`${campaign.id}/${fileExtension}/${campaign.id}.${fileExtension}`, fileDoc, {
          contentType: fileDoc.type
        });
        console.log('File uploaded successfully');
      } catch (err) {
        console.error(err);
      }
    }

  };

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [beneficiaryWallet, setBeneficiaryWallet] = useState('')
  const [category, setCategory] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [revolutAccount, setRevolutAccount] = useState('')
  const [deadline, setDeadline] = useState('')
  const [beneficiaryName, setBeneficiaryName] = useState('')
  const [phoneContact, setPhoneContact] = useState('')
  const [addressContact, setAddressContact] = useState('')
  const [emailContact, setEmailContact] = useState('')
  const [latitudeLongitude, setLatitudeLongitude] = useState('')
  const { address, account } = useGetAccountInfo();
  const [campaignDataArray, setCampaignDataArray] = useState([]);

  const updateCampaignFunction = async () => {
    try {
      await putFileInUserFolder(selectedCampaign);
  
      const updateCampaign = await API.graphql(graphqlOperation(mutations.updateCampaign, {
        input: {
          id: selectedCampaign.id,
          _version: selectedCampaign._version,
          title: title,
          description: description,
          wallet: beneficiaryWallet,
          category: category,
          bankAccounts: bankAccount,
          revolutAccounts: revolutAccount,
          deadline: deadline,
          amountNeeded: parseFloat(fromXtoD),
          beneficiaryName: beneficiaryName,
          phoneContact: phoneContact,
          emailContact: emailContact,
          address: addressContact,
          latitude_longitude: latitudeLongitude
        }
      }));
      console.log("Campaign has been updated:", updateCampaign);
      const updatedCampaign = updateCampaign.data.updateCampaign;
  
      if (campaignDataArray) {
        // Update campaignDataArray with the updated campaign
        const updatedCampaignDataArray = campaignDataArray.map((campaign) =>
          campaign.id === updatedCampaign.id ? updatedCampaign : campaign
        );
        setCampaignDataArray(updatedCampaignDataArray);
      }
  
      props.setAlert({
        type: 'updateUserCampaign',
        title: 'Campaign updated!',
        body: 'You successfully updated the campaign.',
      });
    } catch (error) {
      console.log("Error updating campaign:", error);
    }
  };

  const getCampaignsFromDB = async () => {
    console.log('account.address',account.address)
    try {
      let variables = {
        filter: {
          _deleted: {
            ne: true
          },
          wallet: {
            eq: account.address
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
        console.log("Campaign retrieved and added to capmaigns array.");
        console.log(items);
        setCampaignDataArray(items);
        console.log("Account: ", account.address)
      }

    } catch (error) {
      console.error("Error retrieving question:", error);
    }
  };

  function abbreviateAmount(amount) {
    if (amount >= 1000 && amount < 1000000) {
      const abbreviatedAmount = (amount / 1000).toFixed(1);
      return `${abbreviatedAmount}K`;
    } else if (amount >= 1000000) {
      const abbreviatedAmount = (amount / 1000000).toFixed(1);
      return `${abbreviatedAmount}M`;
    }
    return amount;
  }
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const selectareEdit = (campaignData) => {
    setSelectedCampaign(campaignData);
    console.log(campaignData);
    setTitle(campaignData.title);
    setDescription(campaignData.description);
    setBeneficiaryWallet(campaignData.wallet);
    setCategory(campaignData.category);
    setBankAccount(campaignData.bankAccounts);
    setRevolutAccount(campaignData.revolutAccounts);
    setDeadline(campaignData.deadline);
    setBeneficiaryName(campaignData.beneficiaryName);
    setPhoneContact(campaignData.phoneContact)
    setEmailContact(campaignData.emailContact);
    setAddressContact(campaignData.address);
    setFromDtoX((campaignData.amountNeeded / 33).toFixed(1));
    setFromXtoD((campaignData.amountNeeded).toFixed(1))
    setLatitudeLongitude(campaignData.latitude_longitude);
    setImageSrc(campaignData.photo);
  };

  const getCampaign = async (ID) => {
    console.log(ID);
    try {
      let variables = {
        filter: {
          id:{
            eq: ID
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
        console.log("Campaign retrieved and added to capmaigns array.");
        console.log(items)
        return items
      }

    } catch (error) {
      console.error("Error retrieving question:", error);
    }
  };

  const deteleCampaign = async () => {
    console.log('Am apasat sa fie stearsa');
    const updatedCampaign = await getCampaign(selectedCampaign.id);
    console.log(updatedCampaign);
    try {
      // Delete campaign from DB
      const deleteCampaign = await API.graphql(graphqlOperation(mutations.deleteCampaign, {
        input: {
          id: selectedCampaign.id,
          _version: selectedCampaign._version,
        },
      }));
      console.log("Campaign has been deleted:", deleteCampaign);
  
      // Check if campaignDataArray exists and is not null
      if(campaignDataArray){
        // Remove deleted campaign from campaignDataArray
        let updatedCampaignDataArray = campaignDataArray.filter(
          (campaign) => campaign.id !== selectedCampaign.id
        );
  
        // If updatedCampaignDataArray is empty, assign it as null or []
        if(updatedCampaignDataArray.length === 0){
          updatedCampaignDataArray = null; // or [] as per your needs
        }
  
        setCampaignDataArray(updatedCampaignDataArray);
      }

      emptyFields();
  
      props.setAlert({
        type: 'deleteUserCampaign',
        title: 'Campaign deleted!',
        body: 'You successfully deleted the campaign.',
      });
  
    } catch (error) {
      console.log("Error deleting campaign:", error);
    }
  };

  const emptyFields = () =>{
    setSelectedCampaign('');
    setTitle('');
    setDescription('');
    setBeneficiaryWallet('');
    setCategory('');
    setBankAccount('');
    setRevolutAccount('');
    setDeadline('');
    setBeneficiaryName('');
    setPhoneContact('');
    setEmailContact('');
    setAddressContact('');
    setFromDtoX('');
    setFromXtoD(0);
    setLatitudeLongitude('');
    setImageSrc('');
    setSelectedFile(null);
    setActiveDiv(null);

  }
  

  return (
    <>

      {
        loadPage && (<LoadingPage></LoadingPage>)
      }
      <div className='create-campaign-container2'>

        <div className='container-big2-1MODIFIED1'>
          <div className='container-big2-1-FILTERS'>
            <div style={{ display: 'flex', position: 'relative', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }} >
              Choose the campaign you want to update
            </div>
          </div>
          {/* <div className='container-campaigns-manager2SHADOW'></div> */}
          <div className='container-big2-1-SCROLLABLE'>
            <div className='container-campaigns-manager2'>
              {/* <div className={`container-campaign-full-empty ${activeMoreInfoIndex !== null ? 'filemode':''}`}>
                        <FontAwesomeIcon className='arrowupfullempty' icon={faArrowUp}></FontAwesomeIcon>
                    </div> */}
              {
              campaignDataArray && 
              campaignDataArray.map((campaignData, index) => (
                <div className='container-campaign2' key={index}>
                  <div
                    className='container-campaign-1'
                    style={{ backgroundImage: `url(${campaignData.photo})` }}
                    onClick={() => selectareEdit(campaignData)}
                  >
                    <div className='info-tag'>
                      {Math.ceil((Date.parse(campaignData.deadline) - Date.now()) / (1000 * 60 * 60 * 24))} days left
                    </div>
                    <div className='info-tag-people'>
                      {abbreviateAmount(campaignData.noPeople)}
                      <FontAwesomeIcon className='icon-info-tag-people' icon={faUserTie} />
                    </div>
                  </div>
                  <div className='container-campaign-2'>
                    <div className='donate-bar'>
                      <div className='bar-title2'>{campaignData.title}</div>
                    </div>
                  </div>
                </div>
              ))
              
              }
            </div>
          </div>
        </div>
        <div className='create-campaign-primary'>
          <div className="container-campaign-primary-title">
            <div className='campaign-primary-title'>Let's change together your life.</div>
          </div>
          <div className='campaign-primary-details'>
            <div className={`campaign-primary-details-title `} onClick={() => { setActiveDiv('title') }}>
              <input className={`camp-title ${activeDiv === 'title' ? 'active' : ''}`} placeholder="Campaign's title" value={title} onChange={(e) => { setTitle(e.target.value); console.log(e.target.value) }}></input>
            </div>
            <div className='campaign-primary-description-image'>
              <div className='campaign-primary-details-description' onClick={() => { setActiveDiv('description') }}>
                <textarea className={`camp-description ${activeDiv === 'description' ? 'active' : ''}`} placeholder='Description / Story' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>

              <div
                className='campaign-primary-details-image'
                onClick={handleDivClick2}
                onDragOver={handleDragOver2}
                onDrop={handleDrop2}
              >
                {imageSrc && <img className='camp-image' src={imageSrc} alt="Camp Image" />}
                <input
                  type='file'
                  id='fileInput'
                  accept='image/png'
                  style={{ display: 'none' }}
                  onChange={handleFileChange2}
                />
                {
                  imageSrc ? (<>
                    <FontAwesomeIcon onClick={() => { setImageSrc('') }} className='file-delete-icon2' icon={faClose}></FontAwesomeIcon>
                  </>) : (<>
                    <div className='text-create-drop-file2'>
                      <FontAwesomeIcon className='file-upload-icon2' icon={faImage}></FontAwesomeIcon>
                      <div className='label-file-name2'>Click or drop <br></br> an image / thumbnail</div>
                    </div>
                  </>)
                }
              </div>

            </div>

            <div className='campaign-wallet-amount-container'>
              <div className='campaign-primary-details-wallet' onClick={() => { setActiveDiv('wallet') }}>
                <input className={`camp-wallet ${activeDiv === 'wallet' ? 'active' : ''}`} placeholder="Beneficiary's wallet" value={beneficiaryWallet} onChange={(e) => setBeneficiaryWallet(e.target.value)}></input>
                <input className={`camp-category ${activeDiv === 'category' ? 'active' : ''}`} onClick={() => { setActiveDiv('category') }} placeholder="Category"  value={category} onChange={(e) => setCategory(e.target.value)}></input>
              </div>
              <div className='campaign-primary-details-amountNeeded' onClick={() => { setActiveDiv('amountNeeded') }}>
                <input max={99999} className={`camp-amountNeeded ${activeDiv === 'amountNeeded' ? 'active' : ''}`} onKeyDown={(e) => { if (e.target.value.length >= 5 && e.key !== 'Backspace') { e.preventDefault() } }} value={fromDtoX} onChange={(e) => { const value = Math.min(e.target.value, 99999); setFromDtoX((e.target.value)); setFromXtoD((e.target.value * 33).toFixed(1)) }} type='number' placeholder='Amount EGLD'></input>
                <div className='inDollars'>≈ {fromXtoD} $</div>
              </div>
            </div>

            <div className='campaign-bank-revolut-deadline-container'>

              <div className='campaign-bank-revolut-container'>
                <div className='campaign-bank-revolut'>
                  <input className={`camp-bank ${activeDiv === 'bank' ? 'active' : ''}`} onClick={() => { setActiveDiv('bank') }} placeholder='(Optional) Bank 1' value={bankAccount} onChange={(e) => setBankAccount(e.target.value)}></input>
                  <input className={`camp-revolut ${activeDiv === 'revolut' ? 'active' : ''}`} onClick={() => { setActiveDiv('revolut') }} placeholder='(Optional) Revolut 2' value={revolutAccount} onChange={(e) => setRevolutAccount(e.target.value)}></input>
                </div>
                <div className='campaign-bank-tos'>
                  <div className='camp-tos'>Optional: There is no need to fill the area. <br></br> Please note: By pressing the create button, you agree with all our terms & conditions.</div>
                </div>

              </div>

              <div className='campaign-deadline-done-container'>
                <div className='deadline-text-label'>Deadline</div>
                <div className='campaign-primary-details-deadline' onClick={() => { setActiveDiv('deadline') }}>
                  <input className={`camp-deadline ${activeDiv === 'deadline' ? 'active' : ''}`} type='date' placeholder='Deadline' value={deadline ? deadline.slice(0, 10) : ''} onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const formattedDate = selectedDate.toISOString();
                    setDeadline(formattedDate);
                    console.log(formattedDate);
                  }}></input>
                </div>
                <div className='campaign-primary-details-button-done' >
                  <div className={`btn-delete`} onClick={deteleCampaign}>Delete</div>
                  <div className={`btn-done1`} onClick={updateCampaignFunction}>Update</div>
                </div>
              </div>

            </div>

          </div>
        </div>
        <div className='create-campaign-secondary'>
          <div className='create-campaign-secondary-1'>

            <div className='create-campaign-secondary-title'>
              <div className='campaign-secondary-title'>
                Contact form
              </div>
            </div>

            <div className='create-campaign-secondary-phone'>
              <input className={`camp-name ${activeDiv === 'name' ? 'active' : ''}`} onClick={() => { setActiveDiv('name') }} type='name' placeholder="Beneficiary's Name" value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)}></input>
              <input className={`camp-phone ${activeDiv === 'phone' ? 'active' : ''}`} onClick={() => { setActiveDiv('phone') }} type='phone' placeholder='Phone' value={phoneContact} onChange={(e) => setPhoneContact(e.target.value)}></input>
              <input className={`camp-address ${activeDiv === 'address' ? 'active' : ''}`} onClick={() => { setActiveDiv('address') }} type='address' placeholder='Address' value={addressContact} onChange={(e) => setAddressContact(e.target.value)}></input>
              <input className={`camp-address ${activeDiv === 'email' ? 'active' : ''}`} onClick={() => { setActiveDiv('email') }} type='email' placeholder='Email' value={emailContact} onChange={(e) => setEmailContact(e.target.value)}></input>
              <input className={`camp-coords ${activeDiv === 'coords' ? 'active' : ''}`} onClick={() => { setActiveDiv('coords') }} placeholder='(Optional*) Latitude / Longitude' value={latitudeLongitude} onChange={(e) => setLatitudeLongitude(e.target.value)}></input>
              <div className='campaign-secondary-done'>
                *Please upload below any relevant documents to sustain you case.
              </div>
            </div>

          </div>
          <div
            className='create-campaign-secondary-2'
            onDragOver={handleDragOver}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current.click()}
          >
            {selectedFile ? (
              <>
                <div className='text-create-drop-file'>
                  <FontAwesomeIcon className='file-upload-icon' icon={faFileUpload}></FontAwesomeIcon>
                  <div className='label-file-name'>{selectedFile.name}</div>
                </div>
              </>
            ) : (
              <>

                <div className='text-create-drop-file'>
                  <FontAwesomeIcon className='file-upload-icon' icon={faFileUpload}></FontAwesomeIcon>
                  <div className='label-file-name'>Click or drop <br></br> *Relevant documents (.pdf)</div>
                </div>
              </>
            )}
            <input
              type='file'
              accept='.pdf'
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
          </div>
        </div>
      </div>

    </>
  );
};

export default ManageCampaigns;
