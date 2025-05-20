import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './assets/Homepage';
import SignUpType from './assets/SignUpType';
import RegisterTeacher from './assets/RegisterTeacher';
import GuessTheWord from './assets/GuessTheWord';
import MemoryGame from './assets/MemoryGame';
import ParkeQuest from './assets/ParkeQuest';
import PaaralanQuest from './pages/PaaralanQuest';
import TeacherInterface from './assets/TeacherInterface';
import './index.css';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUpType />} />
        <Route path="/register-teacher" element={<RegisterTeacher />} />

        {/* Games Section Path */}
        <Route path="/guesstheword" element={<GuessTheWord />} />
        <Route path="/memorygame" element={<MemoryGame />} />
        <Route path="/paaralanquest" element={<PaaralanQuest />} />
        <Route path="/parkequest" element={<ParkeQuest />} />
        <Route path="/teacher-interface" element={<TeacherInterface />} />
      </Routes>
    </Router>
  );
};

export default App;