import { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

/* ================= QUESTIONS ================= */

const programmingBasicsQuestions = [
  { q: "Which language is commonly used for DSA?", options: ["HTML", "CSS", "Java", "XML"], answer: 2 },
  { q: "Which loop runs at least once?", options: ["for", "while", "do-while", "foreach"], answer: 2 },
  { q: "Function is used for?", options: ["Code reuse", "Memory allocation", "Input", "Output"], answer: 0 },
  { q: "Recursion means?", options: ["Loop inside loop", "Function calling itself", "Calling another function", "Infinite loop"], answer: 1 },
  { q: "Big O notation represents?", options: ["Execution time", "Memory usage", "Time & space complexity", "Compilation time"], answer: 2 },
];

const basicDSQuestions = [
  { q: "Which data structure stores elements contiguously?", options: ["Array", "Linked List", "Stack", "Queue"], answer: 0 },
  { q: "Which DS follows FIFO?", options: ["Stack", "Queue", "Array", "Tree"], answer: 1 },
  { q: "Which DS follows LIFO?", options: ["Queue", "Array", "Stack", "Linked List"], answer: 2 },
  { q: "Linked list node contains?", options: ["Only data", "Only address", "Data and address", "Index"], answer: 2 },
  { q: "Which is linear data structure?", options: ["Graph", "Tree", "Array", "Heap"], answer: 2 },
];

const searchingSortingQuestions = [
  { q: "Binary search works on?", options: ["Unsorted array", "Sorted array", "Linked list", "Graph"], answer: 1 },
  { q: "Which sorting algorithm is stable?", options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Heap Sort"], answer: 0 },
  { q: "Time complexity of linear search?", options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"], answer: 1 },
  { q: "Which sorting uses divide and conquer?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], answer: 2 },
  { q: "Worst case of Quick Sort is?", options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"], answer: 3 },
];

const advancedDSQuestions = [
  { q: "HashMap provides average time complexity of?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: 0 },
  { q: "Heap is mainly used for?", options: ["Sorting", "Priority queue", "Searching", "Graph traversal"], answer: 1 },
  { q: "BST property?", options: ["Left < Root < Right", "Root < Left < Right", "Random order", "No rule"], answer: 0 },
  { q: "BFS uses which DS?", options: ["Stack", "Queue", "Heap", "Array"], answer: 1 },
  { q: "DFS uses which DS?", options: ["Queue", "Heap", "Stack", "Array"], answer: 2 },
];

const algorithmQuestions = [
  { q: "Backtracking is used to?", options: ["Optimize code", "Try all possibilities", "Sort data", "Search elements"], answer: 1 },
  { q: "Greedy algorithm makes choice?", options: ["Random", "Optimal locally", "Optimal globally", "Worst case"], answer: 1 },
  { q: "Sliding window improves?", options: ["Time complexity", "Memory", "UI", "Security"], answer: 0 },
  { q: "Two pointer technique is used in?", options: ["Graphs", "Arrays / Strings", "Trees", "DP"], answer: 1 },
  { q: "Divide and conquer example?", options: ["Binary search", "Linear search", "Bubble sort", "Insertion sort"], answer: 0 },
];

const dpQuestions = [
  { q: "DP is mainly used to?", options: ["Reduce recursion", "Optimize overlapping subproblems", "Sort data", "Search faster"], answer: 1 },
  { q: "Memoization is?", options: ["Top-down approach", "Bottom-up approach", "Brute force", "Greedy"], answer: 0 },
  { q: "Tabulation is?", options: ["Top-down", "Bottom-up", "Recursive", "Greedy"], answer: 1 },
  { q: "Knapsack is example of?", options: ["Greedy", "DP", "Divide and conquer", "Graph"], answer: 1 },
  { q: "LCS stands for?", options: ["Longest Common Subsequence", "Least Common String", "Longest Continuous Sequence", "Logical Code Structure"], answer: 0 },
];

const graphAlgoQuestions = [
  { q: "Dijkstra’s algorithm finds?", options: ["MST", "Shortest path", "Cycle", "Topological order"], answer: 1 },
  { q: "Kruskal algorithm is used for?", options: ["Shortest path", "MST", "Cycle detection", "DFS"], answer: 1 },
  { q: "Topological sorting works on?", options: ["Undirected graph", "Directed Acyclic Graph", "Tree", "Heap"], answer: 1 },
  { q: "Union-Find is used for?", options: ["Shortest path", "Cycle detection", "Sorting", "Traversal"], answer: 1 },
  { q: "Bellman-Ford handles?", options: ["Negative weights", "Cycles only", "Positive weights only", "Trees"], answer: 0 },
];

const competitiveQuestions = [
  { q: "KMP algorithm is used for?", options: ["Sorting", "Pattern matching", "Graph traversal", "DP"], answer: 1 },
  { q: "Suffix array is related to?", options: ["Graphs", "Strings", "Trees", "DP"], answer: 1 },
  { q: "Modular arithmetic is useful for?", options: ["Large numbers", "Sorting", "Graphs", "UI"], answer: 0 },
  { q: "Competitive programming improves?", options: ["Speed & accuracy", "UI skills", "Design", "Testing"], answer: 0 },
  { q: "Which platform hosts contests?", options: ["GeeksforGeeks", "Codeforces", "W3Schools", "MDN"], answer: 1 },
];

/* ================= QUIZ CARD ================= */
function QuizCard({ title, questions, passed, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce(
    (t, q, i) => t + (answers[i] === q.answer ? 4 : 0),
    0
  );

  if (passed) {
    return (
      <div className="quiz-card passed">
        <h3>{title}</h3>
        <p>✅ Passed</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-card">
      <h3>{title}</h3>

      {!submitted ? (
        <>
          <p className="question">{q.q}</p>

          <div className="options">
            {q.options.map((opt, i) => (
              <label key={i} className="option">
                <input
                  type="radio"
                  checked={answers[current] === i}
                  onChange={() => setAnswers({ ...answers, [current]: i })}
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="quiz-actions">
            {current > 0 && (
              <button className="quiz-btn" onClick={() => setCurrent(current - 1)}>
                Previous
              </button>
            )}
            {current < questions.length - 1 ? (
              <button className="quiz-btn" onClick={() => setCurrent(current + 1)}>
                Next
              </button>
            ) : (
              <button
                className="quiz-btn submit-btn"
                onClick={() => {
                  setSubmitted(true);
                  onFinish(score >= 15);
                }}
              >
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <p>✅ Passed: {score >= 15 ? "Yes" : "No"}</p>
      )}
    </div>
  );
}

/* ================= MAIN PAGE ================= */
function DSA() {
  const navigate = useNavigate();
  const [passed, setPassed] = useState({
    basics: false,
    ds: false,
    sort: false,
    advds: false,
    algo: false,
    dp: false,
    graph: false,
    cp: false,
  });

  return (
    <div className="roadmap-container">
      <div className="top-bar">
        <div>
          <h1 className="title">Data Structures & Algorithms</h1>
          <h2 className="subtitle">Skill Assessment</h2>
        </div>

        <button className="syllabus-btn" onClick={() => navigate("/dsasyllabus")}>
          Roadmap
        </button>
      </div>

      <QuizCard title="Programming Basics" questions={programmingBasicsQuestions}
        passed={passed.basics} onFinish={(v) => setPassed({ ...passed, basics: v })} />

      {passed.basics && (
        <QuizCard title="Basic Data Structures" questions={basicDSQuestions}
          passed={passed.ds} onFinish={(v) => setPassed({ ...passed, ds: v })} />
      )}

      {passed.ds && (
        <QuizCard title="Searching & Sorting" questions={searchingSortingQuestions}
          passed={passed.sort} onFinish={(v) => setPassed({ ...passed, sort: v })} />
      )}

      {passed.sort && (
        <QuizCard title="Advanced Data Structures" questions={advancedDSQuestions}
          passed={passed.advds} onFinish={(v) => setPassed({ ...passed, advds: v })} />
      )}

      {passed.advds && (
        <QuizCard title="Algorithms" questions={algorithmQuestions}
          passed={passed.algo} onFinish={(v) => setPassed({ ...passed, algo: v })} />
      )}

      {passed.algo && (
        <QuizCard title="Dynamic Programming" questions={dpQuestions}
          passed={passed.dp} onFinish={(v) => setPassed({ ...passed, dp: v })} />
      )}

      {passed.dp && (
        <QuizCard title="Graph Algorithms" questions={graphAlgoQuestions}
          passed={passed.graph} onFinish={(v) => setPassed({ ...passed, graph: v })} />
      )}

      {passed.graph && (
        <QuizCard title="Competitive Programming" questions={competitiveQuestions}
          passed={passed.cp} onFinish={(v) => setPassed({ ...passed, cp: v })} />
      )}

      {passed.cp && (
        <div className="course-complete">
          <h2 style={{ color: "green" }}>
            DSA Course Completed ✅
          </h2>
          <p>Now you can proceed with the Intermediate DSA course.</p>
        </div>
      )}
    </div>
  );
}

export default DSA;
