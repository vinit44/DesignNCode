import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Beginner.css";

const Beginner = () => {
  const [domain, setDomain] = useState("");
  const navigate = useNavigate();

  const routeMap = {
    frontend: "/frontend",
    javadeveloper: "/javadeveloper",
    fullstack: "/fullstack",
    devops: "/devops",
    dsa: "/dsa",
    testing: "/testing",
    uiux: "/uiux",
    datascience: "/datascience",
    appdevelopment: "/appdevelopment",
    aiml: "/aiml",
    mernstack: "/mernstack",
    cloud: "/cloud",
  };

  const handleContinue = () => {
    if (domain) {
      navigate(routeMap[domain]);
    }
  };

  return (
    <div className="beginner-page">
      {/* HEADER */}
      <div className="beginner-header">
        <button
          className="back-btn"
          onClick={() => navigate("/student/dashboard")}
        >
          ← Back
        </button>
        <div>
          <h1>Beginner Learning Path</h1>
          <p className="subtitle">Choose your domain to get a guided roadmap</p>
        </div>
      </div>

      {/* Choose Domain */}
      <div className="domain-section">
        
        <div className="domain-cards">
          {[
            {
              key: "frontend",
              title: "Frontend",
              desc: "HTML, CSS, JavaScript, React",
            },
            {
              key: "javadeveloper",
              title: "Java Developer",
              desc: "Java, Spring Boot, Collections",
            },
            {
              key: "fullstack",
              title: "Full Stack",
              desc: "Frontend + Backend + Database",
            },
            { key: "devops", title: "DevOps", desc: "Linux, Git, CI/CD, Docker" },
            { key: "dsa", title: "DSA", desc: "Arrays, Linked List, Trees, DSA" },
            {
              key: "testing",
              title: "Software Testing",
              desc: "Manual Testing, Automation Basics",
            },
            {
              key: "uiux",
              title: "UI/UX Design",
              desc: "Frontend + Backend + Database",
            },
            {
              key: "datascience",
              title: "Data Science",
              desc: "Python, Data Analysis, Statistics",
            },
            {
              key: "appdevelopment",
              title: "App Development",
              desc: "Android, Flutter, React Native",
            },
            {
              key: "aiml",
              title: "AI & Machine Learning",
              desc: "Python, Machine Learning, AI Basics",
            },
            {
              key: "mernstack",
              title: "MERN Stack",
              desc: "MongoDB, Express, React, Node",
            },
            {
              key: "cloud",
              title: "Cloud Computing",
              desc: "AWS, Cloud Basics, Deployment",
            },
          ].map((item) => (
            <div
              key={item.key}
              className={`domain-card ${domain === item.key ? "active" : ""}`}
              onClick={() => setDomain(item.key)}
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        className="continue-btn"
        disabled={!domain}
        onClick={handleContinue}
      >
        Start Learning
      </button>
    </div>
  );
};

export default Beginner;
