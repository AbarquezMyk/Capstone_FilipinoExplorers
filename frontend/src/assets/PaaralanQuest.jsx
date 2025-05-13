console.log("✅ PaaralanQuest component is rendering.");

import React, { useState } from 'react';
import Background from '../assets/images/Paaralan Quest/Paaralan Quest BG.png';
import Logo from '../assets/images/Logo.png';
import StickImage from '../assets/images/Buttons and Other/Timer Log.png';
import LeftArrow from '../assets/images/Buttons and Other/button prev.png';
import RightArrow from '../assets/images/Buttons and Other/button next.png';

// ✅ Sample Story Data (Add 13 more later)
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
  {
    story: "Tuwing hapon, tinutulungan ni Marco ang kanyang lola sa pagtitinda ng gulay sa palengke.",
    question: "Ano ang ipinapakita ni Marco sa kanyang lola?",
    choices: ["Pagiging makasarili", "Pagmamalaki", "Paggalang at pagtulong", "Pag-aaksaya ng oras"],
    correctAnswer: 2,
  },
  {
    story: "Masayang naglaro si Liza at ang kanyang mga kaibigan sa parke pagkatapos ng klase.",
    question: "Ano ang ginagawa ni Liza pagkatapos ng klase?",
    choices: ["Nag-aaral", "Nagpapahinga", "Naglalaba", "Naglaro sa parke"],
    correctAnswer: 3,
  },
  {
    story: "Si Mang Tonyo ay palaging naglilinis ng kanyang bakuran tuwing umaga.",
    question: "Ano ang ugali ni Mang Tonyo batay sa kwento?",
    choices: ["Tamad", "Malinis at masinop", "Makalat", "Pasaway"],
    correctAnswer: 1,
  },
  {
    story: "Nagbigay ng pagkain si Carla sa batang lansangan nang makita niya ito sa daan.",
    question: "Anong katangian ni Carla ang ipinakita sa kwento?",
    choices: ["Pagkainggitin", "Madamot", "Mapagbigay", "Palaaway"],
    correctAnswer: 2,
  },
  {
    story: "Laging pinupuri ng kanyang guro si Ben dahil sa maayos niyang pagsusulat.",
    question: "Bakit pinupuri si Ben ng kanyang guro?",
    choices: ["Magaling siyang sumayaw", "Maayos siyang magsulat", "Mahusay siyang umawit", "Magaling siyang magbasa"],
    correctAnswer: 1,
  },
  {
    story: "Naglakad si Noel ng isang kilometro upang makarating sa paaralan kahit umuulan.",
    question: "Anong katangian ang ipinakita ni Noel?",
    choices: ["Katamaran", "Katapatan", "Kasipagan at tiyaga", "Kabastusan"],
    correctAnswer: 2,
  },
  {
    story: "Tuwing Sabado, nagsisimba ang pamilya Reyes bilang pasasalamat.",
    question: "Ano ang ginagawa ng pamilya Reyes tuwing Sabado?",
    choices: ["Namamasyal", "Nagsisimba", "Naglalaro", "Namimili"],
    correctAnswer: 1,
  },
  {
    story: "Pinagbigyan ni Aling Rosa ang hiling ng kanyang anak na bumili ng libro.",
    question: "Ano ang hiningi ng anak ni Aling Rosa?",
    choices: ["Laruan", "Damit", "Sapatos", "Libro"],
    correctAnswer: 3,
  },
  {
    story: "Si Dan ay hindi nanood ng TV at sa halip ay nag-aral para sa pagsusulit.",
    question: "Ano ang ginawa ni Dan sa halip na manood ng TV?",
    choices: ["Nagluto", "Natulog", "Nag-aral", "Naglaro"],
    correctAnswer: 2,
  },
  {
    story: "Tinulungan ni May si Lisa sa paggawa ng takdang-aralin sa Filipino.",
    question: "Anong asignatura ang tinulungan ni May kay Lisa?",
    choices: ["Matematika", "Agham", "Filipino", "Araling Panlipunan"],
    correctAnswer: 2,
  },
  {
    story: "Naglinis ng silid-aralan ang mga mag-aaral bago umuwi.",
    question: "Ano ang ginawa ng mga mag-aaral bago umuwi?",
    choices: ["Naglaro", "Naglinis ng silid-aralan", "Nag-quiz", "Nag-sine"],
    correctAnswer: 1,
  },
  {
    story: "Tumulong si Karen sa mga batang walang dalang lapis sa klase.",
    question: "Ano ang tulong na ginawa ni Karen?",
    choices: ["Nagbahagi ng lapis", "Nagpahiram ng libro", "Naglinis ng klasrum", "Nagbigay ng pera"],
    correctAnswer: 0,
  },
  {
    story: "Pinatawad ni Andrea ang kanyang kaibigan matapos silang mag-away.",
    question: "Ano ang ginawa ni Andrea sa kanyang kaibigan?",
    choices: ["Pinagalitan", "Pinalayas", "Pinatawad", "Pinagsabihan"],
    correctAnswer: 2,
  }
];


const PaaralanQuest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = storyData[currentIndex];

  const handleNext = () => {
    if (currentIndex < storyData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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
              Kuwento #{currentIndex + 1}
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
              {current.story}
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
              <h2 style={{ fontSize: '22px', color: '#333' }}>{current.question}</h2>
            </div>
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {current.choices.map((choice, index) => (
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
          onClick={handlePrev}
          style={{
            width: '60px',
            height: '60px',
            cursor: currentIndex > 0 ? 'pointer' : 'not-allowed',
            opacity: currentIndex > 0 ? 1 : 0.5,
          }}
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
          onClick={handleNext}
          style={{
            width: '60px',
            height: '60px',
            cursor: currentIndex < storyData.length - 1 ? 'pointer' : 'not-allowed',
            opacity: currentIndex < storyData.length - 1 ? 1 : 0.5,
          }}
        />
      </div>
    </div>
  );
};

export default PaaralanQuest;
