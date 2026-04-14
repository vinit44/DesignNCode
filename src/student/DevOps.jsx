import { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

/* ================= QUESTIONS ================= */

const osBasicsQuestions = [
  { q: "Which OS is most commonly used in DevOps?", options: ["Windows", "macOS", "Linux", "DOS"], answer: 2 },
  { q: "Which command lists files in Linux?", options: ["ls", "dir", "list", "show"], answer: 0 },
  { q: "Which file permission allows execution?", options: ["r", "w", "x", "e"], answer: 2 },
  { q: "Which scripting language is commonly used for automation?", options: ["HTML", "Python", "CSS", "SQL"], answer: 1 },
  { q: "Which shell is most commonly used?", options: ["zsh", "bash", "fish", "cmd"], answer: 1 },
];

const networkingQuestions = [
  { q: "DNS is used to?", options: ["Store files", "Translate domain names", "Secure data", "Monitor servers"], answer: 1 },
  { q: "Which protocol is secure?", options: ["HTTP", "FTP", "HTTPS", "TCP"], answer: 2 },
  { q: "Which port is used for HTTPS?", options: ["21", "22", "80", "443"], answer: 3 },
  { q: "TCP/IP model has how many layers?", options: ["4", "5", "6", "7"], answer: 0 },
  { q: "Load balancers are used for?", options: ["Security", "Traffic distribution", "Storage", "Monitoring"], answer: 1 },
];

const versionControlQuestions = [
  { q: "Git is used for?", options: ["Testing", "Version control", "Deployment", "Monitoring"], answer: 1 },
  { q: "Which command initializes a repo?", options: ["git start", "git init", "git clone", "git begin"], answer: 1 },
  { q: "Which command uploads changes?", options: ["git pull", "git push", "git add", "git fetch"], answer: 1 },
  { q: "Branching helps in?", options: ["Deleting code", "Parallel development", "Testing only", "Monitoring"], answer: 1 },
  { q: "GitHub is a?", options: ["IDE", "Version control platform", "OS", "Compiler"], answer: 1 },
];

const yamlQuestions = [
  { q: "YAML is mainly used for?", options: ["Programming", "Configuration", "Styling", "Database"], answer: 1 },
  { q: "YAML depends heavily on?", options: ["Brackets", "Indentation", "Semicolons", "Quotes"], answer: 1 },
  { q: "YAML file extension?", options: [".json", ".xml", ".yml", ".cfg"], answer: 2 },
  { q: "YAML is used in?", options: ["Kubernetes", "Ansible", "GitHub Actions", "All"], answer: 3 },
  { q: "YAML alternative?", options: ["CSV", "JSON", "TXT", "DOC"], answer: 1 },
];

const dockerQuestions = [
  { q: "Docker is used for?", options: ["Virtualization", "Containerization", "Monitoring", "Testing"], answer: 1 },
  { q: "Docker image is?", options: ["Running container", "Blueprint of container", "Server", "OS"], answer: 1 },
  { q: "Dockerfile is used to?", options: ["Run container", "Build image", "Store logs", "Monitor apps"], answer: 1 },
  { q: "Which command runs a container?", options: ["docker run", "docker build", "docker pull", "docker stop"], answer: 0 },
  { q: "Docker volumes are used for?", options: ["Networking", "Storage", "Security", "Monitoring"], answer: 1 },
];

const cicdQuestions = [
  { q: "CI stands for?", options: ["Continuous Integration", "Code Integration", "Cloud Integration", "Inspection"], answer: 0 },
  { q: "CD stands for?", options: ["Code Delivery", "Continuous Deployment", "Cloud Deployment", "Distribution"], answer: 1 },
  { q: "Which is a CI/CD tool?", options: ["Docker", "Jenkins", "Linux", "AWS"], answer: 1 },
  { q: "CI/CD automates?", options: ["Testing & deployment", "UI design", "Monitoring", "Security"], answer: 0 },
  { q: "GitHub Actions is used for?", options: ["Hosting", "CI/CD", "Monitoring", "Logging"], answer: 1 },
];

const cloudQuestions = [
  { q: "Cloud computing provides?", options: ["Hardware only", "On-demand resources", "OS only", "Networking only"], answer: 1 },
  { q: "Which is a cloud provider?", options: ["Linux", "AWS", "Docker", "Git"], answer: 1 },
  { q: "IAM is used for?", options: ["Storage", "Access control", "Monitoring", "Deployment"], answer: 1 },
  { q: "Which service stores files?", options: ["EC2", "S3", "Lambda", "VPC"], answer: 1 },
  { q: "CloudFront is used for?", options: ["CDN", "Database", "Compute", "Security"], answer: 0 },
];

const kubernetesQuestions = [
  { q: "Kubernetes is used for?", options: ["Container orchestration", "Monitoring", "Testing", "Networking"], answer: 0 },
  { q: "Smallest deployable unit?", options: ["Node", "Pod", "Service", "Cluster"], answer: 1 },
  { q: "Which manages scaling?", options: ["Service", "Deployment", "Pod", "ConfigMap"], answer: 1 },
  { q: "Secrets store?", options: ["Config", "Sensitive data", "Logs", "Images"], answer: 1 },
  { q: "Rolling updates ensure?", options: ["Downtime", "Zero downtime", "Security", "Testing"], answer: 1 },
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
function DevOps() {
  const navigate = useNavigate();
  const [passed, setPassed] = useState({
    os: false,
    network: false,
    git: false,
    yaml: false,
    docker: false,
    cicd: false,
    cloud: false,
    k8s: false,
  });

  return (
    <div className="roadmap-container">
      <div className="top-bar">
        <div>
          <h1 className="title">DevOps Engineer</h1>
          <h2 className="subtitle">Skill Assessment</h2>
        </div>

        <button
          className="syllabus-btn"
          onClick={() => navigate("/devopssyllabus")}
        >
          Roadmap
        </button>
      </div>

      <QuizCard title="Programming & OS Basics" questions={osBasicsQuestions}
        passed={passed.os} onFinish={(v) => setPassed({ ...passed, os: v })} />

      {passed.os && (
        <QuizCard title="Networking Basics" questions={networkingQuestions}
          passed={passed.network} onFinish={(v) => setPassed({ ...passed, network: v })} />
      )}

      {passed.network && (
        <QuizCard title="Version Control (Git)" questions={versionControlQuestions}
          passed={passed.git} onFinish={(v) => setPassed({ ...passed, git: v })} />
      )}

      {passed.git && (
        <QuizCard title="YAML Configuration" questions={yamlQuestions}
          passed={passed.yaml} onFinish={(v) => setPassed({ ...passed, yaml: v })} />
      )}

      {passed.yaml && (
        <QuizCard title="Containers (Docker)" questions={dockerQuestions}
          passed={passed.docker} onFinish={(v) => setPassed({ ...passed, docker: v })} />
      )}

      {passed.docker && (
        <QuizCard title="CI / CD Pipelines" questions={cicdQuestions}
          passed={passed.cicd} onFinish={(v) => setPassed({ ...passed, cicd: v })} />
      )}

      {passed.cicd && (
        <QuizCard title="Cloud Fundamentals" questions={cloudQuestions}
          passed={passed.cloud} onFinish={(v) => setPassed({ ...passed, cloud: v })} />
      )}

      {passed.cloud && (
        <QuizCard title="Kubernetes" questions={kubernetesQuestions}
          passed={passed.k8s} onFinish={(v) => setPassed({ ...passed, k8s: v })} />
      )}

      {passed.k8s && (
        <div className="course-complete">
          <h2 style={{ color: "green" }}>
            DevOps Course Completed ✅
          </h2>
          <p>Now you can proceed with the Intermediate DevOps course.</p>
        </div>
      )}
    </div>
  );
}

export default DevOps;
