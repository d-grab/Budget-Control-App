import { useCollection } from "customHooks/useCollection";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import BudgetChart from "./BudgetChart";
import GetGraphData from "utils/GetGraphData";

const Graphs = () => {
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

  const { isLoading, inData, outData, options, docLength } =
    GetGraphData(filter);

  console.log(outData);
  return (
    <div className="graphs-container">
      <div className="graphs-page">
        {error && toast.error(error)}
        {categoriesError && toast.error(categoriesError)}
        <h1 className="mb-4 text-center">Budget Graph</h1>
        {isLoading ? (
          <div className="text-center fw-bold bg-light rounded py-2 max-w-768">
            Loading...
          </div>
        ) : docLength === 0 ? (
          <div className="text-center fw-bold bg-light rounded py-2 max-w-768">
            No Transactions found to generate Graph.
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
              <Form.Group>
                <Form.Select
                  onChange={(e) => handleChange(e)}
                  name="category"
                  className="py-2"
                >
                  <option value={"#all"}>All Category</option>
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
            <div className="mb-3 graph">
              <BudgetChart data={outData} options={options} type={"bar"} />
            </div>
            <div className="graph">
              <BudgetChart data={inData} options={options} type={"line"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Graphs;
