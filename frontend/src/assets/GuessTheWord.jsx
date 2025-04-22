import { useState, useEffect } from 'react';
import axios from 'axios';
import bgImage from '../assets/images/Guess the Word/GuessTheWordBG.png';
import filipinoExplorerLogo from '../assets/images/logo.png';
import woodenLog from '../assets/images/Buttons and Other/TimerLog.png';
import letterTile from '../assets/images/Guess the Word/LetterTiles.png';
import leftArrow from '../assets/images/Buttons and Other/buttonPrev.png';
import rightArrow from '../assets/images/Buttons and Other/buttonNext.png';

const GuessTheWord = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [puzzles, setPuzzles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [letterGrid, setLetterGrid] = useState([[], []]);
  
  // API base URL
  const API_BASE_URL = 'http://localhost:8080/api';
  
  // Fetch puzzles on component mount
  useEffect(() => {
    fetchPuzzles();
  }, []);

  // Generate letter grid when current puzzle changes
  useEffect(() => {
    if (currentPuzzle) {
      const grid = generateLetterGrid(currentPuzzle.shuffledLetters);
      setLetterGrid(grid);
    }
  }, [currentPuzzle]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameStarted && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      alert('Tapos na ang oras! Game over.');
      // Handle game over
    }
    return () => clearInterval(timer);
  }, [gameStarted, remainingTime]);

  // Random letter generator (Filipino alphabet focused)
  const getRandomLetter = () => {
    // Filipino alphabet includes English letters plus Ñ
    const filipinoLetters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    // More weight to common Filipino letters
    const commonLetters = 'AEIOUNSGKPTLMBD';
    
    // 70% chance to get a common letter
    if (Math.random() < 0.7) {
      return commonLetters.charAt(Math.floor(Math.random() * commonLetters.length));
    }
    
    return filipinoLetters.charAt(Math.floor(Math.random() * filipinoLetters.length));
  };

  // Generate a full letter grid with random letters filling empty spaces
  const generateLetterGrid = (shuffledLetters) => {
    // Ensure we have a string
    const letters = shuffledLetters ? shuffledLetters.split('') : [];
    
    // Create a full array of 14 letters
    const fullLetterArray = Array(14).fill('').map((_, index) => {
      // Use the original letter if available, otherwise generate a random one
      return index < letters.length ? letters[index] : getRandomLetter();
    });
    
    // Split into two rows
    const firstRow = fullLetterArray.slice(0, 7);
    const secondRow = fullLetterArray.slice(7, 14);
    
    return [firstRow, secondRow];
  };

  const fetchPuzzles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/word-puzzles`);
      if (response.data && response.data.length > 0) {
        setPuzzles(response.data);
        setCurrentPuzzle(response.data[0]);
        setGameStarted(true);
      } else {
        setError('No puzzles available. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching puzzles:', error);
      setError('Failed to load puzzles. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLetterClick = (letter, index) => {
    if (selectedLetters.some(item => item.index === index)) return;
    
    setSelectedLetters([...selectedLetters, { letter, index }]);
    setAnswer(prev => prev + letter);
  };

  // Function to handle clicking on a selected letter
  const handleSelectedLetterClick = (index) => {
    // Find the position of this letter in the selectedLetters array
    const position = selectedLetters.findIndex(item => item.index === index);
    
    if (position === -1) return;
    
    // Create a new array without this letter
    const newSelectedLetters = selectedLetters.filter((_, i) => i !== position);
    setSelectedLetters(newSelectedLetters);
    
    // Update the answer by removing this letter
    const newAnswer = newSelectedLetters.map(item => item.letter).join('');
    setAnswer(newAnswer);
  };

  const clearAnswer = () => {
    setSelectedLetters([]);
    setAnswer('');
  };

  const checkAnswer = async () => {
    if (!answer) {
      alert('Please enter an answer first.');
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_BASE_URL}/check-answer`, {
        puzzleId: currentPuzzle.id,
        answer
      });
      
      if (response.data.correct) {
        const pointsEarned = showHint ? 5 : 10; // Less points if hint was used
        setScore(score + pointsEarned);
        alert(`Tama! +${pointsEarned} points`);
        
        if (currentIndex < puzzles.length - 1) {
          goToNextPuzzle();
        } else {
          alert(`Tapos na ang laro! Iyong iskor: ${score + pointsEarned}`);
          // Handle game completion
        }
      } else {
        alert('Mali ang sagot. Subukan muli!');
        clearAnswer();
      }
    } catch (error) {
      console.error('Error checking answer:', error);
      alert('Error checking answer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextPuzzle = () => {
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentPuzzle(puzzles[currentIndex + 1]);
      clearAnswer();
      setShowHint(false);
      setHint('');
    }
  };

  const goToPrevPuzzle = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentPuzzle(puzzles[currentIndex - 1]);
      clearAnswer();
      setShowHint(false);
      setHint('');
    }
  };

  const showHintHandler = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/hint/${currentPuzzle.id}`);
      setHint(response.data.hint);
      setShowHint(true);
    } catch (error) {
      console.error('Error fetching hint:', error);
      alert('Failed to get hint. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading && !currentPuzzle) {
    return <div className="text-center p-10 text-amber-800 font-bold">Naglo-load...</div>;
  }

  if (error && !currentPuzzle) {
    return (
      <div className="text-center p-10">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
          <button 
            onClick={fetchPuzzles} 
            className="mt-4 bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentPuzzle) return <div className="text-center p-10">Naglo-load...</div>;

  const [firstRowLetters, secondRowLetters] = letterGrid;

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">

          {/* Logo */}
          <div className="self-start">
            <img src={filipinoExplorerLogo} alt="Filipino Explorer" className="w-32" />
          </div>

          {/* Title */}
          <div className="bg-amber-100 rounded-lg p-3 border-2 border-amber-800 inline-block w-72 h-20 text-center">
            <h1 className="text-amber-900 font-bold text-2xl">Hulaan ang Salita</h1>
            <p className="text-amber-800 text-sm">Buoin ang salita na tinutukoy ng kahulugan</p>
          </div>

          {/* Main area: timer | game | levels */}
          <div className="flex w-full gap-x-5">

            {/* Timer */}
            <div className="relative">
              <img src={woodenLog} alt="Timer" className="h-60 transform translate-y-6" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-4 bg-green-400 rounded" 
                  style={{ 
                    height: `${(remainingTime / 300) * 60}%`, 
                    bottom: '20%', 
                    left: '45%', 
                    position: 'absolute'
                  }} 
                />
              </div>
            </div>

            {/* Game */}
            <div className="bg-amber-800 rounded-lg p-4 shadow-lg flex-grow flex flex-col space-y-6">

              {/* Clue */}
              <div className="bg-amber-100 p-4 rounded-lg h-[150px] flex items-center justify-center relative">
                <p className="text-center text-lg font-bold">
                  {currentPuzzle.clue || "Isang taong handang magsakripisyo para sa kapwa at bayan."}
                </p>
                <span className="text-xs text-gray-600 absolute bottom-2 left-4">Translate</span>
              </div>

              {/* Answer display */}
              <div className="bg-amber-50 p-2 rounded border-2 border-amber-900 h-10 flex items-center justify-center text-lg font-bold">
                {selectedLetters.map((item, i) => (
                  <span 
                    key={i} 
                    className="cursor-pointer hover:bg-amber-200 px-1 rounded"
                    onClick={() => handleSelectedLetterClick(item.index)}
                  >
                    {item.letter}
                  </span>
                ))}
              </div>

              {/* Letter grid */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-1">
                  {firstRowLetters.map((letter, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLetterClick(letter, idx)}
                      disabled={selectedLetters.some(item => item.index === idx)}
                      className={`w-10 h-10 flex items-center justify-center font-bold text-lg bg-no-repeat bg-center bg-contain ${
                        selectedLetters.some(item => item.index === idx) ? 'opacity-50' : ''
                      }`}
                      style={{ backgroundImage: `url(${letterTile})` }}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1">
                  {secondRowLetters.map((letter, idx) => {
                    const index = idx + firstRowLetters.length;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleLetterClick(letter, index)}
                        disabled={selectedLetters.some(item => item.index === index)}
                        className={`w-10 h-10 flex items-center justify-center font-bold text-lg bg-no-repeat bg-center bg-contain ${
                          selectedLetters.some(item => item.index === index) ? 'opacity-50' : ''
                        }`}
                        style={{ backgroundImage: `url(${letterTile})` }}
                      >
                        {letter}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Hint display */}
              {showHint && hint && (
                <div className="bg-amber-100 p-2 rounded-lg text-center">
                  {hint}
                </div>
              )}

            </div>

            {/* Levels & Score */}
            <div className="bg-amber-700 p-4 rounded-lg flex-shrink-0">
              <div className="bg-amber-100 p-2 rounded-lg mb-4 w-32 text-center font-bold">
                Score: {score}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: Math.min(puzzles.length, 10) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentIndex(i);
                      setCurrentPuzzle(puzzles[i]);
                      clearAnswer();
                      setShowHint(false);
                      setHint('');
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                      currentIndex === i ? 'bg-amber-400 text-amber-900' : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center w-full">
            <div className="flex justify-center gap-x-4">
              <button
                onClick={goToPrevPuzzle}
                disabled={currentIndex === 0 || isLoading}
                className="bg-transparent text-white w-30 h-15 rounded-full disabled:opacity-50 flex items-center justify-center"
              >
                <img src={leftArrow} alt="Prev" className="w-20 h-10" />
              </button>
              <button
                onClick={checkAnswer}
                disabled={!answer || isLoading}
                className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold py-2 px-8 rounded-lg disabled:opacity-50"
              >
                {currentIndex === puzzles.length - 1 ? 'SUBMIT' : 'CHECK ANSWER'}
              </button>
              <button
                onClick={goToNextPuzzle}
                disabled={currentIndex === puzzles.length - 1 || isLoading}
                className="bg-transparent-400 text-white w-30 h-15 rounded-full disabled:opacity-50 flex items-center justify-center"
              >
                <img src={rightArrow} alt="Next" className="w-20 h-10" />
              </button>
            </div>
          </div>

          {/* Hint button */}
          <button
            onClick={showHintHandler}
            disabled={showHint || isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-lg disabled:opacity-50"
          >
            HINT
          </button>

          {/* Submit button */}
          <button
              onClick={checkAnswer}
              disabled={!answer || isLoading}
              className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold py-2 px-8 rounded-lg w-28 disabled:opacity-50"
            >
              SUBMIT
            </button>
          

        </div>
      </div>
    </div>
  );
};

export default GuessTheWord;