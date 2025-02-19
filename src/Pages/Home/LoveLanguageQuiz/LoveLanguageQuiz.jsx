import { useState } from "react";

export default function LoveLanguageQuiz() {
  const questions = [
    { id: 1, text: "How do you handle conflicts in a relationship?", options: ["Talk it out", "Give space", "Ignore it", "Get emotional"], scores: [10, 7, 4, 5] },
    { id: 2, text: "What's your ideal date?", options: ["Romantic dinner", "Adventure trip", "Netflix & Chill", "Surprise gift"], scores: [10, 8, 6, 7] },
    { id: 3, text: "How often do you express love?", options: ["Daily", "Sometimes", "Rarely", "Only on occasions"], scores: [10, 8, 5, 4] },
    { id: 4, text: "What do you value most in a partner?", options: ["Loyalty", "Fun", "Looks", "Money"], scores: [10, 8, 5, 3] }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (index) => {
    setScore(score + questions[currentQuestion].scores[index]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };

  const getFeedback = () => {
    if (score >= 35) return "💖 You're a Perfect Lover!";
    if (score >= 25) return "💛 You're a Good Lover!";
    if (score >= 15) return "💙 You have potential, keep learning!";
    return "💔 You need to improve your love game!";
  };

  return (
    <section className="section-container py-10 px-6">
      <h2 className="text-3xl font-bold text-gray-800">How Romantic Are You? Find Out Now!</h2>
      <p className="text-gray-600 mt-3">Answer a few questions and see how perfect you are as a lover!</p>

      {!completed ? (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div className="bg-[#e57339] h-3 rounded-full" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
          </div>

          <p className="text-lg font-semibold">{questions[currentQuestion].text}</p>

          <div className="mt-4 flex flex-col space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-[#e57339] hover:text-white transition"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Your Love Compatibility Score:</h3>
          <p className="mt-3 text-3xl font-bold text-[#e57339]">{score} / 40</p>
          <p className="text-gray-600 mt-2">{getFeedback()}</p>
        </div>
      )}
    </section>
  );
}
