import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className='navbar'>
            <Link to='/To-Do/'>Home</Link>
            <Link to='/To-Do/work'>Work</Link>
        </div>
    )
}
export default Navbar;
