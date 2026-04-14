import { useState } from "react";
import "./IFrontend.css";

/* ================== 10 QUESTIONS TOTAL ================== */
const questions = [
  // HTML
  { q: "What does HTML stand for?", options:["Hyper Trainer Marking Language","Hyper Text Markup Language","Hyper Text Marketing Language","Hyper Tool Markup Language"], answer: 1 },
  { q: "Which tag is used for the largest heading?", options:["<h6>","<heading>","<h1>","<head>"], answer: 2 },
  
  // CSS
  { q: "Which property controls text size?", options:["font-style","text-size","font-size","size"], answer: 2 },
  { q: "Which layout is one-dimensional?", options:["Grid","Flexbox","Table","Float"], answer: 1 },
  
  // JavaScript
  { q: "Which keyword declares a variable?", options:["var","int","string","define"], answer: 0 },
  { q: "Which method adds an item to an array?", options:["add()","push()","insert()","append()"], answer: 1 },
  
  // ReactJS
  { q: "Which hook manages state in functional components?", options:["useEffect","useState","useContext","useRef"], answer: 1 },
  { q: "What is JSX used for?", options:["Styling","State management","Describing UI","Routing"], answer: 2 },
  
  // Mixed
  { q: "Which HTML element is semantic?", options:["<div>","<span>","<section>","<b>"], answer: 2 },
  { q: "Which CSS pseudo-class applies on hover?", options:[":hover",":focus",":active",":click"], answer: 0 }
];

/* ================== QUIZ COMPONENT ================== */
function IFrontend() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (i) => setAnswers({ ...answers, [current]: i });
  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const calculateScore = () => {
    return questions.reduce((total, q, i) => total + (answers[i] === q.answer ? 5 : 0), 0);
  };

  const submitQuiz = () => setSubmitted(true);

  const q = questions[current];

  return (
    <div className="roadmap-container">
      <h1 className="title">Intermediate Frontend Quiz</h1>

      {!submitted ? (
        <div className="quiz-card">
          <p className="question">{q.q}</p>
          <div className="options">
            {q.options.map((opt, i) => (
              <label key={i} className="option">
                <input
                  type="radio"
                  checked={answers[current] === i}
                  onChange={() => handleSelect(i)}
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="quiz-actions">
            {current > 0 && <button className="quiz-btn" onClick={prev}>Previous</button>}
            {current < questions.length - 1 ? (
              <button className="quiz-btn" onClick={next}>Next</button>
            ) : (
              <button className="quiz-btn submit-btn" onClick={submitQuiz}>Submit</button>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-card result">
          <h2>Quiz Result</h2>
          <p>Score: {calculateScore()} / {questions.length * 5}</p>
          <p>{calculateScore() >= (questions.length * 5 * 0.75) ? "✅ Passed" : "❌ Failed"}</p>
        </div>
      )}
    </div>
  );
}

export default IFrontend;
