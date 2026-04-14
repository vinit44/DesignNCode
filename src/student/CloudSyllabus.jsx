import "./Courses.css";
import { useNavigate } from "react-router-dom";

function CloudSyllabus() {
    const navigate = useNavigate();

    const roadmap = [
        {
            title: "Foundations of Cloud Computing",
            topics: [
                "What is Cloud Computing?",
                "Cloud Service Models (IaaS, PaaS, SaaS)",
                "Deployment Models (Public, Private, Hybrid)",
                "Basics of Virtualization",
                "Networking Fundamentals",
            ],
        },
        {
            title: "Core Cloud Concepts",
            topics: [
                "Compute Services (VMs, Instances)",
                "Storage Services (S3, Blob Storage)",
                "Databases in Cloud (RDS, Cloud SQL)",
                "Networking (VPC, Subnets, Load Balancers)",
            ],
        },
        {
            title: "Major Cloud Providers",
            topics: [
                "Amazon Web Services (AWS)",
                "Microsoft Azure",
                "Google Cloud Platform (GCP)",
                "Choosing the right provider",
            ],
        },
        {
            title: "DevOps & Cloud Tools",
            topics: [
                "Linux Basics",
                "Git & GitHub",
                "Docker Containers",
                "Kubernetes Basics",
                "Terraform (Infrastructure as Code)",
            ],
        },
        {
            title: "Security & Monitoring",
            topics: [
                "Cloud Security Fundamentals",
                "Identity & Access Management (IAM)",
                "Encryption & Key Management",
                "Monitoring Tools (CloudWatch, Azure Monitor)",
            ],
        },
        {
            title: "Advanced Cloud Topics",
            topics: [
                "Serverless Computing (AWS Lambda)",
                "CI/CD Pipelines in Cloud",
                "Cloud Migration Strategies",
                "Big Data & AI Services in Cloud",
            ],
        },
        {
            title: "Projects & Portfolio",
            topics: [
                "Deploy a Website on AWS/GCP",
                "Build Cloud Storage Application",
                "Create CI/CD Pipeline with Jenkins",
                "Host Dockerized App in Kubernetes",
            ],
        },

    ];

    return (
        <div className="roadmap-container">
            {/* TOP BAR */}
            <div className="top-bar">
                <h1 className="title">Cloud Computing Roadmap</h1>

                <button
                    className="syllabus-btn"
                    onClick={() => navigate("/cloud")}
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
                    href="https://www.youtube.com/watch?v=2LaAJq1lB1Q"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>Cloud Computing Full Course</h3>
                        <p>Cloud Computing Tutorial (YouTube)</p>
                    </div>
                </a>

                <a
                    href="https://www.youtube.com/watch?v=ulprqHHWlng"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>AWS Beginner Course</h3>
                        <p>AWS Full Course for Beginners</p>
                    </div>
                </a>

                <a
                    href="https://www.youtube.com/watch?v=NKEFWyqJ5XA"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>Azure Fundamentals</h3>
                        <p>AZ-900 Azure Fundamentals Course</p>
                    </div>
                </a>

                <a
                    href="https://aws.amazon.com/certification/"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>Certification Guide</h3>
                        <p>AWS Certifications Official Page</p>
                    </div>
                </a>
            </section>


        </div>
    );
}

export default CloudSyllabus;
