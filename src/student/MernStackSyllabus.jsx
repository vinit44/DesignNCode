import "./Courses.css";
import { useNavigate } from "react-router-dom";

function MernSyllabus() {
  const navigate = useNavigate();

  const roadmap = [
    {
      title: "Frontend Foundations",
      topics: [
        "HTML, CSS, JavaScript Basics",
        "ES6+ Concepts",
        "Responsive Web Design",
        "DOM Manipulation",
        "Git & GitHub Basics",
      ],
    },
    {
      title: "React.js (Frontend Framework)",
      topics: [
        "Components & Props",
        "State & Hooks",
        "React Router",
        "API Calls (Axios/Fetch)",
        "React Project Building",
      ],
    },
    {
      title: "Backend Development (Node.js + Express.js)",
      topics: [
        "Node.js Basics",
        "Express Framework",
        "REST API Development",
        "Middleware Concepts",
        "Authentication (JWT)",
      ],
    },
    {
      title: "Database (MongoDB)",
      topics: [
        "NoSQL Basics",
        "MongoDB Collections & Documents",
        "CRUD Operations",
        "Mongoose ODM",
        "Database Relationships",
      ],
    },
    {
      title: "Full Stack Integration",
      topics: [
        "Connecting React with Node APIs",
        "Frontend + Backend Deployment",
        "File Uploads & Cloud Storage",
        "Project Architecture",
      ],
    },
    {
      title: "Advanced MERN Topics",
      topics: [
        "Redux Toolkit / Zustand",
        "Next.js Introduction",
        "WebSockets (Real-time Apps)",
        "Testing (Jest, React Testing Library)",
      ],
    },
    {
      title: "Projects & Portfolio",
      topics: [
        "Todo App (CRUD)",
        "E-commerce Website",
        "Social Media App",
        "Job Portal Project",
        "Deploy Full MERN App",
      ],
    },
    {
      title: "Certifications",
      topics: [
        "Udemy MERN Stack Full Course",
        "React Developer Certification",
        "Node.js Backend Bootcamp",
      ],
    },
  ];

  return (
    <div className="roadmap-container">
      {/* TOP BAR */}
      <div className="top-bar">
        <h1 className="title">MERN Stack Roadmap</h1>

        <button
          className="syllabus-btn"
          onClick={() => navigate("/mernstack")}
        >
          Return to Test
        </button>
      </div>

      <h2 className="subtitle">Roadmap</h2>

      {/* CARD GRID */}
      <div className="card-grid">
        {roadmap.map((card, index) => (
          <div className="roadmap-card" key={index}>
            <h3>
              {index + 1}. {card.title}
            </h3>
            <ul>
              {card.topics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* RESOURCES */}
      <section className="resources">
        <h3>Resources</h3>
        <a
          href="https://www.youtube.com/watch?v=7CqJlxBYj-M"
          target="_blank"
          rel="noreferrer"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>MERN Stack Full Course</h3>
            <p>MERN Stack Tutorial for Beginners</p>
          </div>
        </a>

        <a
          href="https://www.youtube.com/watch?v=bMknfKXIFA8"
          target="_blank"
          rel="noreferrer"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>React Full Course</h3>
            <p>React Crash Course</p>
          </div>
        </a>

        <a
          href="https://www.youtube.com/watch?v=Oe421EPjeBE"
          target="_blank"
          rel="noreferrer"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>Node.js + Express Tutorial</h3>
            <p>Node & Express Full Course</p>
          </div>
        </a>

        <a
          href="https://www.youtube.com/watch?v=-56x56UppqQ"
          target="_blank"
          rel="noreferrer"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>MongoDB Tutorial</h3>
            <p>MongoDB Full Course</p>
          </div>
        </a>

        <a
          href="https://www.udemy.com/course/mern-stack-front-to-back/"
          target="_blank"
          rel="noreferrer"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>Certification (Udemy)</h3>
            <p>MERN Stack Front-to-Back Course</p>
          </div>
        </a>
      </section>
    </div>
  );
}

export default MernSyllabus;