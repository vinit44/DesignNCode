import { useState } from "react";
import "./IFrontend.css"; // reuse same CSS

/* ================== 10 QUESTIONS TOTAL ================== */
const questions = [
  // Core Java
  {
    q: "Which concept allows a class to inherit another class?",
    options: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"],
    answer: 2,
  },
  {
    q: "Which keyword is used to inherit a class in Java?",
    options: ["implements", "inherits", "extends", "super"],
    answer: 2,
  },

  // OOP Concepts
  {
    q: "Which feature supports method overriding?",
    options: ["Encapsulation", "Inheritance", "Abstraction", "Interface"],
    answer: 1,
  },
  {
    q: "Which access modifier allows visibility within the same package?",
    options: ["private", "protected", "public", "default"],
    answer: 3,
  },

  // Exception Handling
  {
    q: "Which keyword is used to handle exceptions?",
    options: ["try", "catch", "throw", "All of the above"],
    answer: 3,
  },
  {
    q: "Which exception is unchecked?",
    options: ["IOException", "SQLException", "NullPointerException", "ClassNotFoundException"],
    answer: 2,
  },

  // Collections
  {
    q: "Which collection does NOT allow duplicate elements?",
    options: ["List", "Set", "ArrayList", "Vector"],
    answer: 1,
  },
  {
    q: "Which class implements a dynamic array?",
    options: ["HashMap", "LinkedList", "ArrayList", "HashSet"],
    answer: 2,
  },

  // Multithreading
  {
    q: "Which interface is used to create a thread?",
    options: ["Runnable", "Serializable", "Cloneable", "Comparable"],
    answer: 0,
  },
  {
    q: "Which method starts a thread?",
    options: ["run()", "execute()", "start()", "init()"],
    answer: 2,
  },
];

/* ================== QUIZ COMPONENT ================== */
function IJavaDeveloper() {
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
      <h1 className="title">Intermediate Java Developer Quiz</h1>

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

export default IJavaDeveloper;
