import { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

/* ================= QUESTIONS ================= */

const frontendQuestions = [
  { q: "HTML is used for?", options: ["Styling", "Structure", "Database", "Server"], answer: 1 },
  { q: "CSS is mainly for?", options: ["Logic", "Database", "Styling", "API"], answer: 2 },
  { q: "JavaScript is used for?", options: ["Interactivity", "Only Design", "Storage", "Testing"], answer: 0 },
  { q: "Git is used for?", options: ["UI Design", "Version Control", "Database", "Hosting"], answer: 1 },
  { q: "Responsive design means?", options: ["Fits all devices", "Only desktop", "Only mobile", "No CSS"], answer: 0 },
];

const reactQuestions = [
  { q: "React is a?", options: ["Database", "Frontend Library", "Server", "IDE"], answer: 1 },
  { q: "Hook used for state?", options: ["useEffect", "useState", "useRouter", "useCSS"], answer: 1 },
  { q: "React Router is used for?", options: ["Database", "Navigation", "Styling", "Testing"], answer: 1 },
  { q: "Props are used for?", options: ["Component communication", "Database storage", "Security", "Hosting"], answer: 0 },
  { q: "Axios is used for?", options: ["API Calls", "UI Design", "Deployment", "Testing"], answer: 0 },
];

const backendQuestions = [
  { q: "Node.js is a?", options: ["Runtime Environment", "Database", "Frontend Tool", "CSS Library"], answer: 0 },
  { q: "Express.js is used for?", options: ["Backend Framework", "Database tool", "UI Design", "Testing"], answer: 0 },
  { q: "REST API is used for?", options: ["Communication", "Styling", "Animation", "Excel"], answer: 0 },
  { q: "JWT is used for?", options: ["Authentication", "Database", "UI", "Sorting"], answer: 0 },
  { q: "Middleware works as?", options: ["Between request & response", "Database storage", "UI Element", "HTML Tag"], answer: 0 },
];

const mongoQuestions = [
  { q: "MongoDB is a?", options: ["SQL Database", "NoSQL Database", "Frontend Tool", "Testing Framework"], answer: 1 },
  { q: "CRUD means?", options: ["Create Read Update Delete", "Code Run Upload Download", "Cloud Resource Usage Data", "None"], answer: 0 },
  { q: "Mongoose is used for?", options: ["MongoDB ODM", "React Styling", "Deployment", "Testing"], answer: 0 },
  { q: "Collections store?", options: ["Documents", "CSS Files", "HTML Pages", "React Hooks"], answer: 0 },
  { q: "MongoDB stores data in?", options: ["Tables", "Documents", "Rows", "Columns"], answer: 1 },
];

const advancedQuestions = [
  { q: "Redux is mainly used for?", options: ["State Management", "Database", "Hosting", "Animations"], answer: 0 },
  { q: "WebSockets enable?", options: ["Real-time communication", "Static pages", "Only styling", "No backend"], answer: 0 },
  { q: "Next.js is a framework for?", options: ["React", "MongoDB", "Express", "SQL"], answer: 0 },
  { q: "Jest is used for?", options: ["Testing", "Database", "Cloud Storage", "Deployment"], answer: 0 },
  { q: "Portfolio projects are important for?", options: ["Jobs", "Only Exams", "UI Design Only", "Nothing"], answer: 0 },
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
          <p>{q.q}</p>

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

          <div className="quiz-actions">
            {current > 0 && (
              <button onClick={() => setCurrent(current - 1)}>Previous</button>
            )}

            {current < questions.length - 1 ? (
              <button onClick={() => setCurrent(current + 1)}>Next</button>
            ) : (
              <button
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

function MernStack() {
  const navigate = useNavigate();
  const [passed, setPassed] = useState({
    frontend: false,
    react: false,
    backend: false,
    mongo: false,
    advanced: false,
  });

  return (
    <div className="roadmap-container">
      <div className="top-bar">
        <div>
          <h1 className="title">MERN Stack</h1>
          <h2 className="subtitle">Skill Assessment</h2>
        </div>

        <button className="syllabus-btn" onClick={() => navigate("/mernstacksyllabus")}>
          Roadmap
        </button>
      </div>

      <QuizCard
        title="Frontend Foundations"
        questions={frontendQuestions}
        passed={passed.frontend}
        onFinish={(v) => setPassed({ ...passed, frontend: v })}
      />

      {passed.frontend && (
        <QuizCard
          title="React.js"
          questions={reactQuestions}
          passed={passed.react}
          onFinish={(v) => setPassed({ ...passed, react: v })}
        />
      )}

      {passed.react && (
        <QuizCard
          title="Node.js & Express.js"
          questions={backendQuestions}
          passed={passed.backend}
          onFinish={(v) => setPassed({ ...passed, backend: v })}
        />
      )}

      {passed.backend && (
        <QuizCard
          title="MongoDB"
          questions={mongoQuestions}
          passed={passed.mongo}
          onFinish={(v) => setPassed({ ...passed, mongo: v })}
        />
      )}

      {passed.mongo && (
        <QuizCard
          title="Advanced MERN Topics"
          questions={advancedQuestions}
          passed={passed.advanced}
          onFinish={(v) => setPassed({ ...passed, advanced: v })}
        />
      )}

      {passed.advanced && (
        <div className="course-complete">
          <h2 style={{ color: "green" }}>MERN Stack Course Completed ✅</h2>
          <p>Now you can proceed with the Intermediate MERN Stack course.</p>
        </div>
      )}
    </div>
  );
}

export default MernStack;
