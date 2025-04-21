import React from 'react';
import Background from '../assets/images/Paaralan Quest/Paaralan Quest BG.png';
import Logo from '../assets/images/Logo.png';
import StickImage from '../assets/images/Buttons and Other/Timer Log.png';
import LeftArrow from '../assets/images/Buttons and Other/button prev.png';
import RightArrow from '../assets/images/Buttons and Other/button next.png';

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
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '100px',
        position: 'relative',
      }}
    >
      {/* Logo in upper-left corner */}
      <img
        src={Logo}
        alt="Game Logo"
        style={{
          position: 'absolute',
          top: '20px',
          left: '30px',
          width: '160px',
        }}
      />

      {/* ✅ Combined Layout: Stick + Action Box + Sidebar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          width: '90%',
          margin: '0 auto',
        }}
      >
        {/* 🪵 Timer Stick Image with Oval Bar */}
        <div style={{ position: 'relative', paddingLeft: '0px', marginRight: '-25px' }}>
          <img
            src={StickImage}
            alt="Timer Stick"
            style={{
              width: 'auto',
              height: '150px',
              transform: 'rotate(90deg)',
              objectFit: 'contain',
              display: 'block'
            }}
          />
          {/* Oval Bar */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '50px',
              height: '320px',
              backgroundColor: 'lightgreen',
              borderRadius: '50px',
              opacity: 1,
            }}
          ></div>
        </div>

        {/* 🎯 Action Box */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            border: '4px solid #8B4513',
            backgroundColor: '#f5e5c0',
            borderRadius: '12px',
            padding: '20px',
            height: '600px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            minWidth: '600px',
          }}
        >
          {/* Title + Story */}
          <div style={{ flex: 1, paddingRight: '20px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#5D4037' }}>
              Title of the Story
            </h2>
            <div
              style={{
                backgroundColor: '#fff8e1',
                padding: '15px',
                borderRadius: '8px',
                height: '100%',
                overflowY: 'auto',
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#333',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>

          <div
            style={{
              width: '8px',
              backgroundColor: '#8B4513',
              borderRadius: '4px',
            }}
          />

          {/* Question + Choices */}
          <div style={{ flex: 1, paddingLeft: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, marginBottom: '20px' }}>
              <h2 style={{ fontSize: '22px', color: '#333' }}>Question goes here</h2>
            </div>
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Choice A', 'Choice B', 'Choice C', 'Choice D'].map((choice, index) => (
                <button
                  key={index}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '2px solid #ccc',
                    backgroundColor: '#fff',
                    fontSize: '16px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 🧮 Right Sidebar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '600px',
            width: '220px',
          }}
        >
          <div
            style={{
              backgroundColor: '#f5e5c0',
              border: '4px solid #8B4513',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Score: 0
          </div>

          <div
            style={{
              backgroundColor: '#8B4513',
              borderRadius: '10px',
              padding: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#f5e5c0',
                  color: '#000',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            <button
              style={{
                width: '100%',
                padding: '10px 20px',
                borderRadius: '30px',
                backgroundColor: '#007BFF',
                border: '1px solid #003f8a',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              HINT
            </button>

            <button
              style={{
                width: '100%',
                padding: '10px 20px',
                borderRadius: '10px',
                backgroundColor: '#FFD700',
                border: '2px solid #D4AC0D',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>

      {/* ⬅️ CHECK ANSWER ➡️ - Bottom Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          marginTop: '40px',
        }}
      >
        <img
          src={LeftArrow}
          alt="Previous"
          style={{ width: '60px', height: '60px', cursor: 'pointer' }}
        />

        <button
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            backgroundColor: '#FFD700',
            border: '2px solid #D4AC0D',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          CHECK ANSWER
        </button>

        <img
          src={RightArrow}
          alt="Next"
          style={{ width: '60px', height: '60px', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default PaaralanQuest;
