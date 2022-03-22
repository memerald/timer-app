import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { login } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const initialState = { userName: "", password: "" };
    const [userData, setUserData] = useState(initialState);
    const { userName, password } = userData;
    const { authReducer } = useSelector((state) => state);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(userData));
        // console.log(userData);
    };

    useEffect(() => {
        if (authReducer.token) navigate("/timer");
    }, [authReducer]);

    return (
        <div className="login">
            <Navbar />
            <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="login-container">
                        <h1>Login</h1>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={userName}
                                onChange={handleInputChange}
                                name="userName"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handleInputChange}
                                name="password"
                            />
                        </div>
                        <div>
                            <input type="submit" value="Login" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
