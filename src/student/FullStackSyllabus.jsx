import { useNavigate } from "react-router-dom";
import "./Courses.css";

function FullStackSyllabus() {
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
            title: "React Framework",
            topics: [
                "React fundamentals",
                "Components and props",
                "State and hookss",
                "React Router",
                "Conditional rendering",
                "API integration",
                "State management basics"
            ],
        },
        {
            title: "Version Control & Tools",
            topics: [
                "Git basics",
                "GitHub workflow",
                "Branching & merging",
                "npm / yarn",
                "Build tools (Vite, Webpack)",
            ],
        },
        {
            title: "Backend Fundamentals",
            topics: [
                "Backend concepts",
                "REST API principles",
                "Authentication & authorization",
                "MVC architecture",
            ],
        },
        {
            title: "Backend Development (Java)",
            topics: [
                "Core Java",
                "OOP concepts",
                "Exception handling",
                "Multithreading",
                "Collections framework",
            ],
        },
        {
            title: "Database & JDBC",
            topics: [
                "Database concepts",
                "SQL basics",
                "CRUD operations",
                "JDBC architecture",
                "Database connectivity",
                "Transactions",
            ],
        },
        {
            title: "Java Web Technologies",
            topics: [
                "Servlets",
                "JSP",
                "RESTful web services",
                "Spring MVC",
            ],
        },
        {
            title: "Java Frameworks",
            topics: [
                "Spring Framework",
                "Spring Boot",
                "Hibernate (ORM)",
                "Maven / Gradle",
            ],
        },
        {
            title: "Authentication & Security",
            topics: [
                "Login & registration",
                "JWT authentication",
                "Role-based access",
                "Password hashing",
                "Web security basics",
            ],
        },
        {
            title: "Deployment & DevOps Basics",
            topics: [
                "Build process",
                "Hosting basics",
                "Backend deployment",
                "Frontend deployment",
                "Environment variables",
            ],
        },
        {
            title: "Project Development",
            topics: [
                "Requirement analysis",
                "UI design",
                "Backend API development",
                "Database design",
                "Frontend integration",
                "Testing",
                "Deployment",
                "Documentation",
            ],
        },
        {
            title: "Projects to Build",
            topics: [
                "LearnFlow – Learning tracker",
                "ExpenseLite – Expense manager",
                "JobTrail – Job application tracker",
                "BookShelf – Reading tracker",
                "HelpDesk Lite – Ticket system",
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
            <section className="resources">
                <h3>Resources</h3>

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
                    href="https://www.youtube.com/watch?v=bWACo_pvKxg&list=PLSDeUiTMfxW6VChKWb26Z_mPR4f6fAmMV"
                    target="_blank"
                    rel="noreferrer"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>FullStack Course</h3>
                        <p>FullStack complete course</p>
                    </div>
                </a>
            </section>


        </div>
    );
}

export default FullStackSyllabus;
