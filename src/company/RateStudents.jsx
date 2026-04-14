import React, { useState } from "react";

const RateStudents = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    student: "",
    project: "",
    status: "In Progress"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addStudent = async (e) => {
    e.preventDefault();
    if (!form.student || !form.project) return;

    try {
      const res = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_name: form.student,
          project_name: form.project,
          status: form.status
        })
      });

      const data = await res.json();

      // ⭐ rating field add kar diya (initially null)
      setStudents([...students, { ...data, rating: null }]);

      setForm({ student: "", project: "", status: "In Progress" });
    } catch (err) {
      console.error(err);
      alert("DB error ❌");
    }
  };

  // ⭐ RATING CHANGE HANDLER
  const handleRatingChange = (id, ratingValue) => {
    const updatedStudents = students.map((s) =>
      s.id === id ? { ...s, rating: ratingValue } : s
    );
    setStudents(updatedStudents);
  };

  return (
    <div className="rate-students-card">
      <h3>Rate Students</h3>

      {/* FORM */}
      <form className="rate-students-form" onSubmit={addStudent}>
        <input
          name="student"
          value={form.student}
          onChange={handleChange}
          placeholder="Student Name"
        />

        <input
          name="project"
          value={form.project}
          onChange={handleChange}
          placeholder="Project Name"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button className="primary-btn" type="submit">
          Add Student
        </button>
      </form>

      {/* TABLE */}
      {students.length === 0 ? (
        <p className="empty-text">No students added yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Project</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.student_name}</td>
                  <td>{s.project_name}</td>

                  <td>
                    <span
                      className={`status-badge ${s.status
                        .replace(" ", "")
                        .toLowerCase()}`}
                    >
                      {s.status}
                    </span>
                  </td>

                  {/* ⭐ RATING COLUMN */}
                  <td>
                    {s.rating ? `${s.rating} / 5` : "Not Rated"}
                  </td>

                  {/* ⭐ ACTION */}
                  <td>
                    <select
                      className="rating-select"
                      value={s.rating || ""}
                      onChange={(e) =>
                        handleRatingChange(s.id, e.target.value)
                      }
                    >
                      <option value="">Rate</option>
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RateStudents;
