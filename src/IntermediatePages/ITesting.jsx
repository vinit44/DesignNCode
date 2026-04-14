import { useState } from "react";
import "./IFrontend.css"; // reuse same CSS

/* ================== 10 QUESTIONS TOTAL ================== */
const questions = [
  // Unit Testing
  {
    q: "Which framework is commonly used for unit testing in Java?",
    options: ["JUnit", "Selenium", "Postman", "JMeter"],
    answer: 0,
  },
  {
    q: "What is the primary goal of unit testing?",
    options: ["To test the entire application", "To test individual components in isolation", "To test user interfaces", "To test database performance"],
    answer: 1,
  },

  // Integration Testing
  {
    q: "Which type of testing verifies the interaction between different modules?",
    options: ["Unit Testing", "Integration Testing", "System Testing", "Acceptance Testing"],
    answer: 1,
  },
  {
    q: "In integration testing, what does 'top-down' approach mean?",
    options: ["Testing starts from the bottom modules", "Testing starts from the top-level modules", "Testing all modules simultaneously", "Testing only the database"],
    answer: 1,
  },

  // Automation Tools
  {
    q: "Which tool is used for automating web browser interactions?",
    options: ["JUnit", "Selenium", "JMeter", "Postman"],
    answer: 1,
  },
  {
    q: "What is the purpose of JMeter in testing?",
    options: ["Unit testing", "Load and performance testing", "UI testing", "API documentation"],
    answer: 1,
  },

  // Types of Testing
  {
    q: "Which testing ensures the software meets user requirements?",
    options: ["Unit Testing", "Integration Testing", "Acceptance Testing", "Regression Testing"],
    answer: 2,
  },
  {
    q: "What does 'regression testing' aim to verify?",
    options: ["New features work correctly", "Existing functionality still works after changes", "Performance under load", "Security vulnerabilities"],
    answer: 1,
  },

  // Test Cases and Bugs
  {
    q: "Which component defines the steps to execute a test?",
    options: ["Test Plan", "Test Case", "Test Suite", "Bug Report"],
    answer: 1,
  },
  {
    q: "What is a 'false positive' in testing?",
    options: ["A bug that is not reported", "A test that passes when it should fail", "A test that fails when it should pass", "A bug that is correctly identified"],
    answer: 2,
  },
];

/* ================== QUIZ COMPONENT ================== */
function ITesting() {
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
      <h1 className="title">Intermediate Testing Developer Quiz</h1>

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

export default ITesting;