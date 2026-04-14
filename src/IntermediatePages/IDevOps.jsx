import { useState } from "react";
import "./IFrontend.css"; // reuse same CSS

/* ================== 10 QUESTIONS TOTAL ================== */
const questions = [
  // CI/CD
  {
    q: "Which tool is commonly used for continuous integration and deployment?",
    options: ["Jenkins", "Docker", "Kubernetes", "Terraform"],
    answer: 0,
  },
  {
    q: "What does CI/CD stand for?",
    options: ["Continuous Integration/Continuous Deployment", "Code Integration/Code Deployment", "Cloud Infrastructure/Cloud Delivery", "Container Integration/Container Deployment"],
    answer: 0,
  },

  // Containerization
  {
    q: "Which platform is used for container orchestration?",
    options: ["Docker", "Kubernetes", "Ansible", "Git"],
    answer: 1,
  },
  {
    q: "What is a Docker image?",
    options: ["A running container", "A blueprint for containers", "A virtual machine", "A database schema"],
    answer: 1,
  },

  // Infrastructure as Code
  {
    q: "Which tool is used for infrastructure provisioning as code?",
    options: ["Terraform", "Jenkins", "Prometheus", "Grafana"],
    answer: 0,
  },
  {
    q: "What is the purpose of Ansible in DevOps?",
    options: ["Monitoring logs", "Automating configuration management", "Version control", "Database querying"],
    answer: 1,
  },

  // Monitoring and Logging
  {
    q: "Which tool is used for application monitoring and alerting?",
    options: ["ELK Stack", "Prometheus", "GitLab CI", "AWS CloudFormation"],
    answer: 1,
  },
  {
    q: "What does ELK stand for in the context of logging?",
    options: ["Elasticsearch, Logstash, Kibana", "Enterprise Logging Kit", "Event Logging Kernel", "Elastic Kubernetes Layer"],
    answer: 0,
  },

  // Cloud and Version Control
  {
    q: "Which Git command is used to merge branches?",
    options: ["git merge", "git pull", "git push", "git clone"],
    answer: 0,
  },
  {
    q: "In AWS, what service is used for scalable compute capacity?",
    options: ["EC2", "S3", "RDS", "Lambda"],
    answer: 0,
  },
];

/* ================== QUIZ COMPONENT ================== */
function IDevOps() {
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
      <h1 className="title">Intermediate DevOps Developer Quiz</h1>

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

export default IDevOps;