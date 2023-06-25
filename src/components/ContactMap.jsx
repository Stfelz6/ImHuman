import React, { useEffect, useRef, useState } from 'react';
import '../styles/home.css';

const ContactMap = () => {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: { lat: 44.961983, lng: 25.545197 }, // Replace with your desired coordinates
        zoom: 15, // Adjust the zoom level as needed
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      new window.google.maps.Marker({
        position: { lat: 44.961983, lng: 25.545197 }, // Replace with your desired coordinates
        map,
        icon: {
          url: 'https://i.imgur.com/NIiBKJQ.png',
        },
      });
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCk4xEr7qVuWHsDaonusdS67wAoWhAE-YY`;
    script.async = true;
    script.defer = true;
    script.onload = initMap; // Call initMap after the API script has loaded
    document.body.appendChild(script);
    setLoading(false);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
    {
        loading ? 
        (<>
            <div id='loading-screen-main' className='loading-screen-map'>  
              <svg className="spinner" viewBox="0 0 50 50">
                <circle id='path' className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
              </svg>
            </div>
        </>):
        (<>
            <div className="contact-map" ref={mapRef} />
        </>)
    }
    </>
  );
};

export default ContactMap;
