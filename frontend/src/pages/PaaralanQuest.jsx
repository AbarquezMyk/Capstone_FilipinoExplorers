import React from 'react';
import Background from '../assets/images/Paaralan Quest/Paaralan Quest BG.png';
import Logo from '../assets/images/Logo.png';

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
        paddingTop: '20px',
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

      {/* Title */}
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
        Paaralan Quest Game Screen
      </h1>

      {/* ✅ Combined Layout: Action Box + Right Sidebar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '40px',
          width: '100%',
        }}
      >
        {/* ⏳ Timer Bar (Left Side) */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '20px',
              height: '600px',
              backgroundColor: '#fff',
              borderRadius: '50px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              overflow: 'hidden',
              border: '2px solid #ccc',
            }}
          >
            <div
              style={{
                height: '80%',
                backgroundColor: '#fff',
                borderRadius: '50px',
              }}
            ></div>
          </div>
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
            width: '42%',
            height: '600px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            position: 'relative',
          }}
        >
          {/* Right Side (Now Left): Title + Story */}
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

          {/* Divider */}
          <div
            style={{
              width: '8px',
              backgroundColor: '#8B4513',
              borderRadius: '4px',
            }}
          />

          {/* Left Side (Now Right): Question + Choices */}
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

        {/* ✅ Right Sidebar */}
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
        <button
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '10px',
            backgroundColor: '#90EE90',
            border: '1px solid #006400',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          &#8592;
        </button>

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

        <button
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '10px',
            backgroundColor: '#90EE90',
            border: '1px solid #006400',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default PaaralanQuest;
