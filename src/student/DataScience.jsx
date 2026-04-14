import { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

/* ================= QUESTIONS ================= */

const foundationQuestions = [
  {
    q: "Which is important for Data Science math foundation?",
    options: ["Linear Algebra", "HTML", "Photoshop", "React"],
    answer: 0,
  },
  {
    q: "Probability helps in?",
    options: ["Predicting outcomes", "Web design", "UI testing", "CSS styling"],
    answer: 0,
  },
  {
    q: "Which Python library is used for data analysis?",
    options: ["Pandas", "Bootstrap", "Laravel", "Spring"],
    answer: 0,
  },
  {
    q: "Matplotlib is used for?",
    options: ["Data Visualization", "Database Queries", "Web Hosting", "Game Dev"],
    answer: 0,
  },
  {
    q: "SQL is mainly used for?",
    options: ["Database querying", "UI Design", "Testing automation", "Animations"],
    answer: 0,
  },
];

const databaseQuestions = [
  {
    q: "Which SQL clause is used to filter rows?",
    options: ["WHERE", "ORDER", "GROUP", "JOIN"],
    answer: 0,
  },
  {
    q: "JOIN is used to?",
    options: ["Combine tables", "Delete database", "Style UI", "Build ML model"],
    answer: 0,
  },
  {
    q: "MongoDB is an example of?",
    options: ["NoSQL Database", "Frontend tool", "Testing framework", "IDE"],
    answer: 0,
  },
  {
    q: "Data Cleaning involves?",
    options: ["Removing nulls & errors", "Writing CSS", "Deploying apps", "Sorting UI"],
    answer: 0,
  },
  {
    q: "Relational databases example?",
    options: ["MySQL", "Figma", "Excel", "Git"],
    answer: 0,
  },
];

const analyticsQuestions = [
  {
    q: "EDA stands for?",
    options: [
      "Exploratory Data Analysis",
      "Extra Design Algorithm",
      "Extended Debugging Approach",
      "External Data Application",
    ],
    answer: 0,
  },
  {
    q: "Power BI is used for?",
    options: ["Dashboards & Reports", "Mobile apps", "Game development", "Bug tracking"],
    answer: 0,
  },
  {
    q: "Key role of Data Analyst is?",
    options: ["Extract insights", "Write backend code", "Test UI", "Build animations"],
    answer: 0,
  },
  {
    q: "Tableau is a?",
    options: ["Visualization Tool", "Database", "Programming language", "Testing library"],
    answer: 0,
  },
  {
    q: "Communicating insights means?",
    options: ["Presenting results clearly", "Only coding", "Only deployment", "UI styling"],
    answer: 0,
  },
];

const mlQuestions = [
  {
    q: "Regression is used for?",
    options: ["Predicting continuous values", "Sorting arrays", "Building UI", "Testing apps"],
    answer: 0,
  },
  {
    q: "Classification predicts?",
    options: ["Categories/Labels", "Numbers only", "Fonts", "Colors"],
    answer: 0,
  },
  {
    q: "Clustering is?",
    options: ["Grouping similar data", "Database join", "UI testing", "Coding loop"],
    answer: 0,
  },
  {
    q: "Feature Engineering means?",
    options: ["Creating better input features", "Designing UI", "Fixing bugs", "Writing SQL"],
    answer: 0,
  },
  {
    q: "Deep Learning is mainly based on?",
    options: ["Neural Networks", "Sorting Algorithms", "Spreadsheets", "CSS"],
    answer: 0,
  },
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
function DataScience() {
  const navigate = useNavigate();
  const [passed, setPassed] = useState({
    foundation: false,
    database: false,
    analytics: false,
    ml: false,
  });

  return (
    <div className="roadmap-container">
      <div className="top-bar">
        <div>
          <h1 className="title">Data Science / Data Analyst</h1>
          <h2 className="subtitle">Skill Assessment</h2>
        </div>

        <button
          className="syllabus-btn"
          onClick={() => navigate("/datasciencesyllabus")}
        >
          Roadmap
        </button>
      </div>

      <QuizCard
        title="Foundations"
        questions={foundationQuestions}
        passed={passed.foundation}
        onFinish={(v) => setPassed({ ...passed, foundation: v })}
      />

      {passed.foundation && (
        <QuizCard
          title="Data Handling & Databases"
          questions={databaseQuestions}
          passed={passed.database}
          onFinish={(v) => setPassed({ ...passed, database: v })}
        />
      )}

      {passed.database && (
        <QuizCard
          title="Analytics & Business Skills"
          questions={analyticsQuestions}
          passed={passed.analytics}
          onFinish={(v) => setPassed({ ...passed, analytics: v })}
        />
      )}

      {passed.analytics && (
        <QuizCard
          title="Advanced Analytics / ML"
          questions={mlQuestions}
          passed={passed.ml}
          onFinish={(v) => setPassed({ ...passed, ml: v })}
        />
      )}

      {passed.ml && (
        <div className="course-complete">
          <h2 style={{ color: "green" }}>
            Data Science Course Completed ✅
          </h2>
          <p>Now you can proceed with the Intermediate Data Science course.</p>
        </div>
      )}
    </div>
  );
}

export default DataScience;
