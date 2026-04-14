import { useNavigate } from "react-router-dom";
import "./Courses.css";

function JavaDevloperaSyllabus() {
    const navigate = useNavigate();

    const syllabus = [
        {
            title: "Java Programming Basics",
            topics: [
                "Introduction to Java",
                "Java features and architecture",
                "JVM, JRE, and JDK",
                "Variables and data types",
                "Control flow statements",
                "Arrays and input/output",
            ],
        },
        {
            title: "Object-Oriented Programming (OOP)",
            topics: [
                "Classes and objects",
                "Inheritance",
                "Polymorphism",
                "Abstraction",
                "Encapsulation",
            ],
        },
        {
            title: "Exception Handling",
            topics: [
                "Types of exceptions",
                "Try-catch-finally",
                "Throw and throws",
                "Custom exceptions",
            ],
        },
        {
            title: "Collections Framework",
            topics: [
                "List, Set, and Map",
                "Generics",
                "Iterators",
                "Comparable and Comparator",
            ],
        },
        {
            title: "Java 8 Features",
            topics: [
                "Lambda expressions",
                "Streams API",
                "Functional interfaces",
                "Date and Time API",
            ],
        },
        {
            title: "JDBC (Java Database Connectivity)",
            topics: [
                "Introduction to JDBC",
                "JDBC architecture",
                "Types of JDBC drivers",
                "Database connection",
                "Statement & PreparedStatement",
                "Transactions",
            ],
        },
        {
            title: "Web Development",
            topics: [
                "Introduction to web applications",
                "Servlets",
                "JSP(Java Server Pages)",
                "REST API",
                "Spring MVC",
            ],
        },

        {
            title: "Frameworks",
            topics: [
                "Spring Framework",
                "Spring MVC",
                "Spring Boot",
                "Hibernate",
            ],
        },
        {
            title: "Projects",
            topics: [
                "Student Management System",
                "HR Management System",
                "Banking Application",
                "REST API using Spring Boot",
            ],
        },
    ];

    return (
        <div className="roadmap-container" >
            {/* TOP BAR */}
            < div className="top-bar" >
                <h1 className="title">Java Developer</h1>
                <button
                    className="syllabus-btn"
                    onClick={() => navigate("/javadeveloper")}
                >
                    Return to Test
                </button>
            </div >

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
                    href="https://www.youtube.com/watch?v=Yy1yx9uTHIs"
                    target="_blank"
                    class="resource-link"

                >
                    <div class="resource-card">
                        <h3>Core Java</h3>
                        <p>Click to open YouTube Playlist</p>
                    </div>
                </a>

                <a
                    href="https://www.youtube.com/watch?v=BMzp_U6IkoY"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>Collection Framework</h3>
                        <p>Click to open YouTube Playlist</p>
                    </div>
                </a>
                <a
                    href="https://www.youtube.com/playlist?list=PL0zysOflRCenjuvOwumYLG9TCsEQZrV2M"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>JDBC</h3>
                        <p>Click to open YouTube Playlist</p>
                    </div>
                </a>
                <a
                    href="https://www.youtube.com/playlist?list=PL0zysOflRCekeiERASkpi-crREVensZGS"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>Spring Framework</h3>
                        <p>Click to open YouTube Playlist</p>
                    </div>
                </a>
                <a
                    href="https://www.youtube.com/watch?si=TlaGehf1Dte7ST-c&v=35EQXmHKZYs&feature=youtu.be"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>Spring Boot</h3>
                        <p>Click to open YouTube Playlist</p>
                    </div>
                </a>
                
            </section>

        </div >
    );
}

export default JavaDevloperaSyllabus;
