import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import PlanList from "components/Plans/PlanList";
import AddPlan from "components/Plans/AddPlan";
import { useCollection } from "customHooks/useCollection";
import { toast } from "react-toastify";

const Plans = () => {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState("#all");
  
  const { documents: categories, error: categoriesError } = useCollection(
    "categories",
    ["createdAt", "desc"]
  );

  const handleChange = (e) => {
    setFilterCategory(e.target.value);
  };

  return (
    <div className="plans-page">
      {categoriesError && toast.error(categoriesError)}
      <h2 className="m-0 fw-bold text-center mb-2 mb-sm-3">My Plans</h2>

      <div className="plans-page-header d-flex justify-content-between align-items-center mb-2 mb-sm-3">
        <button
          className="border-0 py-2 px-3 rounded fw-bold fs-6 me-1"
          onClick={() => setShowPlanModal(true)}
        >
          New Plan
        </button>
        <div className="d-flex justify-content-center align-items-center gap-2">
          {/* <p className="m-0 fw-bold">Category:</p> */}
          <Form.Group>
            <Form.Select onChange={(e) => handleChange(e)} className="py-2">
              <option value={"#all"}>All Category</option>
              {categories?.map((category) => {
                return <option value={category.code}>{category.description}</option>;
              })}
            </Form.Select>
          </Form.Group>
        </div>
      </div>

      <PlanList filterCategory={filterCategory} />

      <AddPlan
        show={showPlanModal}
        handleClose={() => setShowPlanModal(false)}
      />
    </div>
  );
};

export default Plans;
