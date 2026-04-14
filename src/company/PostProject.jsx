import React, { useState } from "react";

const PostProject = ({ onPostProject }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    skillsrequired: "",
    totalBudget: "",
    skilllevelrequired: "Beginner",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔑 get companyId from localStorage
    const companyId = Number(localStorage.getItem("companyId"));

    console.log("🟢 companyId:", companyId);
    console.log("🟢 form data:", form);

    if (!companyId) {
      alert("Company not logged in ❌");
      return;
    }

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.skillsrequired.trim() ||
      !form.totalBudget
    ) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/company/add-project",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId,
            title: form.title.trim(),
            description: form.description.trim(),
            skillsrequired: form.skillsrequired.trim(),
            totalBudget: Number(form.totalBudget),
            skilllevelrequired: form.skilllevelrequired,
          }),
        }
      );

      const data = await res.json();
      console.log("🟢 backend response:", data);

      if (!res.ok) {
        alert(data.message || "Failed to add project ❌");
        return;
      }

      alert("Project added successfully ✅");

      if (onPostProject) {
        onPostProject(form.totalBudget);
      }

      setForm({
        title: "",
        description: "",
        skillsrequired: "",
        totalBudget: "",
        skilllevelrequired: "Beginner",
      });
    } catch (err) {
      console.error("❌ Fetch error:", err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="card">
      <h3>Post New Project</h3>

      <form className="post-project-form" onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Project Title"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Project Description"
          required
        />

        <input
          name="skillsrequired"
          value={form.skillsrequired}
          onChange={handleChange}
          placeholder="Skills Required"
          required
        />

        <input
          name="totalBudget"
          type="number"
          value={form.totalBudget}
          onChange={handleChange}
          placeholder="Total Budget"
          required
        />

        <select
          name="skilllevelrequired"
          value={form.skilllevelrequired}
          onChange={handleChange}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Experienced">Experienced</option>
        </select>

        <button className="primary-btn" type="submit">
          Post Project
        </button>
      </form>
    </div>
  );
};

export default PostProject;
