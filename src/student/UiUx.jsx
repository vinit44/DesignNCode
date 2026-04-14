import { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

/* ================= QUESTIONS ================= */

const fundamentalsQuestions = [
  { q: "UI stands for?", options: ["User Interaction", "User Interface", "Universal Interface", "Unique Integration"], answer: 1 },
  { q: "UX stands for?", options: ["User Experience", "User Extension", "Universal Experience", "User Example"], answer: 0 },
  { q: "Color theory helps in?", options: ["Coding", "Design balance", "Debugging", "Testing"], answer: 1 },
  { q: "Typography refers to?", options: ["Font styling", "Animations", "Layouts", "Prototyping"], answer: 0 },
  { q: "Good design should be?", options: ["Confusing", "User-friendly", "Complex", "Random"], answer: 1 },
];

const toolsQuestions = [
  { q: "Most popular UI/UX tool today?", options: ["MS Word", "Figma", "Excel", "GitHub"], answer: 1 },
  { q: "Adobe XD is used for?", options: ["Design & Prototyping", "Programming", "Testing", "Database"], answer: 0 },
  { q: "Prototype means?", options: ["Final product", "Design mockup", "Code file", "Bug report"], answer: 1 },
  { q: "InVision is mainly for?", options: ["Prototyping", "Coding", "Sorting", "Hosting"], answer: 0 },
  { q: "Wireframes are?", options: ["UI layouts", "Backend code", "Database tables", "Security rules"], answer: 0 },
];

const uxDesignQuestions = [
  { q: "User research helps to?", options: ["Understand users", "Write code", "Deploy apps", "Fix bugs"], answer: 0 },
  { q: "Persona is?", options: ["User profile", "Color palette", "Typography rule", "Testing method"], answer: 0 },
  { q: "User flow represents?", options: ["Coding flow", "Steps user takes", "Database schema", "Sorting algorithm"], answer: 1 },
  { q: "Prototype is useful for?", options: ["Testing design idea", "Writing SQL", "Debugging", "Automation"], answer: 0 },
  { q: "UX focuses mainly on?", options: ["User satisfaction", "Server speed", "Database size", "Programming"], answer: 0 },
];

const uiDesignQuestions = [
  { q: "Design system is?", options: ["Reusable UI components", "Database system", "Testing system", "Code compiler"], answer: 0 },
  { q: "Accessibility means?", options: ["Everyone can use design", "Only designers can access", "Restricted UI", "Private design"], answer: 0 },
  { q: "Responsive design means?", options: ["Fits all screen sizes", "Only desktop design", "Only mobile design", "Only animations"], answer: 0 },
  { q: "Mobile-first approach means?", options: ["Design for mobile first", "Design for desktop first", "Ignore mobile", "No UI needed"], answer: 0 },
  { q: "UI focuses on?", options: ["Look & feel", "Backend code", "Server security", "Database queries"], answer: 0 },
];

const advancedQuestions = [
  { q: "Usability testing checks?", options: ["Ease of use", "Database speed", "Coding errors", "Deployment"], answer: 0 },
  { q: "A/B testing compares?", options: ["Two design versions", "Two databases", "Two codes", "Two bugs"], answer: 0 },
  { q: "Motion design improves?", options: ["User engagement", "Database queries", "Automation scripts", "Bug fixing"], answer: 0 },
  { q: "Interactive prototype means?", options: ["Clickable design", "Static image", "Backend program", "SQL query"], answer: 0 },
  { q: "Portfolio is needed for?", options: ["Showcase skills", "Database storage", "System testing", "Automation"], answer: 0 },
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
            {current > 0 && <button onClick={() => setCurrent(current - 1)}>Previous</button>}

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

function UiUx() {
  const navigate = useNavigate();
  const [passed, setPassed] = useState({
    fundamentals: false,
    tools: false,
    ux: false,
    ui: false,
    advanced: false,
  });

  return (
    <div className="roadmap-container">
      <div className="top-bar">
        <div>
          <h1 className="title">UI / UX Design</h1>
          <h2 className="subtitle">Skill Assessment</h2>
        </div>

        <button className="syllabus-btn" onClick={() => navigate("/uiuxsyllabus")}>
          Roadmap
        </button>
      </div>

      <QuizCard title="Fundamentals" questions={fundamentalsQuestions}
        passed={passed.fundamentals}
        onFinish={(v) => setPassed({ ...passed, fundamentals: v })}
      />

      {passed.fundamentals && (
        <QuizCard title="Design Tools (Figma, XD)" questions={toolsQuestions}
          passed={passed.tools}
          onFinish={(v) => setPassed({ ...passed, tools: v })}
        />
      )}

      {passed.tools && (
        <QuizCard title="UX Design Concepts" questions={uxDesignQuestions}
          passed={passed.ux}
          onFinish={(v) => setPassed({ ...passed, ux: v })}
        />
      )}

      {passed.ux && (
        <QuizCard title="UI Design Principles" questions={uiDesignQuestions}
          passed={passed.ui}
          onFinish={(v) => setPassed({ ...passed, ui: v })}
        />
      )}

      {passed.ui && (
        <QuizCard title="Advanced Topics & Career" questions={advancedQuestions}
          passed={passed.advanced}
          onFinish={(v) => setPassed({ ...passed, advanced: v })}
        />
      )}

      {passed.advanced && (
        <div className="course-complete">
          <h2 style={{ color: "green" }}>UI / UX Design Course Completed ✅</h2>
          <p>Now you can proceed with the Intermediate UI/UX course.</p>
        </div>
      )}
    </div>
  );
}

export default UiUx;
