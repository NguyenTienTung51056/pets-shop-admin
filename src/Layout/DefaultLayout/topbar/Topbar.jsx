import React from "react";
import "./topbar.css";
import { useSelector } from "react-redux";

export default function Topbar() {
  const user = useSelector((state) => state.user?.currentUser);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Pet Shop Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <h4>Hello {user?.username}</h4>
          </div>
          <img src={user?.img} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
