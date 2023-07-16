import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowDown, faClose, faDeleteLeft, faDroplet, faFileAlt, faFileArchive, faFileUpload, faHeart, faImage } from '@fortawesome/free-solid-svg-icons';
import '../styles/createCampaign.css';
import Heartbeat from 'components/Heartbeat';
import LoadingPage from './LoadingPage';
import * as mutations from '../graphql/mutations';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import { Auth } from "aws-amplify";
var AWS = require("aws-sdk");

const CreateCampaign = (props) => {
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
    setTimeout(() => {
      setLoadPage(false);
    }, 4000)
  }, [])

  const convertFromEgldToUSD = (e) => {
    let USD = e.target.value * 33;
    setFromXtoD(USD.toFixed(1));
  }


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
    // putFileInUserFolder(file);

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

  const createCampaignFunction = async () => {
    console.log('Am apasat pe create.')
    console.log(title) // adaugat
    console.log(description)
    console.log(beneficiaryWallet) // adaugat
    console.log("Bani necesitati:", fromXtoD) // adaugat
    console.log(bankAccount) // adaugat
    console.log(revolutAccount) // adaugat
    console.log(deadline) // adaugat
    console.log(beneficiaryName)
    console.log(phoneContact) // adaugat
    console.log(addressContact) // adaugat
    const campaignDetails = {
      wallet: beneficiaryWallet,
      title: title,
      description: description,
      amountNeeded: parseFloat(fromXtoD),
      amountCurrent: parseFloat(0),
      deadline: deadline, // To modify
      photo: '', // To modify
      docs: null,
      isActive: 'false',
      needsValidation: 'true',
      urgencyLevel: '8',
      userID: '3c947b2a-f92c-4436-a55a-c670316c8d65', // To modify
      category: 'Education', // To modify
      noPeople: '0',
      date: '2023-07-12T19:30:31.757Z', // To remove
      bankAccounts: bankAccount,
      revolutAccounts: revolutAccount,
      phoneContact: phoneContact,
      emailContact: emailContact,
      address: addressContact,
      latitude_longitude: latitudeLongitude,
      beneficiaryName: beneficiaryName,
      category:category
    };
    try {
      const newC = await API.graphql({
        query: mutations.createCampaign,
        variables: { input: campaignDetails }
      });
      console.log("Campaign has been created:", newC);
      await putFileInUserFolder(newC.data.createCampaign);
      //Update into db.
      try {
        // update answer in DB
        const updateCampaign = await API.graphql(graphqlOperation(mutations.updateCampaign, {
          input: {
            id: newC.data.createCampaign.id,
            _version: newC.data.createCampaign._version,
            photo: `https://iamhumanbucket.s3.eu-north-1.amazonaws.com/public/${newC.data.createCampaign.id}/png/${newC.data.createCampaign.id}.png`,
            docs: `https://iamhumanbucket.s3.eu-north-1.amazonaws.com/public/${newC.data.createCampaign.id}/pdf/${newC.data.createCampaign.id}.pdf`
          }
        }));
        console.log("Exam has been updated:", updateCampaign);
        announceFinish();
      } catch (error) {
        console.log("Error updating exam:", error);
      }

    } catch (error) {
      console.log("Error creating campaign:", error);
    }
  }

  const announceFinish = async () =>{
    setTitle('');
    setDescription('');
    setBeneficiaryWallet('');
    setCategory('')
    setBankAccount('');
    setRevolutAccount('');
    setDeadline('');
    setBeneficiaryName('');
    setPhoneContact('');
    setAddressContact('');
    setEmailContact('');
    setLatitudeLongitude('');
    props.setAlert({type:'createCampaign',title:'Campaign added!', body:'Your campaign was sent to an admin for verification.'});
  }


  return (
    <>
      {
        loadPage && (<LoadingPage></LoadingPage>)
      }
      <div className='create-campaign-container'>
        <div className='create-campaign-primary'>
          <div className="container-campaign-primary-title">
            <div className='campaign-primary-title'>Let's change together your life.</div>
          </div>
          <div className='campaign-primary-details'>
            <div className={`campaign-primary-details-title `} onClick={() => { setActiveDiv('title') }}>
              <input className={`camp-title ${activeDiv === 'title' ? 'active' : ''}`} placeholder="Campaign's title" value={title} onChange={(e) => {setTitle(e.target.value); console.log(e.target.value) }}></input>
            </div>
            <div className='campaign-primary-description-image'>
              <div className='campaign-primary-details-description' onClick={() => { setActiveDiv('description') }}>
                <textarea className={`camp-description ${activeDiv === 'description' ? 'active' : ''}`} placeholder='Description / Story'  value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
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
              <div className='campaign-primary-details-wallet' >
                <input className={`camp-wallet ${activeDiv === 'wallet' ? 'active' : ''}`} onClick={() => { setActiveDiv('wallet') }} placeholder="Beneficiary's wallet"  value={beneficiaryWallet} onChange={(e) => setBeneficiaryWallet(e.target.value)}></input>
                <input className={`camp-category ${activeDiv === 'category' ? 'active' : ''}`} onClick={() => { setActiveDiv('category') }} placeholder="Category"  value={category} onChange={(e) => setCategory(e.target.value)}></input>
              </div>
              <div className='campaign-primary-details-amountNeeded' onClick={() => { setActiveDiv('amountNeeded') }}>
                <input max={99999} className={`camp-amountNeeded ${activeDiv === 'amountNeeded' ? 'active' : ''}`} onKeyDown={(e) => { if (e.target.value.length >= 5 && e.key !== 'Backspace') { e.preventDefault() } }} onChange={(e) => { const value = Math.min(e.target.value, 99999); convertFromEgldToUSD(e) }} type='number' placeholder='Amount EGLD'></input>
                <div className='inDollars'>≈ {fromXtoD} $</div>
              </div>
            </div>

            <div className='campaign-bank-revolut-deadline-container'>

              <div className='campaign-bank-revolut-container'>
                <div className='campaign-bank-revolut'>
                  <input className={`camp-bank ${activeDiv === 'bank' ? 'active' : ''}`} onClick={() => { setActiveDiv('bank') }} placeholder='(Optional) Bank 1'  value={bankAccount} onChange={(e) => setBankAccount(e.target.value)}></input>
                  <input className={`camp-revolut ${activeDiv === 'revolut' ? 'active' : ''}`} onClick={() => { setActiveDiv('revolut') }} placeholder='(Optional) Revolut 2'  value={revolutAccount} onChange={(e) => setRevolutAccount(e.target.value)}></input>
                </div>
                <div className='campaign-bank-tos'>
                  <div className='camp-tos'>Optional: There is no need to fill the area. <br></br> Please note: By pressing the create button, you agree with all our terms & conditions.</div>
                </div>

              </div>

              <div className='campaign-deadline-done-container'>
                <div className='deadline-text-label'>Deadline</div>
                <div className='campaign-primary-details-deadline' onClick={() => { setActiveDiv('deadline') }}>
                  <input className={`camp-deadline ${activeDiv === 'deadline' ? 'active' : ''}`}  value={deadline} type='date' placeholder='Deadline' onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const formattedDate = selectedDate.toISOString();
                    setDeadline(formattedDate);
                    console.log(formattedDate);
                  }}></input>
                </div>
                <div className='campaign-primary-details-button-done-create' >
                  <div className={`btn-done`} onClick={createCampaignFunction}>Create</div>
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
              <input className={`camp-name ${activeDiv === 'name' ? 'active' : ''}`} onClick={() => { setActiveDiv('name') }} type='name' placeholder="Beneficiary's Name"  value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)}></input>
              <input className={`camp-phone ${activeDiv === 'phone' ? 'active' : ''}`} onClick={() => { setActiveDiv('phone') }} type='phone' placeholder='Phone'  value={phoneContact} onChange={(e) => setPhoneContact(e.target.value)}></input>
              <input className={`camp-address ${activeDiv === 'address' ? 'active' : ''}`} onClick={() => { setActiveDiv('address') }} type='address' placeholder='Address'  value={addressContact} onChange={(e) => setAddressContact(e.target.value)}></input>
              <input className={`camp-address ${activeDiv === 'email' ? 'active' : ''}`} onClick={() => { setActiveDiv('email') }} type='email' placeholder='Email'  value={emailContact} onChange={(e) => setEmailContact(e.target.value)}></input>
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

export default CreateCampaign;
