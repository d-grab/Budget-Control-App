import React from "react";

const Category = ({ data: { description, code }, onClick }) => {
  return (
    <>
      <div className="category" onClick={() => onClick()}>
        <h6 className="text-success m-0 border border-success d-inline py-1 px-2 rounded">{code}</h6>
        <h3 className="mt-3 mb-2 mb-sm-3 fw-bold text-center">{description}</h3>
      </div>
    </>
  );
};

export default Category;
