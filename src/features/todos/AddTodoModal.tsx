import { useState } from "react";
import { createTask } from "../../api/taskApi"; // Adjust the path as needed

export default function AddTodoModal({ onClose, onSaved }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createTask({ name: title });
      if (onSaved) onSaved(); // Tell parent to refresh list!
      onClose();
    } catch (e) {
      setError(e.response?.data?.message ?? "Failed to add todo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm border border-gray-200"
      >
        <h3 className="text-xl font-medium mb-4">Add Todo</h3>
        <label className="block mb-2 text-gray-600">Title</label>
        <input
          className="w-full border rounded p-2 mb-4 outline-none focus:ring focus:border-blue-600"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter todo..."
          autoFocus
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex justify-end gap-3">
          <button type="button" className="px-3 py-2 bg-gray-200 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}