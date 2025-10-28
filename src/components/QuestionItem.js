import React from "react";

function QuestionItem({ question, onUpdateQuestion, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleChange(e) {
    const newCorrectIndex = parseInt(e.target.value);

    // ✅ Update UI immediately before fetch finishes
    onUpdateQuestion({ ...question, correctIndex: newCorrectIndex });

    // ✅ Update on the server (no waiting)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    }).catch((err) => console.error("Update failed:", err));
  }

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => onDeleteQuestion(id))
      .catch((err) => console.error("Delete failed:", err));
  }

  return (
    <li>
      <h4>{prompt}</h4>

      {/* ✅ Label linked to select for test compatibility */}
      <label htmlFor={`correct-${id}`}>Correct Answer:</label>
      <select
        id={`correct-${id}`}
        aria-label="Correct Answer"
        value={correctIndex}
        onChange={handleChange}
      >
        {answers.map((answer, index) => (
          <option key={index} value={index}>
            {answer}
          </option>
        ))}
      </select>

      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
