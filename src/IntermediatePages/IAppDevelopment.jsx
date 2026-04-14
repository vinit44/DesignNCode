import { useState } from "react";
import "./IFrontend.css"; // reuse same CSS

/* ================== 10 QUESTIONS TOTAL ================== */
const questions = [
  // Mobile App Frameworks
  {
    q: "Which framework is used for building native iOS apps?",
    options: ["React Native", "Flutter", "SwiftUI", "Xamarin"],
    answer: 2,
  },
  {
    q: "What does 'cross-platform' mean in app development?",
    options: ["Apps that run on multiple operating systems", "Apps that use multiple programming languages", "Apps that require multiple devices", "Apps that support multiple users"],
    answer: 0,
  },

  // UI/UX in Apps
  {
    q: "Which component is used to display a list of items in Android?",
    options: ["TextView", "RecyclerView", "Button", "ImageView"],
    answer: 1,
  },
  {
    q: "In Flutter, what is a 'Widget'?",
    options: ["A database table", "A UI component", "A network request", "A file storage"],
    answer: 1,
  },

  // Backend Integration
  {
    q: "Which API is commonly used for fetching data in mobile apps?",
    options: ["REST API", "SQL Query", "CSS Style", "HTML Element"],
    answer: 0,
  },
  {
    q: "What is the purpose of Firebase in app development?",
    options: ["UI design", "Backend services like authentication and database", "Version control", "Code compilation"],
    answer: 1,
  },

  // State Management
  {
    q: "In React Native, which library is used for state management?",
    options: ["Redux", "Axios", "AsyncStorage", "Expo"],
    answer: 0,
  },
  {
    q: "What does 'persistence' refer to in app development?",
    options: ["Saving app state across sessions", "Optimizing app performance", "Designing app icons", "Handling user gestures"],
    answer: 0,
  },

  // Deployment and Tools
  {
    q: "Which tool is used to build and distribute Android apps?",
    options: ["Xcode", "Android Studio", "Visual Studio Code", "App Store Connect"],
    answer: 1,
  },
  {
    q: "What is the role of App Store guidelines in iOS development?",
    options: ["To design the app UI", "To ensure apps meet quality and security standards", "To write code", "To test the app"],
    answer: 1,
  },
];

/* ================== QUIZ COMPONENT ================== */
function IAppDevelopment() {
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
      <h1 className="title">Intermediate App Development Developer Quiz</h1>

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

export default IAppDevelopment;