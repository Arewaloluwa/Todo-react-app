type Props = {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages < 2) return null;
  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-2 py-1 border rounded"
      >Prev</button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i+1}
          onClick={() => onPageChange(i + 1)}
          className={`px-2 py-1 border rounded ${page === i+1 ? "bg-blue-600 text-white" : ""}`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-2 py-1 border rounded"
      >Next</button>
    </div>
  );
}