import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './images/Logo.png';
import HomeImage from './images/Homepage/Home 1st rec.png';
import GuessTheWordImage from './images/Homepage/Guess The Word .png';
import ParkeQuestImage from './images/Homepage/Parke Quest (2).png';
import PaaralanQuestImage from './images/Homepage/Paaralan Quest Icon.png';
import MemoryGameImage from './images/Homepage/Memory Game Icon.png';
import PaaralanQuest from './PaaralanQuest';
import PaaralanQuestGroup from './PaaralanQuestGroup';

  const Homepage = () => {
  const navigate = useNavigate();
  const [showPQForm, setShowPQForm] = React.useState(false);
  const [playerName, setPlayerName] = React.useState("");


  const games = [
    { color: '#F3668A', image: GuessTheWordImage, route: '/guesstheword' },
    { color: '#4092AD', image: ParkeQuestImage, route: '/parkequest' },
    { color: '#06D7A0', image: PaaralanQuestImage, route: '/paaralanquest', isPaaralanQuest: true },
    { color: '#FAB869', image: MemoryGameImage, route: '/memorygame' },
  ];

  return (
    <div id="home">
      {/* Header Section */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 40px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #ddd',
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: '600',
      }}>
        <img
          src={Logo}
          alt="Filipino Explorers Logo"
          style={{ width: '150px' }}
        />
        <nav style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <ul style={{
            display: 'inline-flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            alignItems: 'center'
          }}>
            <li style={{ margin: '0 20px', fontSize: '18px' }}>
              <a href="#home" style={{ textDecoration: 'none', color: '#000' }}>Home</a>
            </li>
            <li style={{ margin: '0 20px', fontSize: '18px' }}>
              <a href="#about" style={{ textDecoration: 'none', color: '#000' }}>About Us</a>
            </li>
            <li style={{ margin: '0 20px', fontSize: '18px' }}>
              <a href="#games" style={{ textDecoration: 'none', color: '#000' }}>Games</a>
            </li>
            <li style={{ margin: '0 20px', fontSize: '18px' }}>
              <button
                onClick={() => navigate('/signup')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#000',
                  fontSize: '18px',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                Sign Up
              </button>
            </li>
            <li style={{ margin: '0 20px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#06D7A0',
                  color: '#000',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Log In
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px',
        backgroundColor: '#118AB2',
        color: '#000'
      }}>
        <div style={{ flex: 1, textAlign: 'center', paddingRight: '20px' }}>
          <h1 style={{ fontSize: '50px', fontWeight: '700', marginBottom: '20px', fontFamily: "'Poppins', sans-serif" }}>
            “Unlock Your Child’s Love for Filipino!”
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '20px' }}>
            A fun, gamified way to explore the Filipino language for Grade 5 learners.
          </p>
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#FAB900',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => alert('Explore Now!')}
          >
            Start Exploring !
          </button>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <img
            src={HomeImage}
            alt="Home Illustration"
            style={{ width: '100%', maxWidth: '400px', borderRadius: '10px', marginLeft: '200px' }}
          />
        </div>
      </div>

      {/* About Us Section */}
      <div id="about" style={{ padding: '40px', backgroundColor: '#ffffff' }}>
        <h2 style={{
          fontSize: '46px',
          fontWeight: '700',
          color: '#073A4D',
          fontFamily: "'Fredoka', sans-serif",
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          Why Filipino Explorers?
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {[
            '🧠 Curriculum-Aligned',
            '🎯 Gamified Experience',
            '📈 Track Progress',
            '👨‍🏫 Easy Class Setup',
            '🧰 Teacher Tools',
            '🏆 Leaderboard',
          ].map((text, index) => (
            <div key={index} style={{
              backgroundColor: '#F88D6B',
              color: '#000',
              borderRadius: '20px',
              padding: '20px',
              width: 'calc(33% - 20px)',
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: '500',
              fontFamily: "'Fredoka', sans-serif"
            }}>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Game Section */}
      <div id="games" style={{ padding: '40px', backgroundColor: '#ffffff' }}>
        <h2 style={{
          fontSize: '46px',
          fontWeight: '700',
          color: '#073A4D',
          fontFamily: "'Fredoka', sans-serif",
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          Explore Our Games
        </h2>
        <div style={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          gap: '20px',
          overflowX: 'auto',
        }}>
          {games.map((game, index) => (
            <div
              key={index}
                              onClick={() => {
                  if (game.isPaaralanQuest) {
                    setShowPQForm(true);
                  } else {
                    navigate(game.route);
                  }
                }}

              style={{
                backgroundColor: game.color,
                borderRadius: '20px',
                padding: '20px',
                width: 'calc(25% - 20px)',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <img
                src={game.image}
                alt={`Game ${index + 1}`}
                style={{ width: '100%', maxWidth: '200px', borderRadius: '10px' }}
              />
            </div>
          ))
          
          
          
          }
        </div>
      </div>
            {showPQForm && (
  <div style={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }}>
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      width: '300px',
      textAlign: 'center',
      fontFamily: "'Fredoka', sans-serif"
    }}>
      <h3 style={{ marginBottom: '15px' }}>Enter your name:</h3>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Your Name"
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}
      />
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={() => {
            if (!playerName.trim()) {
              alert("Please enter your name");
              return;
            }
            navigate('/paaralanquest-individual', { state: { playerName } });
          }}
          style={{
            padding: '10px 15px',
            backgroundColor: '#06D7A0',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Individual
        </button>
        <button
          onClick={() => {
            if (!playerName.trim()) {
              alert("Please enter your name");
              return;
            }
            navigate('/paaralanquest-group', { state: { playerName } });
          }}
          style={{
            padding: '10px 15px',
            backgroundColor: '#FAB869',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Group
        </button>
      </div>
      <button
        onClick={() => setShowPQForm(false)}
        style={{
          marginTop: '15px',
          background: 'none',
          border: 'none',
          color: '#999',
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}

      {/* Join Us Section */}
      <div id="join" style={{ padding: '40px', backgroundColor: '#ffffff', textAlign: 'center' }}>
        <h2 style={{
          fontSize: '46px',
          fontWeight: '700',
          color: '#073A4D',
          fontFamily: "'Fredoka', sans-serif",
          marginBottom: '20px'
        }}>
          Ready to Begin?
        </h2>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '20px',
            backgroundColor: '#FAB900',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => alert('Sign Up for Free!')}
        >
          Sign Up for Free
        </button>
      </div>

      {/* Footer Section */}
      <footer style={{
        backgroundColor: '#073A4D',
        color: '#ffffff',
        textAlign: 'center',
        padding: '20px',
        fontFamily: "'Fredoka', sans-serif"
      }}>
        © 2025 FilipinoExplorers | Aralin mo, Laruin mo!
      </footer>
    </div>
  );
};

export default Homepage;
