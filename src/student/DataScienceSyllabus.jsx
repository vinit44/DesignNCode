import "./Courses.css";
import { useNavigate } from "react-router-dom";

function DataScienceSyllabus() {
    const navigate = useNavigate();

    const roadmap = [
        {
            title: "Foundations",
            topics: [
                "Mathematics: Linear Algebra, Probability, Statistics",
                "Python Basics (NumPy, Pandas, Matplotlib, Seaborn)",
                "SQL Basics",
                "Data Visualization Fundamentals",
            ],
        },
        {
            title: "Data Handling & Databases",
            topics: [
                "SQL Queries, Joins, Aggregations",
                "Relational Databases (MySQL, PostgreSQL)",
                "NoSQL Basics (MongoDB)",
                "Data Cleaning & Preprocessing",
            ],
        },
        {
            title: "Analytics & Business Skills",
            topics: [
                "Exploratory Data Analysis (EDA)",
                "Power BI / Tableau Basics",
                "Dashboards & Reporting",
                "Communicating Insights",
            ],
        },
        {
            title: "Advanced Analytics / Data Science",
            topics: [
                "Machine Learning (Regression, Classification, Clustering)",
                "Feature Engineering",
                "Model Evaluation Metrics",
                "Deep Learning (Optional)",
            ],
        },
        {
            title: "Tools & Ecosystem",
            topics: [
                "Git & GitHub (Version Control)",
                "Jupyter Notebooks & IDEs",
                "Cloud Basics (AWS, GCP, Azure)",
                "Big Data Tools (Spark, Hadoop - Optional)",
            ],
        },

    ];

    return (
        <div className="roadmap-container">
            {/* TOP BAR */}
            <div className="top-bar">
                <h1 className="title">Data Science / Data Analyst</h1>

                <button
                    className="syllabus-btn"
                    onClick={() => navigate("/datascience")}
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
                    href="https://youtu.be/VaSjiJMrq24?si=B-bJNbg8yx3C9zlH"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>Data Analyst Roadmap Video</h3>
                        <p>YouTube Roadmap Guide</p>
                    </div>
                </a>

                <a
                    href="https://youtu.be/r-uOLxNrNk8?si=1rOWyltnFium768h"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>Python for Data Science</h3>
                        <p>Python Full Course</p>
                    </div>
                </a>

                <a
                    href="https://youtu.be/8IuqFU5gw1E?si=ohaxHDjHl0h7OwFi"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>SQL Tutorial</h3>
                        <p>SQL Full Course</p>
                    </div>
                </a>

                <a
                    href="https://www.udemy.com/course/complete-machine-learning-and-data-science-zero-to-mastery"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>Certification (Udemy)</h3>
                        <p>Complete ML & Data Science Zero-to-Mastery</p>
                    </div>
                </a>
            </section>
        </div >
    );
}

export default DataScienceSyllabus;