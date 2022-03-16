import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BreakLength from "../components/BreakLength";
import SessionLength from "../components/SessionLength";
import Timer from "../components/Timer";
import { logout } from "../redux/actions/userAction";

const TimerDisplay = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    // default states of session and break

    const [sessionTimer, setSessionTimer] = useState(sessionLength * 60);
    const [breakTimer, setBreakTimer] = useState(breakLength * 60);
    // converts session and break lengths from minutes to seconds

    const [getSessMin, setGetSessMin] = useState(0);
    const [getSessSec, setGetSessSec] = useState(0);
    // displays session minutes and seconds

    const [getBreakMin, setGetBreakMin] = useState(0);
    const [getBreakSec, setGetBreakSec] = useState(0);
    // displays break minutes and seconds

    const [flag, setFlag] = useState(false);
    const [breakFlag, setBreakFlag] = useState(false);
    const [resetFlag, setResetFlag] = useState(false);
    // sets session, break flag as well as reset flag

    const handleReset = () => {
        setFlag(false);
        setResetFlag(true);
        setBreakFlag(false);
        setBreakLength(5);
        setSessionLength(25);
        setGetSessMin(25);
        setGetSessSec(0);
        setSessionTimer(sessionLength * 60);
        // resets all states
    };

    useEffect(() => {
        setSessionTimer(sessionLength * 60);
        // manages session length state
    }, [sessionLength]);

    useEffect(() => {
        setBreakTimer(breakLength * 60);
        // manages break length state
    }, [breakLength]);

    useEffect(() => {
        // starts session timer and checks if break flag is false
        if (!breakFlag) {
            setGetSessMin(parseInt(sessionTimer / 60));
            setGetSessSec(parseInt(sessionTimer % 60));
            if (sessionTimer === 1) {
                setFlag(false);
                // stops timer when session timer equals 1
            }
            setTimeout(() => {
                if (resetFlag) {
                    setSessionTimer(sessionLength * 60);
                    setResetFlag(false);
                    // if reset flag is true, sets session timer to session length and sets reset flag as false
                } else if (flag) {
                    setSessionTimer(sessionTimer - 1);
                    // timer continues until flag is true
                }
            }, 1000);
        }
        if (sessionTimer <= 0) {
            // when session timer reaches 0, starts break timer and sets session flag as false
            setBreakFlag(true);
            setFlag(false);
            setGetBreakMin(parseInt(breakTimer / 60));
            setGetBreakSec(parseInt(breakTimer % 60));
            if (breakTimer === 0) {
                setBreakFlag(false);
                handleReset();
                // resets all states when break timer reaches 0
            }
            setTimeout(() => {
                if (breakTimer > 0) {
                    setBreakTimer(breakTimer - 1);
                    // continues timer until timer reaches 0
                }
            }, 1000);
        }
    }, [flag, breakTimer, sessionTimer]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authReducer } = useSelector((state) => state);

    useEffect(() => {
        if (!authReducer.token) {
            navigate("/login");
        }
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="clock-wrapper">
            <div className="set-timer">
                <h1 className="responsive-heading">25 + 5 Clock</h1>
                <h1 className="first-heading">25 + 5 </h1>
                <BreakLength
                    breakLength={breakLength}
                    setBreakLength={setBreakLength}
                    breakFlag={breakFlag}
                />
                <SessionLength
                    sessionLength={sessionLength}
                    setSessionLength={setSessionLength}
                    flag={flag}
                />
            </div>

            <div className="timer-container">
                <h1 className="second-heading">Clock</h1>
                <Timer
                    breakFlag={breakFlag}
                    getBreakMin={getBreakMin}
                    getBreakSec={getBreakSec}
                    getSessMin={getSessMin}
                    getSessSec={getSessSec}
                    setFlag={setFlag}
                    flag={flag}
                    handleReset={handleReset}
                />
            </div>
            <div className="user-details">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default TimerDisplay;
