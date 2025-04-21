"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Logo from "../assets/images/Logo.png"
import Background from "../assets/images/Parke Game/Parke Quest BG.png"
import WoodPanel from "../assets/images/Parke Game/wood-panel2.png"
import ButtonNext from "../assets/images/Buttons and Other/button next.png"
import ButtonPrev from "../assets/images/Buttons and Other/button prev.png"
import TimerLog from "../assets/images/Buttons and Other/Timer Log.png"

const ParkeQuest = () => {
  const navigate = useNavigate()
  const [selectedNumbers, setSelectedNumbers] = useState([])
  const [progress] = useState(60)

  const handleNumberClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number))
    } else {
      setSelectedNumbers([...selectedNumbers, number])
    }
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
          <img
            src={TimerLog}
            alt="Timer Stick"
            className="absolute inset-0 w-full h-full object-contain z-10"
          />
          <div
            className="absolute bottom-[100px] w-[30px] bg-emerald-400 z-20 transition-all duration-500"
            style={{ height: `${progress}%`, borderRadius: "9999px" }}
          ></div>
        </div>

        {/* Game Panel */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative bg-[#4e2c1c] rounded-[30px] w-[600px] h-[500px] flex flex-col items-center justify-center shadow-md px-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="my-1">
                <img
                  src={WoodPanel}
                  alt={`Wood Panel ${i}`}
                  className="h-[150px] w-[100%] max-w-[460px] object-contain"
                />
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between w-full px-8 mt-2">
            <button className="w-[185px] h-[85px]">
              <img src={ButtonPrev} alt="Previous" className="w-full h-full object-contain" />
            </button>
            <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full font-bold text-lg shadow-md">
              CHECK ANSWER
            </button>
            <button className="w-[185px] h-[85px]">
              <img src={ButtonNext} alt="Next" className="w-full h-full object-contain" />
            </button>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex flex-col items-center gap-5">
          {/* Word Box Wrapper with Brown Background */}
          <div className="relative w-[325px] h-[70px]">
            <div className="absolute -top-[100px] left-1/2 transform -translate-x-1/2 bg-[#4e2c1c] rounded-[24px] w-full h-[80px] flex items-center justify-center shadow-md">
              <div className="bg-[#fde68a] h-[60px] w-[280px] rounded-[20px] px-4 py-2 shadow-inner" />
            </div>
          </div>

       {/* Number Grid Background Wrapper */}
<div className="relative w-[280px] h-[230px] bg-[#8B4A32] rounded-[24px] shadow-lg flex items-center justify-center">
  {/* Number Grid Inside */}
  <div className="grid grid-cols-4 gap-x-5 gap-y-5">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
      <button
        key={num}
        onClick={() => handleNumberClick(num)}
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-all duration-200 ${
          selectedNumbers.includes(num)
            ? "bg-orange-500 text-white"
            : "bg-[#F9D9A6] text-black hover:bg-yellow-300"
        }`}
      >
        {num}
      </button>
    ))}
  </div>
</div>


          {/* Hint & Submit */}
          <button className="w-[250px] py-3 rounded-full bg-[#1982fc] hover:bg-blue-700 text-white font-bold text-lg shadow-md">
            HINT
          </button>
          <button className="w-[250px] py-3 rounded-full bg-[#ffca28] hover:bg-yellow-500 text-white font-bold text-lg shadow-md">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  )
}

export default ParkeQuest
