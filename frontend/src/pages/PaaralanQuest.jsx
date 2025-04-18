import React from 'react';
import Background from '../assets/images/Paaralan Quest/Paaralan Quest BG.png'; // ✅ import with correct path

const PaaralanQuest = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* All your game UI will go inside here */}
      <h1 style={{ color: 'white', textAlign: 'center', paddingTop: '40px' }}>
        Paaralan Quest Game Screen
      </h1>
    </div>
  );
};

export default PaaralanQuest;
