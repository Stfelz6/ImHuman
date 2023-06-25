import React, { useEffect, useState } from 'react';
import '../styles/Heartbeat.css'; // Import CSS file for styling (create a separate CSS file)

const Heartbeat = () => {
  const [beat, setBeat] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBeat(prevBeat => !prevBeat);
    }, 4000); // Change the value here to adjust the heartbeat speed (in milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="heartbeat-container">
      <div className={`heartbeat-line ${beat ? 'heartbeat-animation' : ''}`} />
    </div>
  );
};

export default Heartbeat;
