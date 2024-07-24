import React from "react";

const Footer = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="pagination justify-items-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            className={`page-number ${pageNumber === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      )}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
      <span>Page {currentPage} of {totalPages}</span>
    </div>
  );
};

export default Footer;
