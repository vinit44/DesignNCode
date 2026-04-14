import { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

/* ================= QUESTIONS ================= */

// -------- PYTHON FOR AI --------
const pythonQuestions = [
  { q: "Which library is used for numerical computing?", options: ["React", "NumPy", "Spring", "JUnit"], answer: 1 },
  { q: "Which is used for data manipulation?", options: ["Pandas", "Flask", "Django", "TensorFlow"], answer: 0 },
  { q: "Which symbol is used for comments?", options: ["//", "#", "/* */", "<!-- -->"], answer: 1 },
  { q: "Which data type is immutable?", options: ["List", "Set", "Tuple", "Dictionary"], answer: 2 },
  { q: "Which library is used for visualization?", options: ["Matplotlib", "Spring", "NumPy", "Keras"], answer: 0 },
];

// -------- MATHS FOR ML --------
const mathsQuestions = [
  { q: "Which is used to represent data?", options: ["Matrix", "String", "Loop", "Object"], answer: 0 },
  { q: "Derivative is part of?", options: ["Algebra", "Statistics", "Calculus", "Geometry"], answer: 2 },
  { q: "Which measures data spread?", options: ["Mean", "Median", "Variance", "Mode"], answer: 2 },
  { q: "Dot product is used in?", options: ["Vectors", "Strings", "Loops", "Files"], answer: 0 },
  { q: "Probability values range?", options: ["0–10", "0–1", "1–100", "-1–1"], answer: 1 },
];

// -------- MACHINE LEARNING --------
const mlQuestions = [
  { q: "Which is supervised learning?", options: ["Clustering", "Regression", "Association", "PCA"], answer: 1 },
  { q: "Algorithm for classification?", options: ["Linear Regression", "KNN", "Apriori", "K-Means"], answer: 1 },
  { q: "Overfitting means?", options: ["High bias", "High variance", "Low accuracy", "Less data"], answer: 1 },
  { q: "Train-test split is used for?", options: ["Cleaning", "Validation", "Deployment", "UI"], answer: 1 },
  { q: "Which library is used for ML?", options: ["Scikit-learn", "React", "Spring", "Bootstrap"], answer: 0 },
];

// -------- DEEP LEARNING --------
const dlQuestions = [
  { q: "Deep learning is based on?", options: ["Decision trees", "Neural networks", "Loops", "Sorting"], answer: 1 },
  { q: "Which library is used for DL?", options: ["TensorFlow", "JUnit", "Hibernate", "Express"], answer: 0 },
  { q: "CNN is used for?", options: ["Text", "Images", "Audio", "Numbers"], answer: 1 },
  { q: "RNN is useful for?", options: ["Images", "Time series", "Sorting", "Searching"], answer: 1 },
  { q: "Activation function introduces?", options: ["Linearity", "Non-linearity", "Loop", "Delay"], answer: 1 },
];

// -------- NLP & COMPUTER VISION --------
const nlpQuestions = [
  { q: "NLP stands for?", options: ["Neural Learning Process", "Natural Language Processing", "Node Language Program", "Network Logic"], answer: 1 },
  { q: "Tokenization is used in?", options: ["CV", "NLP", "ML only", "DL only"], answer: 1 },
  { q: "Which library is used for NLP?", options: ["NLTK", "NumPy", "Flask", "Spring"], answer: 0 },
  { q: "OpenCV is used for?", options: ["Web", "Database", "Computer Vision", "API"], answer: 2 },
  { q: "Face detection is part of?", options: ["NLP", "CV", "Regression", "Clustering"], answer: 1 },
];

/* ================= QUIZ CARD ================= */
function QuizCard({ title, questions, passed, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce(
    (t, q, i) => t + (answers[i] === q.answer ? 4 : 0),
    0
  );

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
                  onChange={() => setAnswers({ ...answers, [current]: i })}
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="quiz-actions">
            {current > 0 && (
              <button className="quiz-btn" onClick={() => setCurrent(current - 1)}>
                Previous
              </button>
            )}
            {current < questions.length - 1 ? (
              <button className="quiz-btn" onClick={() => setCurrent(current + 1)}>
                Next
              </button>
            ) : (
              <button
                className="quiz-btn submit-btn"
                onClick={() => {
                  setSubmitted(true);
                  onFinish(score >= 15);
                }}
              >
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <p>✅ Passed: {score >= 15 ? "Yes" : "No"}</p>
      )}
    </div>
  );
}

/* ================= MAIN PAGE ================= */
function AIML() {
  const navigate = useNavigate();
  const [passed, setPassed] = useState({
    python: false,
    maths: false,
    ml: false,
    dl: false,
    nlp: false,
  });

  return (
    <div className="roadmap-container">
      <div className="top-bar">
        <div>
          <h1 className="title">AI / ML Developer</h1>
          <h2 className="subtitle">Skill Assessment</h2>
        </div>

        <button className="syllabus-btn" onClick={() => navigate("/aimlsyllabus")}>
          Roadmap
        </button>
      </div>

      <QuizCard title="Python for AI" questions={pythonQuestions} passed={passed.python}
        onFinish={(v) => setPassed({ ...passed, python: v })} />

      {passed.python && (
        <QuizCard title="Maths for ML" questions={mathsQuestions} passed={passed.maths}
          onFinish={(v) => setPassed({ ...passed, maths: v })} />
      )}

      {passed.maths && (
        <QuizCard title="Machine Learning" questions={mlQuestions} passed={passed.ml}
          onFinish={(v) => setPassed({ ...passed, ml: v })} />
      )}

      {passed.ml && (
        <QuizCard title="Deep Learning" questions={dlQuestions} passed={passed.dl}
          onFinish={(v) => setPassed({ ...passed, dl: v })} />
      )}

      {passed.dl && (
        <QuizCard title="NLP & Computer Vision" questions={nlpQuestions} passed={passed.nlp}
          onFinish={(v) => setPassed({ ...passed, nlp: v })} />
      )}

      {passed.nlp && (
        <div className="course-complete">
          <h2 style={{ color: "green" }}>AI / ML Course Completed ✅</h2>
          <p>Now you can proceed with the Intermediate AiMl course</p>
        </div>
      )}
    </div>
  );
}

export default AIML;
