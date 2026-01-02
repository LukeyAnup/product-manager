import ButtonComponent from "./reusable/button";

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
      <ButtonComponent disabled={page === 1} onClick={onPrevious} text="Prev" />
      <span>
        Page {page} of {totalPages}
      </span>
      <ButtonComponent
        disabled={page === totalPages}
        onClick={onNext}
        text="Next"
      />
    </div>
  );
}
