import { useCollection } from "customHooks/useCollection";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Category from "./Category";
import UpdateCategory from "./UpdateCategory";

const CategoryList = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [data, setData] = useState(false);

  const { documents, error } = useCollection("categories", [
    "createdAt",
    "desc",
  ]);

  return (
    <>
      <div className={"category-list mb-4"}>
        {error && toast.error(error)}
        {!documents ? (
          <div className="text-center text-dark bg-light p-2 rounded w-100">
            Loading...
          </div>
        ) : documents.length > 0 ? (
          documents.map((category, idx) => {
            return (
              <Category
                key={idx}
                data={category}
                onClick={() => {
                  setData(category);
                  setShowCategoryModal(true);
                }}
              />
            );
          })
        ) : (
          <div className="text-center text-dark bg-light p-2 rounded w-100 fw-bold">
            No Category.
          </div>
        )}
      </div>

      <UpdateCategory
        show={showCategoryModal}
        handleClose={() => setShowCategoryModal(false)}
        category={data}
      />
    </>
  );
};

export default CategoryList;
