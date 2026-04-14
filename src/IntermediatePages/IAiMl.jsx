import { useState } from "react";
import "./IFrontend.css"; // reuse same CSS

/* ================== 10 QUESTIONS TOTAL ================== */
const questions = [
  // AI Basics
  {
    q: "What is Artificial Intelligence?",
    options: [
      "Programming with Java",
      "Simulation of human intelligence in machines",
      "Database management",
      "Web development framework",
    ],
    answer: 1,
  },
  {
    q: "Which of the following is an AI application?",
    options: ["Compiler", "Search Engine", "Calculator", "Text Editor"],
    answer: 1,
  },

  // Machine Learning Basics
  {
    q: "Machine Learning is a subset of?",
    options: ["Data Science", "Artificial Intelligence", "Cloud Computing", "Cyber Security"],
    answer: 1,
  },
  {
    q: "Which type of learning uses labeled data?",
    options: ["Unsupervised Learning", "Reinforcement Learning", "Supervised Learning", "Deep Learning"],
    answer: 2,
  },

  // Algorithms
  {
    q: "Which algorithm is used for classification?",
    options: ["Linear Regression", "K-Means", "Decision Tree", "Apriori"],
    answer: 2,
  },
  {
    q: "Which algorithm groups similar data points?",
    options: ["Logistic Regression", "Naive Bayes", "K-Means Clustering", "SVM"],
    answer: 2,
  },

  // Deep Learning
  {
    q: "Which neural network is mainly used for image processing?",
    options: ["RNN", "CNN", "ANN", "SVM"],
    answer: 1,
  },
  {
    q: "Which activation function is commonly used in hidden layers?",
    options: ["Sigmoid", "ReLU", "Softmax", "Linear"],
    answer: 1,
  },

  // Evaluation & Tools
  {
    q: "Which metric evaluates classification models?",
    options: ["Mean Squared Error", "Accuracy", "RSS", "Variance"],
    answer: 1,
  },
  {
    q: "Which Python library is popular for Machine Learning?",
    options: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib"],
    answer: 2,
  },
];

/* ================== QUIZ COMPONENT ================== */
function IAIML() {
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
      <h1 className="title">Intermediate AI & Machine Learning Quiz</h1>

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

export default IAIML;
