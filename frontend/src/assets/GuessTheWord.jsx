import { useState, useEffect } from 'react';
import axios from 'axios';
import bgImage from '../assets/images/Guess the Word/Guess the word UI BG.png';
import filipinoExplorerLogo from '../assets/images/logo.png';
import woodenLog from '../assets/images/Buttons and Other/Timer Log.png';
import letterTile from '../assets/images/Guess the Word/Letter Tiles.png';
import leftArrow from '../assets/images/Buttons and Other/button prev.png';
import rightArrow from '../assets/images/Buttons and Other/button next.png';

const GuessTheWord = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [puzzles, setPuzzles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [isTranslated, setIsTranslated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [letterGrid, setLetterGrid] = useState([[], []]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [solvedPuzzles, setSolvedPuzzles] = useState([]); // Track which puzzles have been solved
  
  // API base URL
  const API_BASE_URL = 'http://localhost:8080/api';
  
  // Fetch puzzles on component mount
  useEffect(() => {
    fetchActivePuzzles();
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
    if (gameStarted && !gameCompleted && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      alert('Tapos na ang oras! Game over.');
      setGameCompleted(true);
      // Handle game over
    }
    return () => clearInterval(timer);
  }, [gameStarted, remainingTime, gameCompleted]);

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

  // Generate a full letter grid with shuffled letters randomly distributed
  const generateLetterGrid = (shuffledLetters) => {
    // Ensure we have a string, or create an empty array if not
    const letters = shuffledLetters ? shuffledLetters.split('') : [];
    
    // Create an array of 14 positions (0-13)
    const positions = Array.from({ length: 14 }, (_, i) => i);
    
    // Shuffle the positions array to randomize letter placement
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    
    // Create a full array with 14 placeholders
    const fullLetterArray = Array(14).fill('');
    
    // Place the shuffled letters at random positions
    for (let i = 0; i < letters.length; i++) {
      if (i < positions.length) {
        fullLetterArray[positions[i]] = letters[i];
      }
    }
    
    // Fill remaining positions with random letters
    for (let i = 0; i < fullLetterArray.length; i++) {
      if (fullLetterArray[i] === '') {
        fullLetterArray[i] = getRandomLetter();
      }
    }
    
    // Split into two rows
    const firstRow = fullLetterArray.slice(0, 7);
    const secondRow = fullLetterArray.slice(7, 14);
    
    return [firstRow, secondRow];
  };

  const fetchActivePuzzles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Changed to fetch active puzzles instead of all puzzles
      const response = await axios.get(`${API_BASE_URL}/active-puzzles`);
      if (response.data && response.data.length > 0) {
        setPuzzles(response.data);
        setCurrentPuzzle(response.data[0]);
        setGameStarted(true);
        // Initialize solvedPuzzles array with falses for each puzzle
        setSolvedPuzzles(new Array(response.data.length).fill(false));
      } else {
        setError('No active puzzles available. Please ask your teacher to set up the game.');
      }
    } catch (error) {
      console.error('Error fetching active puzzles:', error);
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

  const submitGame = () => {
    // Show confirmation dialog
    const confirmSubmit = window.confirm('Are you sure you want to submit the entire game?');
    
    if (confirmSubmit) {
      setGameCompleted(true);
      alert(`Game completed! Your final score is: ${score}`);
      
      // Here you would typically send the final score to your backend
      // Example:
      // axios.post(`${API_BASE_URL}/submit-game`, { score, userId: currentUser.id })
      //   .then(response => {
      //     console.log('Game submitted successfully', response.data);
      //   })
      //   .catch(error => {
      //     console.error('Error submitting game:', error);
      //   });
    }
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
        // Mark this puzzle as solved
        const updatedSolvedPuzzles = [...solvedPuzzles];
        updatedSolvedPuzzles[currentIndex] = true;
        setSolvedPuzzles(updatedSolvedPuzzles);
        
        // Add the current puzzle's score (or default to 10 if not specified)
        const pointsEarned = currentPuzzle.score ? (isTranslated ? Math.floor(currentPuzzle.score / 2) : currentPuzzle.score) : (isTranslated ? 5 : 10);
        setScore(score + pointsEarned);
        alert(`Tama! +${pointsEarned} points`);
        
        // Find next unsolved puzzle if available, otherwise stay on current
        const nextUnsolved = findNextUnsolvedPuzzle(currentIndex, updatedSolvedPuzzles);
        if (nextUnsolved !== -1) {
          setCurrentIndex(nextUnsolved);
          setCurrentPuzzle(puzzles[nextUnsolved]);
          clearAnswer();
          setIsTranslated(false);
        } else {
          // All puzzles solved, but don't end the game automatically
          clearAnswer();
          setIsTranslated(false);
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

  // Helper function to find the next unsolved puzzle
  const findNextUnsolvedPuzzle = (currentIdx, solvedArray) => {
    // First check from current position to end
    for (let i = currentIdx + 1; i < solvedArray.length; i++) {
      if (!solvedArray[i]) return i;
    }
    
    // Then check from beginning to current position
    for (let i = 0; i < currentIdx; i++) {
      if (!solvedArray[i]) return i;
    }
    
    // Return -1 if all puzzles are solved
    return -1;
  };

  const goToNextPuzzle = () => {
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentPuzzle(puzzles[currentIndex + 1]);
      clearAnswer();
      setIsTranslated(false);
    }
  };

  const goToPrevPuzzle = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentPuzzle(puzzles[currentIndex - 1]);
      clearAnswer();
      setIsTranslated(false);
    }
  };

  const toggleTranslation = async () => {
    try {
      if (!isTranslated) {
        setIsLoading(true);
        // Changed from /translation to /hint to fetch the hint instead of generic translation
        const response = await axios.get(`${API_BASE_URL}/hint/${currentPuzzle.id}`);
        
        if (response.data && response.data.hint) {
          // Update the current puzzle with hint
          setCurrentPuzzle({
            ...currentPuzzle,
            translatedClue: response.data.hint // Store the hint in translatedClue
          });
          setIsTranslated(true);
        }
      } else {
        // Toggle back to original clue
        setIsTranslated(false);
      }
    } catch (error) {
      console.error('Error fetching hint:', error);
      alert('Failed to load hint. Please try again.');
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

  // Function to reset current puzzle with a new random letter arrangement
  const reshuffleLetters = () => {
    if (currentPuzzle) {
      const grid = generateLetterGrid(currentPuzzle.shuffledLetters);
      setLetterGrid(grid);
      clearAnswer();
    }
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
            onClick={fetchActivePuzzles} 
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
      className="min-h-screen w-full bg-cover bg-center relative flex justify-center items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Logo positioned in top left corner with more spacing */}
      <div className="absolute top-6 left-6">
        <img src={filipinoExplorerLogo} alt="Filipino Explorer" className="w-40" />
      </div>
      
      {/* Main content - centered with fixed width and height */}
      <div className="px-4 w-full max-w-6xl mx-auto my-auto pt-20">
        <div className="flex flex-col items-center justify-center space-y-8 mx-auto my-auto py-6">

          {/* Title - INCREASED HEIGHT AND WIDTH */}
          <div className="bg-amber-100 rounded-lg p-3 border-2 border-amber-800 inline-block w-96 h-24 text-center mb-4 mr-15">
            <h1 className="text-amber-900 font-bold text-2xl">Hulaan ang Salita</h1>
            <p className="text-amber-800 text-sm">Buoin ang salita na tinutukoy ng kahulugan</p>
          </div>

          {/* Timer display */}
          <div className="bg-amber-100 rounded-lg p-2 border-2 border-amber-800 text-center">
            <p className="font-bold text-amber-900">Time Remaining: {formatTime(remainingTime)}</p>
          </div>

          {/* Game completion message */}
          {gameCompleted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-full text-center mb-4">
              <strong>Game Completed!</strong>
              <p>Your final score is: {score}</p>
            </div>
          )}

          {/* Main area: timer | game | levels - increased gap between elements */}
          <div className={`flex w-full gap-x-8 justify-center ${gameCompleted ? 'opacity-50 pointer-events-none' : ''}`}>

            {/* Timer - ADJUSTED POSITIONING */}
            <div className="relative">
              <img src={woodenLog} alt="Timer" className="h-80 transform translate-y-18" />
              <div className="absolute inset-0 flex items-center justify-center mt-10">
                <div 
                  className="w-4 bg-green-400 rounded" 
                  style={{ 
                    height: `${(remainingTime / 300) * 60}%`, 
                    bottom: '25%', 
                    left: '45%', 
                    position: 'absolute'
                  }} 
                />
              </div>
            </div>

            {/* Game - increased internal spacing */}
            <div className="bg-amber-800 rounded-lg p-6 shadow-lg flex-grow max-w-2xl flex flex-col space-y-8">

              {/* Clue */}
              <div className="bg-amber-100 p-4 rounded-lg h-[150px] flex items-center justify-center relative">
                <p className="text-center text-lg font-bold">
                  {isTranslated && currentPuzzle.translatedClue ? 
                    currentPuzzle.translatedClue : 
                    (currentPuzzle.clue || "Isang taong handang magsakripisyo para sa kapwa at bayan.")}
                </p>
                <button 
                  onClick={toggleTranslation}
                  className="text-xs text-blue-600 hover:text-blue-800 absolute bottom-2 left-4 underline"
                >
                  {isTranslated ? "Show Original" : "Show Hint"}
                </button>
              </div>

              {/* Answer display */}
              <div className="bg-amber-50 p-3 rounded border-2 border-amber-900 h-12 flex items-center justify-center text-lg font-bold">
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

              {/* Letter grid - increased spacing between rows */}
              <div className="flex flex-col items-center gap-6">
                <div className="flex gap-2">
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
                <div className="flex gap-2">
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
                
                {/* Reshuffle button */}
                <button 
                  onClick={reshuffleLetters}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Reshuffle Letters
                </button>
              </div>

            </div>

            
            {/* Updated Levels & Score section to match the provided design */}
            <div className="flex flex-col">
              {/* Top beige panel for score */}
              <div className="bg-amber-100 rounded-lg p-3 text-center mb-2 border-10 border-amber-800">
                <p className="font-bold text-amber-900">Score: {score}</p>
              </div>
              
              {/* Brown panel with level buttons */}
              <div className="bg-amber-800 rounded-lg p-4 mb-2">
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: puzzles.length }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentIndex(i);
                        setCurrentPuzzle(puzzles[i]);
                        clearAnswer();
                        setIsTranslated(false);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                        ${currentIndex === i 
                          ? 'bg-amber-300 text-amber-900' 
                          : solvedPuzzles[i]
                            ? 'bg-green-300 text-amber-900'
                            : 'bg-amber-100 text-amber-900'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Yellow submit button at bottom */}
              <button
                onClick={submitGame}
                disabled={isLoading || gameCompleted}
                className="bg-amber-300 hover:bg-amber-400 text-amber-900 font-bold py-3 px-8 
                          rounded-full w-full mt-4 disabled:opacity-50 uppercase"
              >
                SUBMIT
              </button>
            </div>
          </div>

          {/* Navigation and check answer button - increased vertical spacing */}
          <div className="flex justify-center w-full mt-6 mr-17">
            <div className="flex justify-center gap-x-6">
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
                className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold py-3 px-10 rounded-lg disabled:opacity-50"
              >
                CHECK ANSWER
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
        </div>
      </div>
    </div>
  );
};

export default GuessTheWord;