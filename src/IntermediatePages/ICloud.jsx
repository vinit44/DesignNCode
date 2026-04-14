import { useState } from "react";
import "./IFrontend.css"; // reuse same CSS

/* ================== 10 QUESTIONS TOTAL ================== */
const questions = [
  // Cloud Basics
  {
    q: "What does IaaS stand for?",
    options: [
      "Internet as a Service",
      "Infrastructure as a Service",
      "Information as a Service",
      "Instance as a Service",
    ],
    answer: 1,
  },
  {
    q: "Which cloud service model provides runtime and deployment tools?",
    options: ["IaaS", "PaaS", "SaaS", "FaaS"],
    answer: 1,
  },

  // Deployment Models
  {
    q: "Which cloud model is shared among multiple organizations?",
    options: ["Private Cloud", "Public Cloud", "Hybrid Cloud", "Community Cloud"],
    answer: 3,
  },
  {
    q: "Which model combines private and public cloud?",
    options: ["Public", "Private", "Hybrid", "Community"],
    answer: 2,
  },

  // Virtualization & Storage
  {
    q: "Which technology enables multiple OS on a single machine?",
    options: ["Containerization", "Virtualization", "Clustering", "Load Balancing"],
    answer: 1,
  },
  {
    q: "Which storage type is best for unstructured data?",
    options: ["Block Storage", "File Storage", "Object Storage", "Cache"],
    answer: 2,
  },

  // Networking & Security
  {
    q: "Which service distributes incoming traffic across servers?",
    options: ["Firewall", "Load Balancer", "DNS", "Proxy"],
    answer: 1,
  },
  {
    q: "Which cloud feature allows scaling resources automatically?",
    options: ["High Availability", "Auto Scaling", "Failover", "Replication"],
    answer: 1,
  },

  // Cloud Providers & Tools
  {
    q: "Which is NOT a major cloud provider?",
    options: ["AWS", "Azure", "Google Cloud", "Oracle Database"],
    answer: 3,
  },
  {
    q: "Which service is used to deploy applications using containers?",
    options: ["VM", "Docker", "Kubernetes", "FTP"],
    answer: 2,
  },
];

/* ================== QUIZ COMPONENT ================== */
function ICloud() {
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
      <h1 className="title">Intermediate Cloud Computing Quiz</h1>

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

export default ICloud;
