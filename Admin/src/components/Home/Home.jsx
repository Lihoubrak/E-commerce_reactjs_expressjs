import React from "react";
import "./home.scss";
import Slider from "../Slider/Slider";
import Navbar from "../Navbar/Navbar";
import Widget from "../Widget/Widget";
import Chart from "../Chart/Chart";
import Feature from "../Feature/Feature";
import TableTransaction from "../TableTransaction/TableTransaction";
const Home = () => {
  return (
    <div>
      <div className="homepage">
        <Slider />
        <div className="mainbord">
          <Navbar />
          <div className="warpp">
            <Widget />
            <Widget />
            <Widget />
            <Widget />
          </div>
          <div className="anylize">
            <Feature />
            <Chart />
          </div>
          <div className="tableTransaction">
            <TableTransaction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
