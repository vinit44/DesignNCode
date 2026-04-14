import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IFrontend.css";

function Intermediate() {
  const [domain, setDomain] = useState("");
  const navigate = useNavigate();

  const routeMap = {
    ifrontend: "/ifrontend",
    ijavadeveloper: "/ijavadeveloper",
    ifullstack: "/ifullstack",
    idevpops: "/idevops",
    idsa: "/idsa",
    itesting: "/itesting",
    iuiux: "/iuiux",
    idatascience: "/idatascience",
    appdevelopment: "/appdevelopment",
    iaiml: "/iaiml",
    imernstack: "/imernstack",
    icloud: "/icloud",
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
          <h1>Evaluate your intermediate-level skills</h1>
          <p className="subtitle">Choose your domain to get a Test</p>
        </div>
      </div>

      {/* Choose Domain */}
      <div className="domain-section">
        {/* <h2>Choose Your Domain</h2> */}
        <div className="domain-cards">
          {[
            { key: "ifrontend", title: "Frontend", desc: "HTML, CSS, JavaScript, React" },
            { key: "ijavadeveloper", title: "Java Developer", desc: "Java, Spring Boot, Collections" },
            { key: "ifullstack", title: "Full Stack", desc: "Frontend + Backend + Database" },
            { key: "idevpops", title: "DevOps", desc: "Linux, Git, CI/CD, Docker" },
            { key: "idsa", title: "DSA", desc: "Arrays, Linked List, Trees, DSA" },
            { key: "itesting", title: "Software Testing", desc: "Manual Testing, Automation Basics" },
            { key: "iuiux", title: "UI/UX Design", desc: "Frontend + Backend + Database" },
            { key: "idatascience", title: "Data Science", desc: "Python, Data Analysis, Statistics" },
            { key: "appdevelopment", title: "App Development", desc: "Android, Flutter, React Native" },
            { key: "iaiml", title: "AI & Machine Learning", desc: "Python, Machine Learning, AI Basics" },
            { key: "imernstack", title: "MERN Stack", desc: "MongoDB, Express, React, Node" },
            { key: "icloud", title: "Cloud Computing", desc: "AWS, Cloud Basics, Deployment" },
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
}

export default Intermediate;
