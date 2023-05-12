import TransactionList from "components/Transactions/TransactionList";
import { useCollection } from "customHooks/useCollection";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

const Transactions = () => {
  const { documents: categories, error: categoriesError } = useCollection(
    "categories",
    ["createdAt", "desc"]
  );
  const { documents: plans, error } = useCollection("plans", [
    "createdAt",
    "desc",
  ]);
  const [filter, setfilter] = useState({
    category: "#all",
    plan: "all",
  });

  const handleChange = (e) => {
    setfilter({ ...filter, [e.target.name]: e.target.value });
  };
  return (
    <div className="transaction-page">
      {error && toast.error(error)}
      {categoriesError && toast.error(categoriesError)}
      <h2 className="m-0 fw-bold text-center mb-3 mb-sm-4">Transactions</h2>
      <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
        <Form.Group>
          <Form.Select
            onChange={(e) => handleChange(e)}
            name="category"
            className="py-2"
          >
            <option value={"#all"}>All Category</option>
            <option value={"#income"} idx={"01"}>
              Income
            </option>
            <option value={"#outcome"} idx={"00"}>
              Outcome
            </option>
            {categories?.map((category, idx) => {
              return (
                <option value={category.code} key={idx}>
                  {category.description}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Select
            onChange={(e) => handleChange(e)}
            name="plan"
            className="py-2"
          >
            <option value={"all"}>All Plans</option>
            <option value={"Deposit"}>Deposit</option>
            {plans?.map((plan, idx) => {
              return (
                <option value={plan.title} key={idx}>
                  {plan.title}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </div>

      <TransactionList filter={filter} />
    </div>
  );
};

export default Transactions;
