export default function Pagination({
  getInput,
  dataPage,
  activePage,
  totalData,
  setDataPage,
}) {
  const buttons = [];

  function prevPage() {
    if (activePage > 1) {
      const page = activePage - 1;
      setDataPage(page);
      getInput("pageNumber", { target: { value: page } });
    }
  }

  function nextPage() {
    if (activePage < dataPage) {
      const page = activePage + 1;
      setDataPage(page);
      getInput("pageNumber", { target: { value: page } });
    }
  }

  for (let i = 1; i <= dataPage; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => {
          setDataPage(i);
          getInput("pageNumber", { target: { value: i } });
        }}
        className={`px-3 py-1 rounded-md border transition ${
          +activePage === i
            ? "bg-blue-500 text-white border-blue-500"
            : "border-gray-300 hover:bg-gray-200"
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination flex justify-center items-center gap-3 mb-10">
      {totalData !== 0 && (
        <>
          <button
            onClick={prevPage}
            disabled={activePage === 1}
            className={`px-3 py-1 rounded-md border ${
              activePage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {buttons}
          <button
            onClick={nextPage}
            disabled={activePage === dataPage}
            className={`px-3 py-1 rounded-md border ${
              activePage === dataPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}
