import React, { useState } from "react";
import Transaction from "./Transaction";
import { toast } from "react-toastify";
import { useCollection } from "customHooks/useCollection";
import UpdateSpending from "./UpdateSpending";
import UpdateIncome from "./UpdateIncome";

const TransactionList = ({ filter }) => {
  const { documents, error } = useCollection("transactions", [
    "createdAt",
    "desc",
  ]);

  const [showUpdateSpending, setShowUpdateSpending] = useState(false);
  const [showUpdateIncome, setShowUpdateIncome] = useState(false);
  const [data, setData] = useState({});

  const TransComp = ({ idx, transaction }) => {
    return (
      <Transaction
        key={idx}
        data={transaction}
        onClick={() => {
          setData(transaction);
          transaction.category === "#income"
            ? setShowUpdateIncome(true)
            : setShowUpdateSpending(true);
        }}
      />
    );
  };

  return (
    <>
      <div className="transactions shadow">
        {error && toast.error(error)}
        {!documents ? (
          <div className="text-center">Loading...</div>
        ) : documents?.length > 0 ? (
          documents.map((transaction, idx) => {
            if (
              !filter ||
              (filter?.category === "#all" && filter?.plan === "all")
            ) {
              return <TransComp key={idx} transaction={transaction} />;
            } else if (
              (filter.category === "#all" ||
                filter.category === transaction.category) &&
              (filter.plan === "all" || filter.plan === transaction.plan)
            ) {
              return <TransComp key={idx} transaction={transaction} />;
            } else {
              return <></>;
            }
          })
        ) : (
          <div className="text-center fw-bold">No Transactions.</div>
        )}
      </div>
      <UpdateIncome
        show={showUpdateIncome}
        handleClose={() => setShowUpdateIncome(false)}
        transaction={data}
      />

      <UpdateSpending
        show={showUpdateSpending}
        handleClose={() => setShowUpdateSpending(false)}
        transaction={data}
      />
    </>
  );
};

export default TransactionList;
