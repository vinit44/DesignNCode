import { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

/* ================= QUESTIONS ================= */

const htmlQuestions = [
  { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tool Markup Language", "Hyperlinks Text Markup Language"], answer: 0 },
  { q: "Which tag is used for the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<head>"], answer: 2 },
  { q: "Which attribute specifies image source?", options: ["href", "src", "path", "link"], answer: 1 },
  { q: "Which tag is semantic?", options: ["<div>", "<span>", "<section>", "<b>"], answer: 2 },
  { q: "Forms are mainly used for?", options: ["Styling", "User input", "Navigation", "Images"], answer: 1 },
];

const cssQuestions = [
  { q: "Which property controls text size?", options: ["font-style", "text-size", "font-size", "size"], answer: 2 },
  { q: "Which layout system is one-dimensional?", options: ["Grid", "Flexbox", "Table", "Float"], answer: 1 },
  { q: "Which unit is relative?", options: ["px", "cm", "em", "mm"], answer: 2 },
  { q: "Padding controls?", options: ["Outer space", "Inner space", "Border thickness", "Element size"], answer: 1 },
  { q: "Media queries are used for?", options: ["Animations", "Responsive design", "Security", "SEO"], answer: 1 },
];

const jsQuestions = [
  { q: "Which keyword declares a variable?", options: ["var", "int", "string", "define"], answer: 0 },
  { q: "Which method adds element to array?", options: ["add()", "push()", "insert()", "append()"], answer: 1 },
  { q: "DOM stands for?", options: ["Document Object Model", "Data Object Model", "Desktop Object Model", "Digital Object Model"], answer: 0 },
  { q: "Which is asynchronous?", options: ["for loop", "fetch()", "if", "switch"], answer: 1 },
  { q: "Promises are used for?", options: ["Styling", "Async operations", "Loops", "Conditions"], answer: 1 },
];

const reactQuestions = [
  { q: "React is mainly used for?", options: ["Database", "UI", "Server", "Compiler"], answer: 1 },
  { q: "Which hook is used for state?", options: ["useEffect", "useState", "useRef", "useMemo"], answer: 1 },
  { q: "Props are?", options: ["Mutable", "Read-only", "Functions", "States"], answer: 1 },
  { q: "Which library handles routing?", options: ["Redux", "React Router", "Axios", "Next.js"], answer: 1 },
  { q: "JSX stands for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extra"], answer: 0 },
];

const gitQuestions = [
  { q: "Git is used for?", options: ["Styling", "Version control", "Database", "Testing"], answer: 1 },
  { q: "Which command uploads code?", options: ["git pull", "git push", "git clone", "git init"], answer: 1 },
  { q: "Branching is useful for?", options: ["Deleting code", "Parallel development", "Deployment", "Testing only"], answer: 1 },
  { q: "npm stands for?", options: ["Node Package Manager", "New Package Manager", "Node Program Manager", "Network Package Manager"], answer: 0 },
  { q: "Vite is a?", options: ["Framework", "Build tool", "Database", "Library"], answer: 1 },
];

const backendQuestions = [
  { q: "Backend handles?", options: ["UI", "Logic & database", "Styling", "Animation"], answer: 1 },
  { q: "REST stands for?", options: ["Remote State Transfer", "Representational State Transfer", "Request State Transfer", "Response State Transfer"], answer: 1 },
  { q: "Authentication means?", options: ["Permission check", "User verification", "Encryption", "Authorization"], answer: 1 },
  { q: "Authorization controls?", options: ["Login", "Access rights", "Encryption", "Validation"], answer: 1 },
  { q: "MVC stands for?", options: ["Model View Controller", "Main View Controller", "Model Variable Class", "Module View Code"], answer: 0 },
];

const javaQuestions = [
  { q: "Which runs Java bytecode?", options: ["JDK", "JRE", "JVM", "Compiler"], answer: 2 },
  { q: "Which supports inheritance?", options: ["Object", "Class", "Interface", "Package"], answer: 1 },
  { q: "Exceptions handle?", options: ["Compilation", "Runtime errors", "Syntax", "Logic"], answer: 1 },
  { q: "Multithreading allows?", options: ["Single execution", "Parallel execution", "Security", "Database"], answer: 1 },
  { q: "Which stores key-value pairs?", options: ["List", "Set", "Map", "Queue"], answer: 2 },
];

const jdbcQuestions = [
  { q: "SQL is used for?", options: ["Styling", "Database management", "Routing", "Compilation"], answer: 1 },
  { q: "CRUD stands for?", options: ["Create Read Update Delete", "Copy Remove Update Delete", "Create Replace Use Delete", "Create Run Update Drop"], answer: 0 },
  { q: "JDBC stands for?", options: ["Java Database Connectivity", "Java Data Connector", "Java Direct Connectivity", "Java DB Control"], answer: 0 },
  { q: "Which object executes SQL?", options: ["Driver", "Connection", "Statement", "ResultSet"], answer: 2 },
  { q: "Transactions ensure?", options: ["Speed", "Atomicity", "UI", "Security"], answer: 1 },
];

const webQuestions = [
  { q: "Servlets are used for?", options: ["Styling", "Server-side logic", "Database", "Frontend UI"], answer: 1 },
  { q: "JSP is mainly used for?", options: ["Database", "Dynamic web pages", "Styling", "Security"], answer: 1 },
  { q: "REST APIs return data in?", options: ["HTML", "JSON", "CSS", "JSX"], answer: 1 },
  { q: "Spring MVC follows?", options: ["MVC pattern", "Singleton", "Factory", "Prototype"], answer: 0 },
  { q: "Which handles HTTP requests?", options: ["Controller", "Model", "View", "Entity"], answer: 0 },
];

const frameworkQuestions = [
  { q: "Spring Boot is used for?", options: ["UI design", "Standalone applications", "Database only", "Testing"], answer: 1 },
  { q: "Hibernate is an?", options: ["Framework", "ORM tool", "Database", "Server"], answer: 1 },
  { q: "Which file manages dependencies in Maven?", options: ["package.json", "pom.xml", "build.gradle", "config.js"], answer: 1 },
  { q: "Spring reduces?", options: ["Code", "Boilerplate", "Security", "Database"], answer: 1 },
  { q: "ORM stands for?", options: ["Object Relational Mapping", "Object Runtime Model", "Online Resource Manager", "Object Request Mapper"], answer: 0 },
];

const authQuestions = [
  { q: "JWT stands for?", options: ["Java Web Token", "JSON Web Token", "JavaScript Web Token", "Joint Web Token"], answer: 1 },
  { q: "Password hashing is used for?", options: ["Speed", "Security", "Storage", "Validation"], answer: 1 },
  { q: "Role-based access controls?", options: ["UI", "Permissions", "Styling", "Deployment"], answer: 1 },
  { q: "Authentication verifies?", options: ["User identity", "Permissions", "Encryption", "Data"], answer: 0 },
  { q: "HTTPS provides?", options: ["Speed", "Security", "SEO", "Hosting"], answer: 1 },
];

/* ================= QUIZ CARD ================= */

function QuizCard({ title, questions, passed, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (i) =>
    setAnswers({ ...answers, [current]: i });

  const calculateScore = () =>
    questions.reduce(
      (t, q, i) => t + (answers[i] === q.answer ? 4 : 0),
      0
    );

  const submitQuiz = () => {
    setSubmitted(true);
    onFinish(calculateScore() >= 15);
  };

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
                  onChange={() => handleSelect(i)}
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
              <button className="quiz-btn submit-btn" onClick={submitQuiz}>
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <p>✅ Passed: {calculateScore() >= 15 ? "Yes" : "No"}</p>
      )}
    </div>
  );
}

/* ================= MAIN PAGE ================= */
function FullStack() {
  const navigate = useNavigate();

  const [passed, setPassed] = useState({
    html: false,
    css: false,
    js: false,
    react: false,
    git: false,
    backend: false,
    java: false,
    jdbc: false,
    web: false,
    framework: false,
    auth: false,
  });

  return (
    <div className="roadmap-container">
      <div className="top-bar">
        <div>
          <h1 className="title">Full Stack Development</h1>
          <h2 className="subtitle">Skill Assessment</h2>
        </div>

        <button
          className="syllabus-btn"
          onClick={() => navigate("/fullstacksyllabus")}
        >
          Roadmap
        </button>
      </div>

      <QuizCard title="HTML Fundamentals" questions={htmlQuestions}
        passed={passed.html}
        onFinish={(v) => setPassed({ ...passed, html: v })}
      />

      {passed.html && (
        <QuizCard title="CSS Essentials" questions={cssQuestions}
          passed={passed.css}
          onFinish={(v) => setPassed({ ...passed, css: v })}
        />
      )}

      {passed.css && (
        <QuizCard title="JavaScript Core" questions={jsQuestions}
          passed={passed.js}
          onFinish={(v) => setPassed({ ...passed, js: v })}
        />
      )}

      {passed.js && (
        <QuizCard title="React Framework" questions={reactQuestions}
          passed={passed.react}
          onFinish={(v) => setPassed({ ...passed, react: v })}
        />
      )}

      {passed.react && (
        <QuizCard title="Git & Tools" questions={gitQuestions}
          passed={passed.git}
          onFinish={(v) => setPassed({ ...passed, git: v })}
        />
      )}

      {passed.git && (
        <QuizCard title="Backend Fundamentals" questions={backendQuestions}
          passed={passed.backend}
          onFinish={(v) => setPassed({ ...passed, backend: v })}
        />
      )}

      {passed.backend && (
        <QuizCard title="Java Core" questions={javaQuestions}
          passed={passed.java}
          onFinish={(v) => setPassed({ ...passed, java: v })}
        />
      )}

      {passed.java && (
        <QuizCard title="Database & JDBC" questions={jdbcQuestions}
          passed={passed.jdbc}
          onFinish={(v) => setPassed({ ...passed, jdbc: v })}
        />
      )}

      {passed.jdbc && (
        <QuizCard title="Java Web Tech" questions={webQuestions}
          passed={passed.web}
          onFinish={(v) => setPassed({ ...passed, web: v })}
        />
      )}

      {passed.web && (
        <QuizCard title="Spring & Hibernate" questions={frameworkQuestions}
          passed={passed.framework}
          onFinish={(v) => setPassed({ ...passed, framework: v })}
        />
      )}

      {passed.framework && (
        <QuizCard title="Authentication & Security" questions={authQuestions}
          passed={passed.auth}
          onFinish={(v) => setPassed({ ...passed, auth: v })}
        />
      )}

      {passed.auth && (
        <div className="course-complete">
          <h2 style={{ color: "green", fontWeight: "bold" }}>
            Full Stack Course Completed ✅
          </h2>
          <p>Now you can proceed with the Intermediate Full Stack course.</p>
        </div>
      )}
    </div>
  );
}
export default FullStack;
