type Props = {
  search: string;
  setSearch: (s: string) => void;
  status: string;
  setStatus: (s: string) => void;
};

export default function TodoFilter({ search, setSearch, status, setStatus }: Props) {
  return (
    <form className="flex gap-2 items-center">
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search todos..."
        className="border rounded p-1"
      />
      <select value={status} onChange={e => setStatus(e.target.value)} className="border rounded p-1">
        <option value="">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </form>
  );
}