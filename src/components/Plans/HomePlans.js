import { Link } from "react-router-dom";
import React from "react";
import PlanList from "./PlanList";

const HomePlans = () => {
  return (
    <>
      <div className="plans-header">
        <h6 className="plans-header-title">My Plans</h6>
        <Link to="/plans" className="plans-view-all-btn">
          View all
        </Link>
      </div>

      <PlanList />
    </>
  );
};

export default HomePlans;
