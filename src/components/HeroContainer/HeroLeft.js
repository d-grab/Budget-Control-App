import React, { useState } from "react";
import { Download, Upload } from "utils/Icons";
import AddIncome from "components/Transactions/AddIncome";
import AddSpending from "components/Transactions/AddSpending";
import { CalculateBalance } from "utils/CalculateBalance";

const HeroLeft = () => {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddSpendingModal, setShowAddSpendingModal] = useState(false);
  const { currentBalance } = CalculateBalance();

  return (
    <div className="hero-container-left">
      <h5>My Balance</h5>
      <h2 className="mb-4">
        $ <span className="fw-bold">{currentBalance}</span>
      </h2>
      <div className="d-flex justify-content-center">
        <button
          className="budget-btn"
          onClick={() => setShowAddIncomeModal(true)}
        >
          <Download className={"me-1 me-md-2"} />
          Add Income
        </button>
        <button
          className="ms-2 ms-lg-3 budget-btn"
          onClick={() => setShowAddSpendingModal(true)}
        >
          <Upload className={"me-1 me-md-2"} />
          Add Spending
        </button>
      </div>
      <AddIncome
        show={showAddIncomeModal}
        handleClose={() => setShowAddIncomeModal(false)}
      />
      <AddSpending
        show={showAddSpendingModal}
        handleClose={() => setShowAddSpendingModal(false)}
      />
    </div>
  );
};

export default HeroLeft;
