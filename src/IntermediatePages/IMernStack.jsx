import { useState } from "react";
import "./IFrontend.css"; // reuse same CSS

/* ================== 10 QUESTIONS TOTAL ================== */
const questions = [
  // MongoDB
  {
    q: "MongoDB is a ______ database.",
    options: ["Relational", "Document-oriented", "Graph", "Key-value"],
    answer: 1,
  },
  {
    q: "Which format is used to store data in MongoDB?",
    options: ["XML", "CSV", "JSON / BSON", "Table"],
    answer: 2,
  },

  // Express.js
  {
    q: "Express.js is a framework for?",
    options: ["Frontend UI", "Backend Node.js", "Database", "Testing"],
    answer: 1,
  },
  {
    q: "Which method is used to create a POST API?",
    options: ["app.get()", "app.post()", "app.put()", "app.use()"],
    answer: 1,
  },

  // React
  {
    q: "Which hook is used to perform side effects?",
    options: ["useState", "useEffect", "useRef", "useMemo"],
    answer: 1,
  },
  {
    q: "What is React mainly used for?",
    options: ["Database", "Server-side logic", "User Interface", "Authentication"],
    answer: 2,
  },

  // Node.js
  {
    q: "Node.js is built on which JavaScript engine?",
    options: ["SpiderMonkey", "Chakra", "V8", "Rhino"],
    answer: 2,
  },
  {
    q: "Which module is used to create a server?",
    options: ["http", "fs", "path", "os"],
    answer: 0,
  },

  // MERN Integration
  {
    q: "Which tool is commonly used to connect frontend and backend?",
    options: ["Axios", "Bootstrap", "Redux", "Webpack"],
    answer: 0,
  },
  {
    q: "Which database is used in MERN stack?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    answer: 2,
  },
];

/* ================== QUIZ COMPONENT ================== */
function IMernStack() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (i) => {
    setAnswers({ ...answers, [current]: i });
  };

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const calculateScore = () => {
    return questions.reduce(
      (total, q, i) => total + (answers[i] === q.answer ? 5 : 0),
      0
    );
  };

  const submitQuiz = () => setSubmitted(true);

  const q = questions[current];

  return (
    <div className="roadmap-container">
      <h1 className="title">Intermediate MERN Stack Quiz</h1>

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
            {current > 0 && (
              <button className="quiz-btn" onClick={prev}>
                Previous
              </button>
            )}

            {current < questions.length - 1 ? (
              <button className="quiz-btn" onClick={next}>
                Next
              </button>
            ) : (
              <button className="quiz-btn submit-btn" onClick={submitQuiz}>
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-card result">
          <h2>Quiz Result</h2>
          <p>
            Score: {calculateScore()} / {questions.length * 5}
          </p>
          <p>
            {calculateScore() >= questions.length * 5 * 0.75
              ? "✅ Passed"
              : "❌ Failed"}
          </p>
        </div>
      )}
    </div>
  );
}

export default IMernStack;
