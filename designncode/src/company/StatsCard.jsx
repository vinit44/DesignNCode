import React from "react";

const StatsCard = ({ title, value, subtitle }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <h2>{value}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default StatsCard;
