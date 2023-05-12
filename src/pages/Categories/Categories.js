import AddCategory from "components/Categories/AddCategory";
import CategoryList from "components/Categories/CategoryList";
import React, { useState } from "react";

const Categories = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  return (
    <div className="categories-page">
      <h2 className="m-0 fw-bold text-center mb-2 mb-sm-3">Categories</h2>

      <div className="categories-page-header d-flex justify-content-start align-items-center mb-2 mb-sm-3">
        <button
          className="border-0 py-2 px-3 rounded fw-bold fs-6 me-1"
          onClick={() => setShowAddCategoryModal(true)}
        >
          New Category
        </button>
      </div>

      <CategoryList />

      <AddCategory
        show={showAddCategoryModal}
        handleClose={() => setShowAddCategoryModal(false)}
      />
    </div>
  );
};

export default Categories;
