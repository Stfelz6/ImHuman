import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowDown, faClose, faDeleteLeft, faDroplet, faFileAlt, faFileArchive, faFileUpload, faHeart, faImage } from '@fortawesome/free-solid-svg-icons';
import '../styles/createCampaign.css';
import Heartbeat from 'components/Heartbeat';
import LoadingPage from './LoadingPage';

const CreateCampaign = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [loadPage, setLoadPage] = useState(true);
  const [activeDiv, setActiveDiv] = useState(null);
  const [fromXtoD, setFromXtoD] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  useEffect(()=>{
    setTimeout(()=>{
      setLoadPage(false);
    },4000)
  },[])

  const convertFromEgldToUSD = (e) =>{
    let USD = e.target.value * 33;
    setFromXtoD(USD.toFixed(1));
  }


  const handleDivClick2 = () => {
    // Open the file dialog when the div is clicked
    document.getElementById('fileInput').click();
  };

  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      // Set the image source to the dropped/selected file
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
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
  };


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
              <div className={`campaign-primary-details-title `} onClick={()=>{setActiveDiv('title')}}>
                <input className={`camp-title ${activeDiv === 'title' ? 'active' : ''}`} placeholder="Campaign's title"></input>
              </div>
              <div className='campaign-primary-description-image'>
                <div className='campaign-primary-details-description' onClick={()=>{setActiveDiv('description')}}>
                  <textarea className={`camp-description ${activeDiv === 'description' ? 'active' : ''}`}  placeholder='Description / Story'></textarea>
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
                    <FontAwesomeIcon onClick={()=>{setImageSrc('')}} className='file-delete-icon2' icon={faClose}></FontAwesomeIcon>
                  </>):(<>
                    <div className='text-create-drop-file2'>
                        <FontAwesomeIcon className='file-upload-icon2' icon={faImage}></FontAwesomeIcon>
                        <div className='label-file-name2'>Click or drop <br></br> an image / thumbnail</div>
                    </div>
                    </>)
                }
                </div>

              </div>

              <div className='campaign-wallet-amount-container'>
                <div className='campaign-primary-details-wallet' onClick={()=>{setActiveDiv('wallet')}}>
                  <input className={`camp-wallet ${activeDiv === 'wallet' ? 'active' : ''}`}  placeholder="Beneficiary's wallet"></input>
                </div>
                <div className='campaign-primary-details-amountNeeded' onClick={()=>{setActiveDiv('amountNeeded')}}>
                  <input max={99999} className={`camp-amountNeeded ${activeDiv === 'amountNeeded' ? 'active' : ''}`} onKeyDown={(e) => {if (e.target.value.length >= 5 && e.key !== 'Backspace') {e.preventDefault()}}} onChange={(e)=>{const value = Math.min(e.target.value, 99999);convertFromEgldToUSD(e)}}  type='number' placeholder='Amount EGLD'></input>
                  <div className='inDollars'>≈ {fromXtoD} $</div>
                </div>
              </div>
              
              <div className='campaign-bank-revolut-deadline-container'>
                
              <div className='campaign-bank-revolut-container'>
                <div className='campaign-bank-revolut'>
                  <input className={`camp-bank ${activeDiv === 'bank' ? 'active' : ''}`} onClick={()=>{setActiveDiv('bank')}} placeholder='(Optional) Bank 1'></input>
                  <input className={`camp-revolut ${activeDiv === 'revolut' ? 'active' : ''}`} onClick={()=>{setActiveDiv('revolut')}} placeholder='(Optional) Revolut 2'></input>
                </div>
                <div className='campaign-bank-tos'>
                  <div className='camp-tos'>Optional: There is no need to fill the area. <br></br> Please note: By pressing the create button, you agree with all our terms & conditions.</div>
                </div>

              </div>

                <div className='campaign-deadline-done-container'>
                  <div className='deadline-text-label'>Deadline</div>
                  <div className='campaign-primary-details-deadline' onClick={()=>{setActiveDiv('deadline')}}>
                    <input className={`camp-deadline ${activeDiv === 'deadline' ? 'active' : ''}`}  type='date' placeholder='Deadline'></input>
                  </div>
                  <div className='campaign-primary-details-button-done' >
                    <div className={`btn-done`}>Create</div>
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
                <input className={`camp-name ${activeDiv === 'name' ? 'active' : ''}`} onClick={()=>{setActiveDiv('name')}}  type='name' placeholder="Beneficiary's Name"></input>
                <input className={`camp-phone ${activeDiv === 'phone' ? 'active' : ''}`} onClick={()=>{setActiveDiv('phone')}}  type='phone' placeholder='Phone'></input>
                <input className={`camp-address ${activeDiv === 'address' ? 'active' : ''}`} onClick={()=>{setActiveDiv('address')}}  type='address' placeholder='Address'></input>
                <input className={`camp-coords ${activeDiv === 'coords' ? 'active' : ''}`} onClick={()=>{setActiveDiv('coords')}}  placeholder='(Optional*) Latitude / Longitude'></input>
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
