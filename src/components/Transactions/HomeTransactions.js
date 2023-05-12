import React from "react";
import { Link } from "react-router-dom";
import TransactionList from "./TransactionList";

const HomeTransactions = () => {
  return (
    <>
      <div className="transactions-header">
        <h6 className="transactions-title me-1">Transactions</h6>
        <Link to="/transactions" className="transactions-view-all-btn">
          View all
        </Link>
      </div>

      <TransactionList />
    </>
  );
};

export default HomeTransactions;
