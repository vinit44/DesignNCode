import { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

/* ================= QUESTIONS ================= */

// -------- CORE JAVA --------
const coreJavaQuestions = [
  { q: "What is Java?", options: ["Markup language", "Programming language", "Database", "OS"], answer: 1 },
  { q: "Which runs Java bytecode?", options: ["JDK", "JRE", "JVM", "Compiler"], answer: 2 },
  { q: "Keyword to create object?", options: ["class", "new", "this", "object"], answer: 1 },
  { q: "Data type for true/false?", options: ["int", "boolean", "char", "double"], answer: 1 },
  { q: "Loop that runs at least once?", options: ["for", "while", "do-while", "foreach"], answer: 2 },
];

// -------- OOPS --------
const oopsQuestions = [
  { q: "Code reuse is achieved by?", options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"], answer: 2 },
  { q: "Keyword for inheritance?", options: ["implements", "extends", "inherits", "super"], answer: 1 },
  { q: "Multiple inheritance supported by?", options: ["Class", "Object", "Interface", "Constructor"], answer: 2 },
  { q: "Hiding internal data?", options: ["Abstraction", "Inheritance", "Encapsulation", "Polymorphism"], answer: 2 },
  { q: "Method overloading is?", options: ["Runtime", "Compile-time", "Inheritance", "Encapsulation"], answer: 1 },
];

// -------- JDBC & SPRING --------
const jdbcQuestions = [
  { q: "JDBC stands for?", options: ["Java DB Connect", "Java Database Connectivity", "Java Connector", "Java Direct"], answer: 1 },
  { q: "Method to connect DB?", options: ["getConnection()", "connect()", "open()", "dbConnect()"], answer: 0 },
  { q: "Executes SQL queries?", options: ["Driver", "Connection", "Statement", "ResultSet"], answer: 2 },
  { q: "ORM framework?", options: ["Spring", "Hibernate", "JSP", "Servlet"], answer: 1 },
  { q: "Spring Boot is for?", options: ["UI", "Database", "Standalone apps", "Networking"], answer: 2 },
];

// -------- EXCEPTION HANDLING --------
const exceptionQuestions = [
  { q: "Which is a checked exception?", options: ["NullPointerException", "IOException", "ArrayIndexOut", "Arithmetic"], answer: 1 },
  { q: "Block always executed?", options: ["try", "catch", "throw", "finally"], answer: 3 },
  { q: "Used to create custom exception?", options: ["extends Exception", "implements", "throws", "final"], answer: 0 },
  { q: "throw keyword is used to?", options: ["Handle exception", "Create exception", "Propagate", "Ignore"], answer: 1 },
  { q: "throws keyword is used to?", options: ["Catch exception", "Declare exception", "Create object", "Handle error"], answer: 1 },
];

// -------- COLLECTIONS + JAVA 8 --------
const collectionQuestions = [
  { q: "Which allows duplicate values?", options: ["Set", "List", "Map", "Queue"], answer: 1 },
  { q: "Used to sort objects?", options: ["Iterator", "Comparable", "Serializable", "Cloneable"], answer: 1 },
  { q: "Lambda introduced in?", options: ["Java 5", "Java 6", "Java 7", "Java 8"], answer: 3 },
  { q: "Stream API is used for?", options: ["File handling", "Data processing", "UI", "Networking"], answer: 1 },
  { q: "Functional interface has?", options: ["0 methods", "1 abstract method", "2 methods", "many methods"], answer: 1 },
];

// -------- WEB + FRAMEWORKS --------
const webQuestions = [
  { q: "Servlet is used to?", options: ["Design UI", "Handle requests", "Connect DB", "Style page"], answer: 1 },
  { q: "JSP is mainly used for?", options: ["Backend logic", "Presentation", "Database", "Security"], answer: 1 },
  { q: "REST API uses?", options: ["SOAP only", "HTTP methods", "FTP", "Sockets"], answer: 1 },
  { q: "Spring MVC follows?", options: ["Singleton", "MVC pattern", "DAO", "Factory"], answer: 1 },
  { q: "Hibernate is used for?", options: ["UI", "ORM", "Security", "Testing"], answer: 1 },
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
            {current > 0 && <button className="quiz-btn" onClick={() => setCurrent(current - 1)}>Previous</button>}
            {current < questions.length - 1 ? (
              <button className="quiz-btn" onClick={() => setCurrent(current + 1)}>Next</button>
            ) : (
              <button className="quiz-btn submit-btn" onClick={() => { setSubmitted(true); onFinish(score >= 15); }}>
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
function JavaDeveloper() {
  const navigate = useNavigate();
  const [passed, setPassed] = useState({
    core: false,
    oops: false,
    jdbc: false,
    exception: false,
    collection: false,
    web: false,
  });

  return (
    <div className="roadmap-container">
      <div className="top-bar">
        <div>
          <h1 className="title">Java Developer</h1>
          <h2 className="subtitle">Skill Assessment</h2>
        </div>
        <button className="syllabus-btn" onClick={() => navigate("/javasyllabus")}>
          Roadmap
        </button>
      </div>

      <QuizCard title="Core Java" questions={coreJavaQuestions} passed={passed.core}
        onFinish={(v) => setPassed({ ...passed, core: v })} />

      {passed.core && <QuizCard title="OOPs" questions={oopsQuestions} passed={passed.oops}
        onFinish={(v) => setPassed({ ...passed, oops: v })} />}

      {passed.oops && <QuizCard title="JDBC & Spring Basics" questions={jdbcQuestions} passed={passed.jdbc}
        onFinish={(v) => setPassed({ ...passed, jdbc: v })} />}

      {passed.jdbc && <QuizCard title="Exception Handling" questions={exceptionQuestions} passed={passed.exception}
        onFinish={(v) => setPassed({ ...passed, exception: v })} />}

      {passed.exception && <QuizCard title="Collections & Java 8" questions={collectionQuestions} passed={passed.collection}
        onFinish={(v) => setPassed({ ...passed, collection: v })} />}

      {passed.collection && <QuizCard title="Web & Frameworks" questions={webQuestions} passed={passed.web}
        onFinish={(v) => setPassed({ ...passed, web: v })} />}

      {passed.web && (
        <div className="course-complete">
          <h2 style={{ color: "green" }}>Java Developer Course Completed ✅</h2>
          <p>Now you can proceed with the Intermediate java course.</p>
        </div>
      )}
    </div>
  );
}

export default JavaDeveloper;

