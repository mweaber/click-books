import React from "react";
import {Link} from "react-router-dom";

function ErrorPage () {
    return (
        <div className = "container">
            <div className ="navbar">
                <h2 className="errorPage">Error!</h2>
                <ul>
                    <li><Link to = "/">Home</Link></li>
                </ul>
            </div>
        </div>    
    );
}

export default ErrorPage;