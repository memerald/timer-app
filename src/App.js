import React, { useEffect } from "react";
import TimerDisplay from "./privatepages/timerDisplay";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./publicpages/Home";
import Register from "./publicpages/Register";
import Login from "./publicpages/Login";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/actions/userAction";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authReducer } = useSelector((state) => state);

    useEffect(() => {
        if (!authReducer.token) {
            navigate("/");
        }
        dispatch(refreshToken());
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/timer" element={<TimerDisplay />} />
            </Routes>
        </div>
    );
}

export default App;
