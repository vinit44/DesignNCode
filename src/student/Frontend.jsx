//import React from "react";
import { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

/* ================= QUESTIONS ================= */
const htmlQuestions = [
  {
    q: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Tool Markup Language"], answer: 1
  },
  {
    q: "Which tag is used for the largest heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"], answer: 2
  },
  {
    q: "Which attribute is used for image source?",
    options: ["link", "src", "href", "path"], answer: 1
  },
  {
    q: "Which tag creates a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"], answer: 0
  },
  { q: "Which HTML element is semantic?", options: ["<div>", "<span>", "<section>", "<b>"], answer: 2 },
];

const cssQuestions = [
  {
    q: "Which property controls text size?",
    options: ["font-style", "text-size", "font-size", "size"], answer: 2
  },
  {
    q: "Which layout is one-dimensional?",
    options: ["Grid", "Flexbox", "Table", "Float"], answer: 1
  },
  {
    q: "Which unit is relative?",
    options: ["px", "cm", "em", "mm"], answer: 2
  },
  {
    q: "Which property creates space inside element?",
    options: ["margin", "border", "padding", "gap"], answer: 2
  },
  {
    q: "Which media query is correct?",
    options: ["@media screen > 600px", "@media (max-width: 600px)", "@media width:600px", "@media screen=600px"], answer: 1
  },
];

const jsQuestions = [
  {
    q: "Which keyword declares a variable?",
    options: ["var", "int", "string", "define"], answer: 0
  },
  {
    q: "Which method adds item to array?",
    options: ["add()", "push()", "insert()", "append()"], answer: 1
  },
  {
    q: "What does DOM stand for?",
    options: ["Data Object Model", "Document Object Model", "Digital Object Model", "Desktop Object Model"], answer: 1
  },
  {
    q: "Which is async?",
    options: ["for loop", "fetch()", "if statement", "switch"], answer: 1
  },
  {
    q: "Which keyword handles errors?",
    options: ["catch", "error", "try", "handle"], answer: 0
  },
];

/* ================= QUIZ CARD ================= */
function QuizCard({ title, questions, passed, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (i) => setAnswers({ ...answers, [current]: i });
  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const calculateScore = () => {
    return questions.reduce((total, q, i) => total + (answers[i] === q.answer ? 4 : 0), 0);
  };

  const submitQuiz = () => {
    const score = calculateScore();
    setSubmitted(true);
    onFinish(score >= 15); // pass threshold = 15
  };

  if (passed) {
    return (
      <div className="quiz-card passed">
        <h3>{title}</h3>
        <p>✅ Passed</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-card">
      <h3>{title}</h3>
      {!submitted ? (
        <>
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
        </>
      ) : (
        <p>✅ Passed: {calculateScore() >= 15 ? "Yes" : "No"}</p>
      )}
    </div>
  );
}

/* ================= MAIN PAGE ================= */
function Frontend() {
  const navigate = useNavigate();
  const [passedQuizzes, setPassedQuizzes] = useState({
    html: false,
    css: false,
    js: false,
  });

  return (
    <div className="roadmap-container">
      <div className="top-bar">
        <div>
          <h1 className="title">Frontend Development</h1>
          <h2 className="subtitle">Skill Assessment</h2>
        </div>

        <button
          className="syllabus-btn"
          onClick={() => navigate("/frontend/syllabus")}
        >
          Roadmap
        </button>
      </div>

      {/* HTML Quiz */}
      <QuizCard
        title="HTML Quiz"
        questions={htmlQuestions}
        passed={passedQuizzes.html}
        onFinish={(passed) => setPassedQuizzes({ ...passedQuizzes, html: passed })}
      />

      {/* CSS Quiz - Render only if HTML is passed */}
      {passedQuizzes.html && (
        <QuizCard
          title="CSS Quiz"
          questions={cssQuestions}
          passed={passedQuizzes.css}
          onFinish={(passed) => setPassedQuizzes({ ...passedQuizzes, css: passed })}
        />
      )}

      {/* JS Quiz - Render only if CSS is passed */}
      {passedQuizzes.css && (
        <QuizCard
          title="JavaScript Quiz"
          questions={jsQuestions}
          passed={passedQuizzes.js}
          onFinish={(passed) => setPassedQuizzes({ ...passedQuizzes, js: passed })}
        />
      )}

      {/* Completion Message */}
      {passedQuizzes.html && passedQuizzes.css && passedQuizzes.js && (
        <div className="course-complete">
          <h2 style={{ color: "green", fontWeight: "bold" }}>
            Frontend Basic Course Completed ✅
          </h2>
          <p>Now you can proceed with the Intermediate Frontend course.</p>
        </div>
      )}
    </div>
  );
}

export default Frontend;
