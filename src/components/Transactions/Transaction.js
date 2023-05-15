import React from "react";
import Moment from "react-moment";

const Transaction = ({
  data: { description, amount, plan, category, createdAt }, onClick,
}) => {
  return (
    <div className="trans  px-1" onClick={() => onClick()} >
      <span
        className={
          "material-symbols-outlined trans-icons opacity-75 text-light " +
          (category === "#income" ? "bg-success" : "bg-danger")
        }
      >
        {category === "#income" ? "download" : "upload"}
      </span>
      <div className="d-flex flex-column w-100">
        <h6 className="trans-date m-0">
          {/* Dec 2, 2023 - 09:30 PM */}
          {
            <Moment format="MMMM D, YYYY - hh:mm A">
              {createdAt.toDate()}
            </Moment>
          }
          <span
            className={
              "ms-1 fw-bold " +
              (category === "#income" ? "text-success" : "text-danger")
            }
          >
            {category}
          </span>
        </h6>

        <div className="d-flex align-items-center">
          <p className="trans-description m-0">
            {description.length >= 40 ? (
              <>
                {description.substring(0, 40)}<span className="text-secondary">...</span>
              </>
            ) : (
              description
            )}
          </p>
          <h6
            className={
              "m-0 ms-auto fw-bold " +
              (category === "#income" ? "text-success" : "text-danger")
            }
          >
            {(category === "#income" ? "" : "-") + `£${amount}`}
          </h6>
        </div>

        <p className="trans-plan m-0 text-secondary">
          ~
          {plan.length >=
          25 ? (
            <>
              {plan.toLowerCase().substring(0, 25)}<span className="text-secondary">...</span>
            </>
          ) : (
            plan.toLowerCase()
          )}
        </p>
      </div>
    </div>
  );
};

export default Transaction;
