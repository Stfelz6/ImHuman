import React, { useEffect, useRef, useState } from 'react';
import '../styles/home.css';

const ContactMap = (props) => {
  
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    console.log('props.latitude',props.latitude)
    console.log('props.longitude',props.longitude)
    const position = {
      lat: props.latitude || 44.961983,
      lng: props.longitude || 25.545197,
    };

    if (map && marker) {
      // if map and marker instances already exist, just update the marker's position
      marker.setPosition(position);
    } else {
      const initMap = () => {
        const mapOptions = {
          center: position,
          zoom: 15,
        };

        const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
        const newMarker = new window.google.maps.Marker({
          position,
          map: newMap,
          icon: {
            url: 'https://i.imgur.com/NIiBKJQ.png',
          },
        });

        setMap(newMap);
        setMarker(newMarker);
      };

      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCk4xEr7qVuWHsDaonusdS67wAoWhAE-YY`; // Replace with your Google Maps API key
        script.async = true;
        script.defer = true;
        script.onload = initMap; // Call initMap after the API script has loaded
        document.body.appendChild(script);
      } else {
        // if Google Maps API script has already loaded, just call initMap
        initMap();
      }
    }
  }, [props.latitude, props.longitude]);

  return (
    <>
      <div className={`contact-map ${loading ? 'loading' : ''}`} ref={mapRef}>
        {loading && (
          <div id='loading-screen-main' className='loading-screen-map'>
            <svg className="spinner" viewBox="0 0 50 50">
              <circle id='path' className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
            </svg>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactMap;
