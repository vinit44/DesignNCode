import { useState } from "react";
import "./IFrontend.css"; // reuse same CSS

/* ================== 10 QUESTIONS TOTAL ================== */
const questions = [
  // Frontend Frameworks
  {
    q: "Which React hook is used to manage component state?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    answer: 0,
  },
  {
    q: "What does the 'virtual DOM' in React represent?",
    options: ["A copy of the real DOM kept in memory", "A server-side rendering technique", "A database query optimizer", "A CSS preprocessor"],
    answer: 0,
  },

  // JavaScript
  {
    q: "Which method is used to asynchronously handle promises in JavaScript?",
    options: ["then()", "catch()", "async/await", "All of the above"],
    answer: 3,
  },
  {
    q: "What is the purpose of the 'this' keyword in JavaScript?",
    options: ["To refer to the global object", "To refer to the current object context", "To declare a variable", "To create a loop"],
    answer: 1,
  },

  // Backend Development
  {
    q: "In Node.js, which module is used for handling HTTP requests and responses?",
    options: ["fs", "http", "path", "os"],
    answer: 1,
  },
  {
    q: "Which HTTP status code indicates a successful response?",
    options: ["200 OK", "404 Not Found", "500 Internal Server Error", "301 Moved Permanently"],
    answer: 0,
  },

  // Databases
  {
    q: "Which type of database is MongoDB?",
    options: ["Relational", "NoSQL", "Graph", "Key-Value"],
    answer: 1,
  },
  {
    q: "In SQL, which command is used to retrieve data from a table?",
    options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
    answer: 2,
  },

  // APIs and Protocols
  {
    q: "What does REST stand for in API design?",
    options: ["Representational State Transfer", "Remote Execution Service Tool", "Reactive Event Streaming Technology", "Resourceful Endpoint Sharing Technique"],
    answer: 0,
  },
  {
    q: "Which technology is commonly used for authentication in web applications?",
    options: ["JWT (JSON Web Tokens)", "XML", "SOAP", "HTML5"],
    answer: 0,
  },
];

/* ================== QUIZ COMPONENT ================== */
function IFullStack () {
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
      <h1 className="title">Intermediate Fullstack Developer Quiz</h1>

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

export default IFullStack;