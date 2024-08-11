import React from "react";


import Navigation from "../Navigation";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="homepage">
      <Navigation />
      <div className="home">
        <h1 className="heading-1">Dashboard</h1>
        <div className="kpi-container">
          <div className="box"><h1>Total Users:10</h1></div>
          <div className="box"><h1>Total Posts: 10</h1></div>
          <div className="box"><h1>Active Users (Last 24h): 5</h1></div>
          <div className="box"><h1>Posts (Last 24h): 10</h1></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
