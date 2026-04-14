import { useNavigate } from "react-router-dom";
import "./Courses.css";


function FrontendSyllabus() {
  const navigate = useNavigate();

  const syllabus = [
    {
      title: "HTML Fundamentals",
      topics: [
        "Basic structure and syntax",
        "Semantic HTML elements",
        "Forms and validation",
        "Accessibility best practices",
      ],
    },
    {
      title: "CSS Essentials",
      topics: [
        "Selectors and specificity",
        "Box model and layouts",
        "Flexbox and Grid",
        "Responsive design and media queries",
        "CSS variables and custom properties",
        "Animations and transitions",
      ],
    },
    {
      title: "JavaScript Core",
      topics: [
        "Variables, data types, and operators",
        "Control flow (conditionals, loops)",
        "Functions and scope",
        "DOM manipulation",
        "Events and event handling",
        "Promises and async/await",
        "ES6+ features",
      ],
    },
    {
      title: "Frontend Tools & Frameworks",
      topics: [
        "Version control with Git",
        "Package managers (npm, yarn)",
        "Build tools (Webpack, Vite)",
        "CSS preprocessors (Sass, Less)",
        "Frameworks (React, Vue, Angular)",
        "State management",
      ],
    },
    {
      title: "Performance & Best Practices",
      topics: [
        "Website optimization techniques",
        "Browser developer tools",
        "Cross-browser compatibility",
        "Web security basics",
      ],
    },
    {
      title: "Advanced Topics",
      topics: [
        "Web APIs (Fetch, Storage, etc.)",
        "TypeScript fundamentals",
      ],
    },
    {
      title: "Projects to Build",
      topics: [
        "Personal portfolio website",
        "Interactive landing page",
        "To-do application",
        "Simple e-commerce interface",
      ],
    },
  ];

  return (
    <div className="roadmap-container">
      {/* TOP BAR */}
      <div className="top-bar">
        <h1 className="title">Frontend Development</h1>
        <button
          className="syllabus-btn"
          onClick={() => navigate("/frontend")}
        >
          Return to Test
        </button>
      </div>

      <h2 className="subtitle">Roadmap</h2>

      {/* CARD GRID */}
      <div className="card-grid">
        {syllabus.map((item, index) => (
          <div className="roadmap-card" key={index}>
            <h3>{index + 1}. {item.title}</h3>
            <ul>
              {item.topics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* RESOURCES */}
      <section class="resources">
        <h2>Resources</h2>

        <a
          href="https://www.youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w"
          target="_blank"
          class="resource-link"

        >
          <div class="resource-card">
            <h3>HTML,CSS and JavaScript</h3>
            <p>Click to open YouTube Playlist</p>
          </div>
        </a>

        <a
          href="https://www.youtube.com/playlist?list=PLfEr2kn3s-bo4LwlbyZugHPavhcdW8YMC"
          target="_blank"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>JavaScript (Detailed)</h3>
            <p>Click to open YouTube Playlist</p>
          </div>
        </a>
      </section>

    </div>
  );
}

export default FrontendSyllabus;
