import React from "react";
import "./slider.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
const Slider = () => {
  return (
    <div className="silder">
      <h1>LamadaAdmin</h1>
      <hr />
      <div className="center">
        <ul>
          <div>MAIN</div>
          <li>
            <DashboardIcon className="icon" />
            <p>Dashborad</p>
          </li>
          <div>LISTS</div>
          <li>
            <PersonIcon className="icon" />
            <p> Users</p>
          </li>
          <li>
            <StoreIcon className="icon" />
            <p> Products</p>
          </li>
          <li>
            <AddBusinessIcon className="icon" />
            <p> Orders</p>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <p>Delivery</p>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div>THEME</div>
        <div className="themes">
          <div className="color"></div>
          <div className="color"></div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
