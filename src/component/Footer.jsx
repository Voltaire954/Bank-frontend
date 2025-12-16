import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="vlok">
          {" "}
          Original Bank
          <ul className="support">
            <li>Tech-support</li>
            <li>Customer-support</li>
            <li>App-support</li>
          </ul>
        </div>

        <div className="logo">

        </div>
        <Avatar sx={{ bgcolor: deepOrange[700] }}>OB</Avatar>
      </div>
    </>
  );
}
