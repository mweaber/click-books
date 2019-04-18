import React from "react";
import {Link} from "react-router-dom";

function Header () {
    return (
        <div className = "container">
            <div className ="navbar">
                <h2 className="header">Google Book Search</h2>
                <ul>
                    <li><Link to = "/">Search</Link></li>
                    <li><Link to = "/saved">Saved</Link></li>
                </ul>
            </div>
        </div>    
    );
}

export default Header;