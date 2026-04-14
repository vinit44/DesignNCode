import { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

/* ================= QUESTIONS ================= */

const foundationQuestions = [
  {
    q: "Cloud Computing means?",
    options: [
      "Storing data on local computer",
      "Using remote servers over internet",
      "Only coding apps",
      "Only designing UI",
    ],
    answer: 1,
  },
  {
    q: "IaaS stands for?",
    options: [
      "Internet as a Service",
      "Infrastructure as a Service",
      "Integration as a System",
      "Instance as a Storage",
    ],
    answer: 1,
  },
  {
    q: "Public cloud example is?",
    options: ["AWS", "USB Drive", "Laptop", "Printer"],
    answer: 0,
  },
  {
    q: "Virtualization helps in?",
    options: [
      "Running multiple OS on one machine",
      "Only UI design",
      "Only testing apps",
      "No use",
    ],
    answer: 0,
  },
  {
    q: "Hybrid cloud is?",
    options: [
      "Only private cloud",
      "Only public cloud",
      "Combination of both",
      "No cloud usage",
    ],
    answer: 2,
  },
];

const coreCloudQuestions = [
  {
    q: "AWS EC2 is a?",
    options: ["Storage Service", "Virtual Server", "Database Tool", "UI Tool"],
    answer: 1,
  },
  {
    q: "S3 in AWS is used for?",
    options: ["Compute", "Storage", "Testing", "Monitoring"],
    answer: 1,
  },
  {
    q: "Load Balancer is used for?",
    options: [
      "Distributing traffic across servers",
      "Writing SQL queries",
      "UI styling",
      "Stopping deployments",
    ],
    answer: 0,
  },
  {
    q: "VPC stands for?",
    options: [
      "Virtual Private Cloud",
      "Visual Processing Center",
      "Virtual Program Code",
      "Version Process Control",
    ],
    answer: 0,
  },
  {
    q: "Cloud database example?",
    options: ["RDS", "MS Paint", "Figma", "HTML"],
    answer: 0,
  },
];

const devopsQuestions = [
  {
    q: "Docker is used for?",
    options: ["Containers", "Databases", "UI mockups", "Excel sheets"],
    answer: 0,
  },
  {
    q: "Kubernetes is used for?",
    options: ["Managing containers", "Designing UI", "Testing manually", "Writing CSS"],
    answer: 0,
  },
  {
    q: "Terraform is?",
    options: [
      "Infrastructure as Code tool",
      "Machine learning library",
      "UI tool",
      "Database engine",
    ],
    answer: 0,
  },
  {
    q: "CI/CD helps in?",
    options: [
      "Automated build & deployment",
      "Only manual testing",
      "Only database management",
      "Writing HTML",
    ],
    answer: 0,
  },
  {
    q: "Linux is important for?",
    options: [
      "Cloud server management",
      "UI design",
      "Excel dashboards",
      "Graphic editing",
    ],
    answer: 0,
  },
];

const securityQuestions = [
  {
    q: "IAM stands for?",
    options: [
      "Identity & Access Management",
      "Internet Access Mode",
      "Instance Allocation Method",
      "Internal Application Monitor",
    ],
    answer: 0,
  },
  {
    q: "Encryption ensures?",
    options: [
      "Secure data protection",
      "Better UI",
      "Faster coding",
      "Automatic deployment",
    ],
    answer: 0,
  },
  {
    q: "CloudWatch is used for?",
    options: ["Monitoring AWS services", "UI Design", "SQL Queries", "Coding React"],
    answer: 0,
  },
  {
    q: "Key management is related to?",
    options: ["Security", "Sorting", "UI layout", "App animation"],
    answer: 0,
  },
  {
    q: "Cloud security focuses on?",
    options: [
      "Protecting cloud resources",
      "Only web styling",
      "Only gaming",
      "Only automation",
    ],
    answer: 0,
  },
];

const advancedQuestions = [
  {
    q: "Serverless computing example?",
    options: ["AWS Lambda", "EC2", "S3", "MySQL"],
    answer: 0,
  },
  {
    q: "Cloud migration means?",
    options: [
      "Moving applications to cloud",
      "Deleting apps",
      "Only UI redesign",
      "Only testing",
    ],
    answer: 0,
  },
  {
    q: "Big Data tools include?",
    options: ["Hadoop & Spark", "HTML", "Figma", "CSS"],
    answer: 0,
  },
  {
    q: "Cloud AI services provide?",
    options: ["Machine Learning tools", "UI styling", "Bug fixing", "Gaming only"],
    answer: 0,
  },
  {
    q: "Portfolio projects are needed for?",
    options: ["Job opportunities", "Only exams", "UI mockups", "None"],
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
function Cloud() {
  const navigate = useNavigate();
  const [passed, setPassed] = useState({
    foundation: false,
    core: false,
    devops: false,
    security: false,
    advanced: false,
  });

  return (
    <div className="roadmap-container">
      <div className="top-bar">
        <div>
          <h1 className="title">Cloud Computing</h1>
          <h2 className="subtitle">Skill Assessment</h2>
        </div>

        <button className="syllabus-btn" onClick={() => navigate("/cloudsyllabus")}>
          Roadmap
        </button>
      </div>

      <QuizCard
        title="Cloud Foundations"
        questions={foundationQuestions}
        passed={passed.foundation}
        onFinish={(v) => setPassed({ ...passed, foundation: v })}
      />

      {passed.foundation && (
        <QuizCard
          title="Core Cloud Services"
          questions={coreCloudQuestions}
          passed={passed.core}
          onFinish={(v) => setPassed({ ...passed, core: v })}
        />
      )}

      {passed.core && (
        <QuizCard
          title="DevOps & Automation"
          questions={devopsQuestions}
          passed={passed.devops}
          onFinish={(v) => setPassed({ ...passed, devops: v })}
        />
      )}

      {passed.devops && (
        <QuizCard
          title="Security & Monitoring"
          questions={securityQuestions}
          passed={passed.security}
          onFinish={(v) => setPassed({ ...passed, security: v })}
        />
      )}

      {passed.security && (
        <QuizCard
          title="Advanced Cloud Concepts"
          questions={advancedQuestions}
          passed={passed.advanced}
          onFinish={(v) => setPassed({ ...passed, advanced: v })}
        />
      )}

      {passed.advanced && (
        <div className="course-complete">
          <h2 style={{ color: "green" }}>
            Cloud Computing Course Completed ✅
          </h2>
          <p>Now you can proceed with the Intermediate Cloud course.</p>
        </div>
      )}
    </div>
  );
}

export default Cloud;
