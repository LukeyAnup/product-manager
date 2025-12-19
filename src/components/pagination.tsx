interface IPaginationProps {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: IPaginationProps) {
  return (
    <div className="flex justify-center items-center gap-3 my-6">
      <button
        disabled={page === 1}
        onClick={onPrevious}
        className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
        aria-label="Previous page"
      >
        Prev
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={onNext}
        className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}
