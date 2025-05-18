"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../assets/images/Logo.png";
import Background from "../assets/images/Parke Game/Parke Quest BG.png";
import WoodPanel from "../assets/images/Parke Game/wood-panel2.png";
import ButtonNext from "../assets/images/Buttons and Other/button next.png";
import ButtonPrev from "../assets/images/Buttons and Other/button prev.png";
import TimerLog from "../assets/images/Buttons and Other/Timer Log.png";

const ParkeQuest = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [progress] = useState(60);
  const [usedHint, setUsedHint] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/parkequest")
      .then((res) => {
        console.log("Fetched questions:", res.data); // ✅ Log fetched data
        setQuestions(res.data);
      })
      .catch((err) => console.error("Failed to fetch questions:", err));
  }, []);

  const handleFragmentClick = (frag) => {
    if (selectedOrder.includes(frag)) {
      setSelectedOrder(selectedOrder.filter((f) => f !== frag));
    } else {
      setSelectedOrder([...selectedOrder, frag]);
    }
  };

  const checkAnswer = async () => {
    const current = questions[currentIndex];
    const studentAnswer = selectedOrder.join(" ");
    try {
      const res = await axios.post("http://localhost:8080/api/parkequest/check", {
        questionId: current.id,
        selectedAnswer: studentAnswer,
        usedHint,
      });
      setResultMessage(res.data.message);
    } catch (err) {
      console.error("Check answer failed:", err);
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
    setSelectedOrder([]);
    setUsedHint(false);
    setResultMessage("");
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setSelectedOrder([]);
    setUsedHint(false);
    setResultMessage("");
  };

  const current = questions[currentIndex];

  // ✅ Show loading message before rendering
  if (!questions.length) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white text-xl"
        style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover" }}
      >
        Loading Parke Quest...
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center font-['Fredoka'] relative"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Logo top-left */}
      <div className="absolute top-4 left-4 z-10">
        <img src={Logo} alt="Filipino Explorers Logo" className="w-40" />
      </div>

      {/* Title */}
      <div className="w-full text-center mt-6">
        <div className="inline-block bg-amber-100 border-4 border-amber-800 px-8 py-4 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-amber-900">Hulaan ang Salita</h1>
          <p className="text-lg text-amber-800">Buoin ang salita na tinutukoy ng kahulugan</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 justify-center items-center gap-10 px-6 py-12">
        {/* Timer Stick */}
        <div className="relative w-[140px] h-[450px] flex items-center justify-center">
          <img src={TimerLog} alt="Timer Stick" className="absolute inset-0 w-full h-full object-contain z-10" />
          <div
            className="absolute bottom-[100px] w-[30px] bg-emerald-400 z-20 transition-all duration-500"
            style={{ height: `${progress}%`, borderRadius: "9999px" }}
          ></div>
        </div>

        {/* Game Panel */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative bg-[#4e2c1c] rounded-[30px] w-[600px] min-h-[500px] flex flex-col items-center justify-start shadow-md px-6 py-4 text-white gap-3">
            {/* Story */}
            <p className="text-sm italic text-center text-[#fde68a]">{current?.story}</p>

            {/* Question */}
            <h2 className="text-lg font-bold text-center">{current?.question}</h2>

            {/* Fragments */}
            <div className="flex flex-col items-center gap-2 mt-2">
              {current?.choices.map((frag, idx) => (
                <div key={idx} className="cursor-pointer" onClick={() => handleFragmentClick(frag)}>
                  <div className="relative">
                    <img
                      src={WoodPanel}
                      alt={`Fragment ${idx}`}
                      className="h-[120px] w-full max-w-[460px] object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg px-4 text-center">
                      {frag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between w-full px-8 mt-2">
            <button onClick={goToPrevious} className="w-[185px] h-[85px]">
              <img src={ButtonPrev} alt="Previous" className="w-full h-full object-contain" />
            </button>
            <button
              onClick={checkAnswer}
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full font-bold text-lg shadow-md"
            >
              CHECK ANSWER
            </button>
            <button onClick={goToNext} className="w-[185px] h-[85px]">
              <img src={ButtonNext} alt="Next" className="w-full h-full object-contain" />
            </button>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex flex-col items-center gap-5">
          {/* Word Box */}
          <div className="relative w-[325px] h-[70px]">
            <div className="absolute -top-[100px] left-1/2 transform -translate-x-1/2 bg-[#4e2c1c] rounded-[24px] w-full h-[80px] flex items-center justify-center shadow-md">
              <div className="bg-[#fde68a] h-[60px] w-[280px] rounded-[20px] px-4 py-2 shadow-inner text-center flex items-center justify-center font-bold text-lg text-[#4e2c1c]">
                {selectedOrder.length > 0 ? selectedOrder.join(" ") : "Piliin ang tamang ayos ng sagot"}
              </div>
            </div>
          </div>

          {/* Number Grid */}
          <div className="relative w-[280px] h-[230px] bg-[#8B4A32] rounded-[24px] shadow-lg flex items-center justify-center">
            <div className="grid grid-cols-4 gap-x-5 gap-y-5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <div
                  key={num}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base ${
                    currentIndex === num - 1 ? "bg-orange-500 text-white" : "bg-[#F9D9A6] text-black"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* Hint & Submit */}
          <button
            onClick={() => setUsedHint(true)}
            className="w-[250px] py-3 rounded-full bg-[#1982fc] hover:bg-blue-700 text-white font-bold text-lg shadow-md"
          >
            HINT
          </button>
          <button
            onClick={checkAnswer}
            className="w-[250px] py-3 rounded-full bg-[#ffca28] hover:bg-yellow-500 text-white font-bold text-lg shadow-md"
          >
            SUBMIT
          </button>

          {/* Result Message */}
          {resultMessage && (
            <div className="text-white text-lg font-bold text-center mt-4">
              {resultMessage === "CORRECT ANSWER" ? "✅ Tama!" : "❌ Mali. Subukan muli."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkeQuest;
