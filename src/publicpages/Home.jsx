import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <h1>25 + 5 Clock</h1>
            <button>
                <Link to="/register">Register</Link>
            </button>
            <button>
                <Link to="/login">Login</Link>
            </button>
        </div>
    );
};

export default Home;
