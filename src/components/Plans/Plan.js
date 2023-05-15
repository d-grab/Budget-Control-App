import React from "react";
import { ProgressBar } from "react-bootstrap";
import { getProgressBarVariant } from "utils/functions";

const Plan = ({
  data: { title, category, currentAmount, budgetAmount },
  onClick,
}) => {
  return (
    <>
      <div className="plan" onClick={() => onClick()}>
        <h6 className="text-success m-0">{category}</h6>
        <p className="mt-2 mb-2 mb-sm-3 plan-title">
          {title.length >= 40 ? (
            <>
              {title.substring(0, 40)}
              <span className="text-secondary">...</span>
            </>
          ) : (
            title
          )}
        </p>
        <div className="d-flex">
          <h5>£{currentAmount}</h5>
          <h5 className="ms-auto text-secondary">£{budgetAmount}</h5>
        </div>
        <ProgressBar
          className="rounded-pill mb-2 mb-sm-3"
          variant={getProgressBarVariant(currentAmount, budgetAmount)}
          min={0}
          max={budgetAmount}
          now={currentAmount}
        />
      </div>
    </>
  );
};

export default Plan;
