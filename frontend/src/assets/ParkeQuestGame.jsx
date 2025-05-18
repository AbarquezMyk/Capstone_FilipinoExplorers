import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../assets/images/Logo.png";
import Background from "../assets/images/Parke Game/Parke Quest BG.png";

const ParkeQuestGame = () => {
  const [story, setStory] = useState("");
  const [question, setQuestion] = useState("");
  const [fullSentence, setFullSentence] = useState("");
  const [fragments, setFragments] = useState(["", "", ""]);
  const [hint, setHint] = useState("");
  const [message, setMessage] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(() => {
    fetchQuestionCount();
  }, []);

  const fetchQuestionCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/parkequest");
      setQuestionNumber(response.data.length + 1);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSplitSentence = () => {
    const words = fullSentence.trim().split(" ");
    const splitCount = Math.ceil(words.length / 3);

    const part1 = words.slice(0, splitCount).join(" ");
    const part2 = words.slice(splitCount, splitCount * 2).join(" ");
    const part3 = words.slice(splitCount * 2).join(" ");

    const initialFragments = [part1, part2, part3];

    // Shuffle the fragments
    const shuffled = [...initialFragments].sort(() => Math.random() - 0.5);
    setFragments(shuffled);
  };

  const handleFragmentChange = (index, value) => {
    const updated = [...fragments];
    updated[index] = value;
    setFragments(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!story || !question || !fullSentence || fragments.includes("") || !hint) {
      setMessage("❌ Please fill out all fields.");
      return;
    }

    try {
      const dto = {
        story,
        question,
        correctAnswer: fullSentence,
        choices: fragments,
        hint
      };

      await axios.post("http://localhost:8080/api/parkequest", dto);
      setMessage("✅ Question #" + questionNumber + " submitted!");

      // Reset form
      setStory("");
      setQuestion("");
      setFullSentence("");
      setFragments(["", "", ""]);
      setHint("");

      // Update question number
      setQuestionNumber((prev) => prev + 1);
    } catch (error) {
      console.error("Submit error:", error);
      setMessage("❌ Failed to submit. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-2xl bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg font-['Fredoka'] border border-gray-200">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-40" />
        </div>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center text-[#073B4C]">
            Add Parke Quest Question #{questionNumber}
          </h2>

          <label className="block font-semibold">Story</label>
          <textarea
            className="w-full p-3 border rounded mb-4"
            rows={3}
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />

          <label className="block font-semibold">Question</label>
          <input
            className="w-full p-2 border rounded mb-4"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <label className="block font-semibold">Correct Full Sentence</label>
          <input
            className="w-full p-2 border rounded mb-2"
            type="text"
            value={fullSentence}
            onChange={(e) => setFullSentence(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSplitSentence}
            className="mb-4 bg-[#FFD166] text-[#073B4C] px-4 py-2 rounded hover:bg-[#ffc94a]"
          >
            Split into Fragments
          </button>

          {fragments.map((frag, index) => (
            <div key={index} className="mb-2">
              <label className="font-semibold">Fragment {index + 1}</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={frag}
                onChange={(e) => handleFragmentChange(index, e.target.value)}
              />
            </div>
          ))}

          <label className="block font-semibold mt-4">Hint</label>
          <input
            className="w-full p-2 border rounded mb-4"
            type="text"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-[#06D6A0] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#05c594] transition-all"
          >
            Submit Question
          </button>

          {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ParkeQuestGame;
