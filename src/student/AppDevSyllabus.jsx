import "./Courses.css";
import { useNavigate } from "react-router-dom";

function AppDevSyllabus() {
  const navigate = useNavigate();

  const roadmap = [
    {
      title: "Native Android Development (Java)",
      topics: [
        "Learn & Master Java",
        "Android Studio Basics",
        "Build Projects (Weather App, Notes App)",
        "Maintain Existing Apps",
        "Udemy Certifications",
      ],
    },
    {
      title: "Native Android Development (Kotlin)",
      topics: [
        "Learn Java then Kotlin",
        "Android Studio with Kotlin",
        "Jetpack Compose Basics",
        "Build Projects (Blog App, Chat App)",
        "Kotlin Multiplatform Edge (KMP)",
      ],
    },
    {
      title: "Native iOS Development (Swift)",
      topics: [
        "Learn Swift Programming",
        "Xcode Studio Basics",
        "Build Projects (Rick & Morty App)",
        "High-paying iOS Developer Roles",
        "Udemy + Stanford Courses",
      ],
    },
    {
      title: "Desktop App Development",
      topics: [
        "C# (.NET MAUI, WinForms)",
        "Java (Swing, JavaFX)",
        "C++ (Qt Framework)",
        "JavaScript/TypeScript (Electron.js)",
        "Build Business & Productivity Apps",
      ],
    },
    {
      title: "Cross Platform Development",
      topics: [
        "Flutter Framework",
        "React Native Framework",
        "Kotlin Multiplatform (KMP)",
        "Shared Codebase for Android/iOS",
      ],
    },
    {
      title: "API Integration & Cloud Services",
      topics: [
        "REST API Integration",
        "GraphQL Basics",
        "Firebase Cloud Functions",
        "Cloud Backend Services",
      ],
    },
    {
      title: "UI/UX + Testing",
      topics: [
        "UI/UX Design Principles",
        "Figma for App Design",
        "Unit Testing (Flutter, Java)",
        "React Native Testing",
        "Debugging & Deployment",
      ],
    },
    {
      title: "Advanced Topics",
      topics: [
        "Security in Apps",
        "CI/CD Pipelines (GitLab, Jenkins)",
        "App Monetization (Ads, Subscriptions)",
      ],
    },
  ];

  return (
    <div className="roadmap-container">
      {/* TOP BAR */}
      <div className="top-bar">
        <h1 className="title">App Development Roadmap</h1>

        <button
          className="syllabus-btn"
          onClick={() => navigate("/appdevelopment")}
        >
          Return to Test
        </button>
      </div>

      <h2 className="subtitle">Roadmap</h2>

      {/* CARD GRID */}
      <div className="card-grid">
        {roadmap.map((card, index) => (
          <div key={index} className="roadmap-card">
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
          href="https://www.youtube.com/results?search_query=flutter+full+course"
          target="_blank"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>Flutter Full Course</h3>
            <p>Flutter Beginners Playlist</p>
          </div>
        </a>

        <a
          href="https://www.youtube.com/results?search_query=react+native+full+course"
          target="_blank"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>React Native Full Course</h3>
            <p>React Native Playlist</p>
          </div>
        </a>

        <a
          href="https://www.youtube.com/watch?v=vhPyCmzz9EI"
          target="_blank"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>React Native Testing</h3>
            <p>Testing in React Native</p>
          </div>
        </a>

        <a
          href="https://www.youtube.com/watch?v=VVxuvIkyngc"
          target="_blank"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>App Monetization Guide</h3>
            <p>Monetization Video</p>
          </div>
        </a>
      </section>
    </div>
  );
}
export default AppDevSyllabus;