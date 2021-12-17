import React from "react";
import { Link } from "react-router-dom";




function Homepage() {
  return (
    <div className="homePage">
           <nav>
           <h1>So many options to choose from!</h1>
            <Link to="/pizza"><p><button id="order-pizza">Order Now</button></p></Link>
           </nav>
    </div>
       );
       }
    export default Homepage;