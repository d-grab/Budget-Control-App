import React from "react";

export const Upload = ({ className }) => {
  return (
    <span className={"material-symbols-outlined " + className}>upload</span>
  );
};

export const Download = ({ className }) => {
  return (
    <span className={"material-symbols-outlined " + className}>download</span>
  );
};

export const Menu = ({ className }) => {
  return <span className={"material-symbols-outlined " + className}>menu</span>;
};

export const ArrowOutward = ({ className }) => {
  return (
    <span className={"material-symbols-outlined " + className}>
      arrow_outward
    </span>
  );
};


export const TrendingUp = ({ className }) => {
    return (
      <span className={"material-symbols-outlined " + className}>
        trending_up
      </span>
    );
  };

  export const TrendingDown = ({ className }) => {
    return (
      <span className={"material-symbols-outlined " + className}>
        trending_down
      </span>
    );
  };
  
  