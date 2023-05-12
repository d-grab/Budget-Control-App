import { useCollection } from "customHooks/useCollection";
import { useFirestore } from "customHooks/useFirestore";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CalculateBalance } from "utils/CalculateBalance";
import { TrendingDown } from "utils/Icons";
import { ArrowOutward, Download, Upload, TrendingUp } from "utils/Icons";
const HeroRight = () => {
  const { incomeBalance, outcomeBalance, currentBalance } = CalculateBalance();

  const { documents: transactions, error } = useCollection("transactions", [
    "createdAt",
    "desc",
  ]);
  const { documents: plans, planError } = useCollection("plans", [
    "createdAt",
    "desc",
  ]);
  const { documents: categories, categoryError } = useCollection("categories", [
    "createdAt",
    "desc",
  ]);

  const { deleteDocument, response } = useFirestore("transactions");
  const { deleteDocument: deletePlan, response: planResponse } =
    useFirestore("plans");
  const { deleteDocument: deleteCategory, response: categoryResponse } =
    useFirestore("categories");

  const handleResetAll = () => {
    if (!error && !planError && !categoryError) {
      plans?.forEach((plan) => {
        deletePlan(plan.id);
        console.log("deleted")
      });

      if (planResponse.error) {
        return toast.error(planResponse.error);
      }

      transactions?.forEach((transaction) => {
        deleteDocument(transaction.id);
      });

      if (response.error) {
        return toast.error(response.error);
      }

      categories?.forEach((category) => {
        deleteCategory(category.id);
      });

      if (categoryResponse.error) {
        return toast.error(categoryResponse.error);
      }

      toast.success("All transactions, plans and categories are reseted.");
    } else {
      toast.error(error + " " + planError + " " + categoryError);
    }
  };
  return (
    <div className="hero-container-right">
      <div className="d-flex flex-column justify-content-center">
        <h6 className="fw-bold heading my-3">
          Budget Overview{" "}
          <button
            className="reset-all-btn py-1 px-2 bg-danger text-light rounded border-0"
            onClick={handleResetAll}
          >
            Reset
          </button>
        </h6>
        <div className="budget-statistics">
          <div className="statistics-container">
            <div className="d-flex justify-content-between">
              <Download className={"statistics-btn"} />
              <div className="d-flex text-success">
                <TrendingUp className={"me-1"} />
                <span>
                  +{((currentBalance / incomeBalance) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mt-3 mb-2 opacity-75">Incomes</h6>
                <h6 className="fw-bold">${incomeBalance}</h6>
              </div>
              <Link to="/graphs">
                <ArrowOutward
                  className={
                    "arrow-link opacity-75 text-success border border-success"
                  }
                />
              </Link>
            </div>
          </div>
          <div className="statistics-container">
            <div className="d-flex justify-content-between">
              <Upload className={"statistics-btn"} />
              <div className="d-flex text-danger">
                <TrendingDown className={"me-1"} />
                <span>
                  -{((outcomeBalance / incomeBalance) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mt-3 mb-2 opacity-75">Spendings</h6>
                <h6 className="fw-bold">${outcomeBalance}</h6>
              </div>
              <Link to="/graphs">
                <ArrowOutward
                  className={
                    "arrow-link opacity-75 text-danger  border border-danger"
                  }
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRight;
