import { useState } from "react";
import "./IFrontend.css"; // reuse same CSS

/* ================== 10 QUESTIONS TOTAL ================== */
const questions = [
  // Design Principles
  {
    q: "Which principle emphasizes making interfaces easy to understand and use?",
    options: ["Usability", "Aesthetics", "Consistency", "Hierarchy"],
    answer: 0,
  },
  {
    q: "What does 'affordance' refer to in UI design?",
    options: ["The visual appeal of an element", "The perceived function of an object", "The color scheme of a design", "The layout structure"],
    answer: 1,
  },

  // User Research
  {
    q: "Which method is used to observe users in their natural environment?",
    options: ["Surveys", "Contextual Inquiry", "A/B Testing", "Heuristic Evaluation"],
    answer: 1,
  },
  {
    q: "What is the primary goal of user personas?",
    options: ["To create wireframes", "To represent target users' characteristics", "To test prototypes", "To define color palettes"],
    answer: 1,
  },

  // Tools and Prototyping
  {
    q: "Which tool is commonly used for creating interactive prototypes?",
    options: ["Photoshop", "Figma", "Illustrator", "InVision"],
    answer: 3,
  },
  {
    q: "In Figma, what feature allows collaboration on designs?",
    options: ["Auto-layout", "Components", "Real-time collaboration", "Version history"],
    answer: 2,
  },

  // Accessibility
  {
    q: "Which WCAG guideline ensures content is perceivable to all users?",
    options: ["Operable", "Understandable", "Robust", "Perceivable"],
    answer: 3,
  },
  {
    q: "What does 'contrast ratio' measure in UI design?",
    options: ["Text size", "Color difference for readability", "Element spacing", "Animation speed"],
    answer: 1,
  },

  // Interaction Design
  {
    q: "Which term describes the flow of user actions in an interface?",
    options: ["User Journey", "Wireframe", "Mockup", "Style Guide"],
    answer: 0,
  },
  {
    q: "What is the purpose of a design system?",
    options: ["To create one-off designs", "To ensure consistency across products", "To focus only on visuals", "To replace user research"],
    answer: 1,
  },
];

/* ================== QUIZ COMPONENT ================== */
function IUiUx() {
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
      <h1 className="title">Intermediate UI/UX Developer Quiz</h1>

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

export default IUiUx;