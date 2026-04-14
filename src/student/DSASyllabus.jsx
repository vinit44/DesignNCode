import { useNavigate } from "react-router-dom";
import "./Courses.css";
function DevOpsSyllabus() {
    const navigate = useNavigate();
    const roadmap = [
        {
            title: "Programming & OS Basics",
            topics: [
                "Linux fundamentals",
                "File system, users, permissions",
                "Processes & system monitoring",
                "Package management",
                "Shell scripting (bash)",
                "Python basics for automation",
                "Go basics (optional)",
            ],
        },
        {
            title: "Networking Basics",
            topics: [
                "DNS",
                "HTTP / HTTPS",
                "SSL / TLS",
                "TCP/IP model",
                "Ports",
                "Load balancers",
                "Firewalls",
            ],
        },
        {
            title: "Version Control",
            topics: [
                "Git basics (init, add, commit, push, pull)",
                "Branching & merging",
                "Rebasing",
                "GitHub / GitLab workflow",
            ],
        },
        {
            title: "YAML (Configuration Language)",
            topics: [
                "YAML syntax & indentation",
                "Writing configuration files",
                "Usage in Kubernetes",
                "Usage in Ansible",
                "Usage in GitHub Actions",
            ],
        },
        {
            title: "Containers (Docker)",
            topics: [
                "Docker basics (images, containers)",
                "Dockerfile",
                "Custom images",
                "Volumes",
                "Networking",
            ],
        },
        {
            title: "CI / CD Pipelines",
            topics: [
                "GitHub Actions basics",
                "GitLab CI/CD pipelines",
                "Jenkins pipelines",
            ],
        },
        {
            title: "Cloud Fundamentals",
            topics: [
                "AWS / Azure / GCP overview",
                "Compute services",
                "Storage services",
                "Networking services",
                "IAM (Identity & Access Management)",
            ],
        },
        {
            title: "Orchestration (Kubernetes)",
            topics: [
                "Kubernetes architecture",
                "Pods",
                "Deployments",
                "Services",
                "ConfigMaps & Secrets",
                "Scaling & rolling updates",
            ],
        },
        {
            title: "Infrastructure as Code (IaC)",
            topics: [
                "Terraform basics",
                "Ansible playbooks",
                "Puppet / Chef (optional)",
            ],
        },
        {
            title: "Observability & Monitoring",
            topics: [
                "Monitoring with Prometheus",
                "Visualization with Grafana",
                "Logging (ELK Stack / Loki)",
                "Tracing (Jaeger / OpenTelemetry)",
            ],
        },
        {
            title: "Chaos Engineering",
            topics: [
                "Fault injection concepts",
                "LitmusChaos",
                "Chaos Mesh",
            ],
        },
        {
            title: "Policy & Governance",
            topics: [
                "RBAC (Role Based Access Control)",
                "Pod Security Standards",
                "Open Policy Agent (OPA)",
                "Kyverno",
            ],
        },
        {
            title: "Service Mesh",
            topics: [
                "Service-to-service communication",
                "Istio",
                "Linkerd",
                "Traffic management",
                "Canary & blue/green deployments",
            ],
        },
        {
            title: "Mini Projects",
            topics: [
                "Containerize a Python Flask app",
                "Build CI/CD pipeline for web app",
                "Host static website on AWS S3 + CloudFront",
                "Deploy multi-container app on Kubernetes",
                "Provision EC2 using Terraform",
                "Monitor Kubernetes with Prometheus & Grafana",
                "Simulate pod failure using LitmusChaos",
                "Deploy Istio & test traffic splitting",
            ],
        },
    ];

    return (
        <div className="roadmap-container">
            {/* TOP BAR */}
            <div className="top-bar">
                <h1 className="title">DevOps</h1>
                <button
                    className="syllabus-btn"
                    onClick={() => navigate("/DevOps")}
                >
                    Return to Test
                </button>
            </div>

            <h2 className="subtitle">Roadmap</h2>
            {/* CARD GRID */}

            <div className="card-grid">
                {roadmap.map((card, index) => (
                    <div className="roadmap-card" key={index}>
                        <h3>{index + 1}. {card.title}</h3>
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
                    href="https://www.youtube.com/watch?v=Ou9j73aWgyE&list=PLdpzxOOAlwvIc1TjTwopNSjRJkzES2ZXk"
                    target="_blank"
                    class="resource-link"
                >
                    <div class="resource-card">
                        <h3>DevOps</h3>
                        <p>Complete DevOps Course</p>
                    </div>
                </a>



            </section>
        </div>
    );
}

export default DevOpsSyllabus;
