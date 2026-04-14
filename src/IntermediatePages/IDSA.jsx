import { useState } from "react";
import "./IFrontend.css"; // reuse same CSS

/* ================== 10 QUESTIONS TOTAL ================== */
const questions = [
  // Arrays and Strings
  {
    q: "Which sorting algorithm has the best average-case time complexity of O(n log n)?",
    options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
    answer: 1,
  },
  {
    q: "In an array, what is the time complexity of accessing an element by index?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: 0,
  },

  // Linked Lists
  {
    q: "Which data structure uses nodes with pointers to the next node?",
    options: ["Array", "Stack", "Linked List", "Queue"],
    answer: 2,
  },
  {
    q: "What is the time complexity of inserting an element at the beginning of a singly linked list?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: 0,
  },

  // Trees
  {
    q: "In a binary search tree, where is the smallest element located?",
    options: ["Root", "Leftmost leaf", "Rightmost leaf", "Any leaf"],
    answer: 1,
  },
  {
    q: "What is the height of a balanced binary tree with n nodes?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    answer: 1,
  },

  // Graphs
  {
    q: "Which algorithm is used to find the shortest path in an unweighted graph?",
    options: ["Dijkstra's", "Bellman-Ford", "BFS", "DFS"],
    answer: 2,
  },
  {
    q: "What does DFS stand for in graph traversal?",
    options: ["Depth-First Search", "Dynamic Function Sorting", "Data Flow Structure", "Directed Graph Search"],
    answer: 0,
  },

  // Dynamic Programming
  {
    q: "Which problem is typically solved using dynamic programming?",
    options: ["Finding the maximum element in an array", "Computing Fibonacci numbers", "Sorting a list", "Searching in a binary tree"],
    answer: 1,
  },
  {
    q: "What is the space complexity of the standard knapsack problem solution using DP?",
    options: ["O(1)", "O(n)", "O(nW)", "O(2^n)"],
    answer: 2,
  },
];

/* ================== QUIZ COMPONENT ================== */
function IDSA() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (i) => {
    setAnswers({ ...answers, [current]: i });
  };

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const calculateScore = () => {
    return questions.reduce(
      (total, q, i) => total + (answers[i] === q.answer ? 5 : 0),
      0
    );
  };

  const submitQuiz = () => setSubmitted(true);

  const q = questions[current];

  return (
    <div className="roadmap-container">
      <h1 className="title">Intermediate DSA Developer Quiz</h1>

      {!submitted ? (
        <div className="quiz-card">
          <p className="question">{q.q}</p>

          <div className="options">
            {q.options.map((opt, i) => (
              <label key={i} className="option">
                <input
                  type="radio"
                  checked={answers[current] === i}
                  onChange={() => handleSelect(i)}
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="quiz-actions">
            {current > 0 && (
              <button className="quiz-btn" onClick={prev}>
                Previous
              </button>
            )}

            {current < questions.length - 1 ? (
              <button className="quiz-btn" onClick={next}>
                Next
              </button>
            ) : (
              <button className="quiz-btn submit-btn" onClick={submitQuiz}>
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-card result">
          <h2>Quiz Result</h2>
          <p>
            Score: {calculateScore()} / {questions.length * 5}
          </p>
          <p>
            {calculateScore() >= questions.length * 5 * 0.75
              ? "✅ Passed"
              : "❌ Failed"}
          </p>
        </div>
      )}
    </div>
  );
}

export default IDSA;

