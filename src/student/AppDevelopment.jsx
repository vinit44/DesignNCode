import { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

/* ================= QUESTIONS ================= */

// -------- NATIVE ANDROID --------
const nativeAndroidQuestions = [
  { q: "Which language is mostly used for older Android apps?", options: ["Swift", "Java", "Kotlin", "JS"], answer: 1 },
  { q: "Official IDE for Android?", options: ["Xcode", "Android Studio", "VS Code", "PyCharm"], answer: 1 },
  { q: "Kotlin is future-ready because?", options: ["Subset of C++", "Superset of Java", "DB tool", "UI lib"], answer: 1 },
  { q: "Beginner Android project?", options: ["Weather App", "Blockchain", "Compiler", "Kernel"], answer: 0 },
  { q: "Jetpack Compose is for?", options: ["UI development", "Database", "Security", "Cloud"], answer: 0 },
];

// -------- IOS --------
const iosQuestions = [
  { q: "Language for iOS?", options: ["Java", "Swift", "Python", "PHP"], answer: 1 },
  { q: "IDE for iOS?", options: ["Android Studio", "Xcode", "Eclipse", "NetBeans"], answer: 1 },
  { q: "iOS jobs are known for?", options: ["Low salary", "High paying", "No jobs", "Backend only"], answer: 1 },
  { q: "Sample iOS app?", options: ["Rick & Morty App", "SQL Compiler", "Linux Kernel", "Sorting"], answer: 0 },
  { q: "Stanford courses are famous for?", options: ["UI only", "iOS Development", "DS", "Cyber"], answer: 1 },
];

// -------- CROSS PLATFORM --------
const crossPlatformQuestions = [
  { q: "Flutter is by?", options: ["Apple", "Google", "Microsoft", "Amazon"], answer: 1 },
  { q: "React Native is by?", options: ["Meta", "Google", "Netflix", "Tesla"], answer: 0 },
  { q: "Cross-platform means?", options: ["Only Android", "Single app for many OS", "Desktop only", "No UI"], answer: 1 },
  { q: "KMP stands for?", options: ["Kotlin Multiplatform", "Kubernetes Mobile", "Kernel Program", "None"], answer: 0 },
  { q: "Main benefit of Flutter?", options: ["Separate code", "Shared UI & code", "No UI", "Backend only"], answer: 1 },
];

// -------- API & CLOUD --------
const apiCloudQuestions = [
  { q: "REST API is used for?", options: ["App-server communication", "Animations", "Sorting", "Gaming"], answer: 0 },
  { q: "Firebase provides?", options: ["Cloud backend", "UI only", "Compiler", "OS"], answer: 0 },
  { q: "GraphQL is used for?", options: ["Query APIs", "UI", "Testing", "Java coding"], answer: 0 },
  { q: "Cloud Functions are?", options: ["Serverless backend", "UI styling", "Game engine", "Offline apps"], answer: 0 },
  { q: "API integration helps in?", options: ["Connecting services", "Fonts", "Themes", "None"], answer: 0 },
];

// -------- ADVANCED --------
const advancedQuestions = [
  { q: "CI/CD helps in?", options: ["Auto build & deploy", "UI only", "Manual testing", "Sorting"], answer: 0 },
  { q: "App security ensures?", options: ["Protection", "Animations", "Colors", "No code"], answer: 0 },
  { q: "Monetization means?", options: ["Earning from apps", "Deleting apps", "UI testing", "Learning Java"], answer: 0 },
  { q: "Unit testing checks?", options: ["Individual units", "OS", "Cloud", "Graphics"], answer: 0 },
  { q: "Figma is used for?", options: ["UI/UX design", "Database", "Backend", "Security"], answer: 0 },
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
function AppDevelopment() {
  const navigate = useNavigate();
  const [passed, setPassed] = useState({
    android: false,
    ios: false,
    cross: false,
    api: false,
    advanced: false,
  });

  return (
    <div className="roadmap-container">
      <div className="top-bar">
        <div>
          <h1 className="title">App Development</h1>
          <h2 className="subtitle">Skill Assessment</h2>
        </div>

        <button className="syllabus-btn" onClick={() => navigate("/appdevelopment/syllabus")}>
          Syllabus
        </button>
      </div>

      <QuizCard title="Native Android Development"
        questions={nativeAndroidQuestions}
        passed={passed.android}
        onFinish={(v) => setPassed({ ...passed, android: v })} />

      {passed.android && (
        <QuizCard title="Native iOS Development"
          questions={iosQuestions}
          passed={passed.ios}
          onFinish={(v) => setPassed({ ...passed, ios: v })} />
      )}

      {passed.ios && (
        <QuizCard title="Cross Platform Frameworks"
          questions={crossPlatformQuestions}
          passed={passed.cross}
          onFinish={(v) => setPassed({ ...passed, cross: v })} />
      )}

      {passed.cross && (
        <QuizCard title="API Integration & Cloud"
          questions={apiCloudQuestions}
          passed={passed.api}
          onFinish={(v) => setPassed({ ...passed, api: v })} />
      )}

      {passed.api && (
        <QuizCard title="Advanced Topics"
          questions={advancedQuestions}
          passed={passed.advanced}
          onFinish={(v) => setPassed({ ...passed, advanced: v })} />
      )}

      {passed.advanced && (
        <div className="course-complete">
          <h2 style={{ color: "green" }}>
            App Development Course Completed ✅
          </h2>
          <p> Now you can proceed with the Intermediate AppDevelopment course. </p>
        </div>
      )}
    </div>
  );
}

export default AppDevelopment;
