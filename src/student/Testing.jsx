import { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

/* ================= QUESTIONS ================= */

const foundationQuestions = [
  { q: "What does SDLC stand for?", options: ["Software Development Life Cycle", "System Design Logic Code", "Software Debugging Level Cycle", "System Development Learning Course"], answer: 0 },
  { q: "STLC stands for?", options: ["Software Testing Life Cycle", "System Testing Logic Cycle", "Software Technical Learning Code", "System Test Load Check"], answer: 0 },
  { q: "Manual testing means?", options: ["Testing without automation tools", "Testing using Selenium", "Testing using scripts", "Testing databases only"], answer: 0 },
  { q: "Regression testing is done to?", options: ["Check new bugs after changes", "Remove old bugs", "Increase performance", "Improve UI"], answer: 0 },
  { q: "Smoke testing is performed to?", options: ["Verify basic build stability", "Test security", "Test performance", "Check database"], answer: 0 },
];

const manualTestingQuestions = [
  { q: "Test case contains?", options: ["Only output", "Steps + Expected Result", "Only input", "Only code"], answer: 1 },
  { q: "Bug life cycle starts with?", options: ["Closed", "New", "Fixed", "Rejected"], answer: 1 },
  { q: "Exploratory testing means?", options: ["Testing without planning", "Testing with automation", "Only regression testing", "Only performance testing"], answer: 0 },
  { q: "Agile methodology works in?", options: ["Phases", "Iterations/Sprints", "Waterfall steps", "Single release"], answer: 1 },
  { q: "Sanity testing is done after?", options: ["Major release", "Minor bug fix", "UI design", "Coding"], answer: 1 },
];

const programmingQuestions = [
  { q: "Which language is commonly used in automation?", options: ["Java", "HTML", "CSS", "XML"], answer: 0 },
  { q: "OOP stands for?", options: ["Object Oriented Programming", "Open Output Process", "Operational Object Program", "Order of Programming"], answer: 0 },
  { q: "Git is mainly used for?", options: ["Version control", "UI design", "Testing manually", "Database storage"], answer: 0 },
  { q: "Which is NOT an OOP concept?", options: ["Encapsulation", "Inheritance", "Recursion", "Polymorphism"], answer: 2 },
  { q: "Automation requires knowledge of?", options: ["Programming basics", "Only manual testing", "Only UI", "No skills"], answer: 0 },
];

const automationQuestions = [
  { q: "Selenium is used for?", options: ["Web automation testing", "Mobile app design", "Database storage", "Cloud hosting"], answer: 0 },
  { q: "Postman is used for?", options: ["API Testing", "UI Testing", "Performance testing", "Security scanning"], answer: 0 },
  { q: "TestNG is used for?", options: ["Test framework in Java", "Database tool", "Cloud deployment", "UI design"], answer: 0 },
  { q: "POM stands for?", options: ["Page Object Model", "Process Output Method", "Programming Object Machine", "Public Object Module"], answer: 0 },
  { q: "API testing verifies?", options: ["Backend communication", "Only UI", "Only browser speed", "Only design"], answer: 0 },
];

const advancedQuestions = [
  { q: "Jenkins is mainly used for?", options: ["CI/CD", "UI testing", "Manual testing", "Sorting algorithms"], answer: 0 },
  { q: "JMeter is used for?", options: ["Performance Testing", "UI Design", "Automation coding", "Database storage"], answer: 0 },
  { q: "Appium is used for?", options: ["Mobile Automation Testing", "Web development", "Database queries", "Security scanning"], answer: 0 },
  { q: "OWASP Top 10 relates to?", options: ["Security vulnerabilities", "Sorting methods", "Programming languages", "Testing documentation"], answer: 0 },
  { q: "CI/CD improves?", options: ["Continuous integration & delivery", "Only UI styling", "Manual debugging", "Database backup"], answer: 0 },
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

function Testing() {
  const navigate = useNavigate();
  const [passed, setPassed] = useState({
    foundation: false,
    manual: false,
    programming: false,
    automation: false,
    advanced: false,
  });

  return (
    <div className="roadmap-container">
      <div className="top-bar">
        <div>
          <h1 className="title">Software Testing</h1>
          <h2 className="subtitle">Skill Assessment</h2>
        </div>

        <button className="syllabus-btn" onClick={() => navigate("/testingsyllabus")}>
          Roadmap
        </button>
      </div>

      <QuizCard title="Foundations (SDLC & STLC)" questions={foundationQuestions}
        passed={passed.foundation}
        onFinish={(v) => setPassed({ ...passed, foundation: v })}
      />

      {passed.foundation && (
        <QuizCard title="Core Manual Testing" questions={manualTestingQuestions}
          passed={passed.manual}
          onFinish={(v) => setPassed({ ...passed, manual: v })}
        />
      )}

      {passed.manual && (
        <QuizCard title="Programming + Git Basics" questions={programmingQuestions}
          passed={passed.programming}
          onFinish={(v) => setPassed({ ...passed, programming: v })}
        />
      )}

      {passed.programming && (
        <QuizCard title="Automation Testing (Selenium & API)" questions={automationQuestions}
          passed={passed.automation}
          onFinish={(v) => setPassed({ ...passed, automation: v })}
        />
      )}

      {passed.automation && (
        <QuizCard title="Advanced Tools (CI/CD + JMeter + Appium)" questions={advancedQuestions}
          passed={passed.advanced}
          onFinish={(v) => setPassed({ ...passed, advanced: v })}
        />
      )}

      {passed.advanced && (
        <div className="course-complete">
          <h2 style={{ color: "green" }}>Software Testing Course Completed ✅</h2>
          <p>Now you can proceed with the Intermediate Testing course.</p>
        </div>
      )}
    </div>
  );
}

export default Testing;
