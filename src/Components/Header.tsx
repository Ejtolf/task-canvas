import React from "react";
import LOGO from "../media/logo.png";
import "../Styles/Header.css";

export default function Header() {
    return (
        <div className="header">
            <div className="search-panel">
                <div className="logo">
                    <img src={LOGO} alt="TaskCanvas" height="100" />
                    <h1>TaskCanvas</h1>
                </div>
            </div>
        </div>

    )
}