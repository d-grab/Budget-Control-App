import { useCollection } from "customHooks/useCollection";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Plan from "./Plan";
import UpdatePlan from "./UpdatePlan";

const PlanList = ({ filterCategory }) => {
  const { documents, error } = useCollection("plans", ["createdAt", "desc"]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [data, setData] = useState({});

  return (
    <>
      <div className={"plans mb-4"}>
        {error && toast.error(error)}
        {!documents ? (
          <div className="text-center text-dark bg-light p-2 rounded w-100">
            Loading...
          </div>
        ) : documents.length > 0 ? (
          documents.map((plan, idx) => {
            if (!filterCategory || filterCategory === "#all") {
              return (
                <Plan
                  key={idx}
                  data={plan}
                  onClick={() => {
                    setData(plan);
                    setShowPlanModal(true);
                  }}
                />
              );
            } else if (filterCategory === plan.category) {
              return (
                <Plan
                  key={idx}
                  data={plan}
                  onClick={() => {
                    setData(plan);
                    setShowPlanModal(true);
                  }}
                />
              );
            } else {
              return <></>;
            }
          })
        ) : (
          <div className="text-center text-dark bg-light p-2 rounded w-100 fw-bold">
            No Plans.
          </div>
        )}
      </div>

      <UpdatePlan
        show={showPlanModal}
        handleClose={() => setShowPlanModal(false)}
        plan={data}
      />
    </>
  );
};

export default PlanList;
