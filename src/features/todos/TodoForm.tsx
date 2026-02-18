import { useState } from "react";

type Props = {
  onSubmit: (form: { name: string; description?: string }) => void;
  initial?: { name: string; description?: string };
  loading?: boolean;
};

export default function TodoForm({ onSubmit, initial, loading }: Props) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ name, description }); 
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={name}
        placeholder="Name" 
        onChange={e => setName(e.target.value)}
        required
        className="border rounded p-2 w-full"
      />
      <textarea
        value={description}
        placeholder="Description"
        onChange={e => setDescription(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}