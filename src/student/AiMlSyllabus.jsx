import "./Courses.css";
import { useNavigate } from "react-router-dom";

function AiMlSyllabus() {
  const navigate = useNavigate();

  const roadmap = [
    {
      title: "Programming & Libraries",
      topics: [
        "Python Basics",
        "NumPy (Numerical Computing)",
        "Pandas (Data Handling)",
        "Matplotlib & Seaborn (Visualization)",
        "Scikit-learn (Machine Learning)",
      ],
    },
    {
      title: "Mathematics for Machine Learning",
      topics: [
        "Linear Algebra (Vectors, Matrices)",
        "Calculus (Derivatives, Gradients)",
        "Probability & Statistics",
        "Hypothesis Testing (t-test, F-test, Chi-square, ANOVA)",
        "Descriptive vs Inferential Statistics",
      ],
    },
    {
      title: "Core Machine Learning",
      topics: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Regression, Classification, Clustering",
        "Train/Test Split & Cross Validation",
        "Model Evaluation Metrics",
      ],
    },
    {
      title: "Hands-on Scikit-learn",
      topics: [
        "Linear & Logistic Regression",
        "Decision Trees & Random Forest",
        "K-Means Clustering",
        "Google ML Crash Course",
      ],
    },
    {
      title: "Deep Learning",
      topics: [
        "Neural Network Basics",
        "Activation Functions & Backpropagation",
        "CNN for Image Recognition",
        "RNN/LSTM for Sequence Data",
        "TensorFlow / PyTorch Frameworks",
      ],
    },
    {
      title: "Advanced Topics",
      topics: [
        "Natural Language Processing (NLP)",
        "Computer Vision (OpenCV, Object Detection)",
        "Reinforcement Learning",
        "Generative AI (GPT, Diffusion Models)",
        "Agentic AI Concepts",
      ],
    },
    {
      title: "Projects & Portfolio",
      topics: [
        "House Price Prediction",
        "Spam Email Classifier",
        "Image Classifier (Cats vs Dogs)",
        "Sentiment Analysis",
        "Kaggle Competitions",
      ],
    },
    {
      title: "Certifications",
      topics: [
        "Generative AI Certification (Udemy)",
        "Professional Certificate in ML",
        "Complete AI & ML Bootcamp",
      ],
    },
  ];

  return (
    <div className="roadmap-container">
      {/* TOP BAR */}
      <div className="top-bar">
        <h1 className="title">AI / Machine Learning Roadmap</h1>

        <button
          className="syllabus-btn"
          onClick={() => navigate("/aiml")}
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
        <h2>Resources</h2>
        <a
          href="https://youtu.be/UrsmFxEIp5k"
          target="_blank"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>Python Basics</h3>
            <p>Python Full Course</p>
          </div>
        </a>

        <a
          href="https://developers.google.com/machinelearning/crash-course"
          target="_blank"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>Google ML Crash Course</h3>
            <p>Official ML Crash Course</p>
          </div>
        </a>

        <a
          href="https://youtu.be/d2kxUVwWWwU"
          target="_blank"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>Deep Learning Playlist</h3>
            <p>Deep Learning Tutorial</p>
          </div>
        </a>

        <a
          href="https://course.fast.ai/"
          target="_blank"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>Fast.ai Course</h3>
            <p>Fast.ai Practical Deep Learning</p>
          </div>
        </a>

        <a
          href="https://www.udemy.com/course/generative-ai-certification"
          target="_blank"
          class="resource-link"
        >
          <div class="resource-card">
            <h3>Certification</h3>
            <p>Generative AI Certification (Udemy)</p>
          </div>
        </a>
      </section>
    </div >
  );
}

export default AiMlSyllabus;
