import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowDown, faDroplet, faFileAlt, faFileArchive, faFileUpload, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/createCampaign.css';
import Heartbeat from 'components/Heartbeat';

const CreateCampaign = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

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

  return (
    <>
      <div className='create-campaign-container'>
        <div className='create-campaign-primary'>
            <div className='container-campaign-primary-title'>
                <div className='campaign-primary-title'>The change of your life begins now.</div>
            </div>
            <div className='campaign-primary-details'></div>
        </div>
        <div className='create-campaign-secondary'>
          <div className='create-campaign-secondary-1'>
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
