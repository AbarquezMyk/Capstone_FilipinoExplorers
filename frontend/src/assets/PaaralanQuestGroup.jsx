import React, { useState } from 'react';
import Background from '../assets/images/Paaralan Quest/Paaralan Quest BG.png';
import Logo from '../assets/images/Logo.png';
import StickImage from '../assets/images/Buttons and Other/Timer Log.png';
import LeftArrow from '../assets/images/Buttons and Other/button prev.png';
import RightArrow from '../assets/images/Buttons and Other/button next.png';
import { useLocation } from 'react-router-dom';
const players = ['Juan', 'Maria', 'Leo'];

const storyData = [
  {
    story: "Si Juan ay isang masipag na estudyante na laging tumutulong sa kanyang mga kaklase.",
    question: "Ano ang ipinapakita ni Juan sa kanyang mga kaklase?",
    choices: ["Katamaran", "Kasipagan", "Kawalang-galang", "Pag-aalinlangan"],
    correctAnswer: 1,
  },
  {
    story: "Isang araw, nagtanim ng buto ng mangga si Ana at araw-araw niya itong dinilig.",
    question: "Ano ang aral sa kwento ni Ana?",
    choices: ["Ang prutas ay masarap", "Ang tubig ay mahalaga", "Ang tiyaga ay may magandang bunga", "Ang araw ay mainit"],
    correctAnswer: 2,
  },
  // Add more...
];

const PaaralanQuestGroup = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState(Array(players.length).fill(null));
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const current = storyData[currentIndex];
  const location = useLocation();
const playerName = location.state?.playerName || "Player";
  const handleVote = (playerIndex, choiceIndex) => {
    if (submitted) return; // Lock voting after submit
    const updatedVotes = [...votes];
    updatedVotes[playerIndex] = choiceIndex;
    setVotes(updatedVotes);
  };

  const getVoteCounts = () => {
    const counts = Array(current.choices.length).fill(0);
    votes.forEach((vote) => {
      if (vote !== null) counts[vote]++;
    });
    return counts;
  };

  const getMostVotedIndex = () => {
    const counts = getVoteCounts();
    const max = Math.max(...counts);
    return counts.indexOf(max);
  };

  const handleSubmit = () => {
    const mostVoted = getMostVotedIndex();
    if (mostVoted === current.correctAnswer) {
      setScore(score + 1);
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < storyData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setVotes(Array(players.length).fill(null));
      setSubmitted(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setVotes(Array(players.length).fill(null));
      setSubmitted(false);
    }
  };

  const voteCounts = getVoteCounts();
  const mostVoted = getMostVotedIndex();

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        paddingTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src={Logo} alt="Logo" style={{ position: 'absolute', top: 20, left: 30, width: 160 }} />

      <div style={{ display: 'flex', gap: 20, width: '90%', alignItems: 'center' }}>
        <div style={{ position: 'relative', marginRight: '-25px' }}>
          <img src={StickImage} alt="Timer" style={{ height: '150px', transform: 'rotate(90deg)' }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50px', height: '320px',
            backgroundColor: 'lightgreen', borderRadius: '50px'
          }} />
        </div>

        <div style={{
          border: '4px solid #8B4513', backgroundColor: '#f5e5c0',
          borderRadius: 12, padding: 20, height: 600, minWidth: 600,
          display: 'flex', flexDirection: 'row'
        }}>
          <div style={{ flex: 1, paddingRight: 20 }}>
            <h2 style={{ color: '#5D4037' }}>Kuwento #{currentIndex + 1}</h2>
            <div style={{ backgroundColor: '#fff8e1', padding: 15, borderRadius: 8, height: '100%', overflowY: 'auto' }}>
              {current.story}
            </div>
          </div>

          <div style={{ width: 8, backgroundColor: '#8B4513' }} />

          <div style={{ flex: 1, paddingLeft: 20 }}>
            <h2>{current.question}</h2>
            <div style={{ marginTop: 10 }}>
              {current.choices.map((choice, i) => (
                <div key={i} style={{
                  border: '2px solid #ccc', borderRadius: 8, marginBottom: 10,
                  backgroundColor: submitted && i === mostVoted ? '#c8e6c9' : '#fff',
                  padding: 10
                }}>
                  <strong>{choice}</strong>
                  <div style={{ fontSize: 12, color: '#333' }}>
                   Welcome, {playerName}!
                    Votes: {voteCounts[i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 600 }}>
          <div style={{ backgroundColor: '#f5e5c0', border: '4px solid #8B4513', borderRadius: 10, padding: 20 }}>
            Score: {score}
          </div>

          <div style={{
            backgroundColor: '#8B4513', borderRadius: 10, padding: 20, color: '#fff',
            display: 'flex', flexDirection: 'column', gap: 10
          }}>
            {players.map((player, i) => (
              <div key={i}>
                <div>{player}'s Vote:</div>
                {current.choices.map((choice, j) => (
                  <button
                    key={j}
                    disabled={submitted}
                    style={{
                      margin: '4px 0',
                      backgroundColor: votes[i] === j ? '#ffd54f' : '#fff',
                      border: '1px solid #ccc',
                      borderRadius: 6,
                      padding: '4px 8px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleVote(i, j)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={handleSubmit} disabled={submitted}
              style={{
                backgroundColor: '#007BFF', color: '#fff', borderRadius: 30,
                padding: '10px 20px', fontWeight: 'bold'
              }}>
              SUBMIT GROUP ANSWER
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 40 }}>
        <img src={LeftArrow} alt="Prev" onClick={handlePrev}
          style={{ width: 60, height: 60, cursor: currentIndex > 0 ? 'pointer' : 'not-allowed', opacity: currentIndex > 0 ? 1 : 0.5 }} />
        <img src={RightArrow} alt="Next" onClick={handleNext}
          style={{ width: 60, height: 60, cursor: currentIndex < storyData.length - 1 ? 'pointer' : 'not-allowed', opacity: currentIndex < storyData.length - 1 ? 1 : 0.5 }} />
      </div>
    </div>
  );
};

export default PaaralanQuestGroup;
