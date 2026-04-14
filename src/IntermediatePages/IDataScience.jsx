import { useState } from "react";
import "./IFrontend.css"; // reuse same CSS

/* ================== 10 QUESTIONS TOTAL ================== */
const questions = [
  // Statistics and Probability
  {
    q: "What does the p-value represent in hypothesis testing?",
    options: ["The probability of the null hypothesis being true", "The probability of observing the data assuming the null hypothesis", "The sample size", "The effect size"],
    answer: 1,
  },
  {
    q: "Which measure describes the spread of data around the mean?",
    options: ["Mean", "Median", "Variance", "Mode"],
    answer: 2,
  },

  // Data Analysis
  {
    q: "In pandas, which method is used to remove missing values from a DataFrame?",
    options: ["drop()", "fillna()", "dropna()", "replace()"],
    answer: 2,
  },
  {
    q: "What is the purpose of data normalization in preprocessing?",
    options: ["To increase data size", "To scale features to a standard range", "To remove outliers", "To encode categorical variables"],
    answer: 1,
  },

  // Machine Learning
  {
    q: "Which algorithm is used for classification tasks in supervised learning?",
    options: ["K-Means", "Linear Regression", "Decision Trees", "PCA"],
    answer: 2,
  },
  {
    q: "What is overfitting in machine learning?",
    options: ["Model performs well on training data but poorly on new data", "Model performs poorly on training data", "Model has too few parameters", "Model ignores the data"],
    answer: 0,
  },

  // Python Libraries
  {
    q: "Which library is used for numerical computations in Python?",
    options: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    answer: 1,
  },
  {
    q: "In scikit-learn, which function splits data into training and testing sets?",
    options: ["fit()", "predict()", "train_test_split()", "score()"],
    answer: 2,
  },

  // Visualization and Evaluation
  {
    q: "Which metric is used to evaluate regression models?",
    options: ["Accuracy", "Precision", "Mean Squared Error", "F1-Score"],
    answer: 2,
  },
  {
    q: "What is the primary use of Matplotlib in data science?",
    options: ["Data cleaning", "Statistical analysis", "Data visualization", "Model deployment"],
    answer: 2,
  },
];

/* ================== QUIZ COMPONENT ================== */
function IDataScience() {
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
      <h1 className="title">Intermediate Data Science Developer Quiz</h1>

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

export default IDataScience;