import React, { useEffect, useState } from "react";

function App() {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [sessionTimer, setSessionTimer] = useState(sessionLength * 60);
    const [breakTimer, setBreakTimer] = useState(breakLength * 60);
    const [flag, setFlag] = useState(false);
    const [getSessMin, setGetSessMin] = useState(0);
    const [getSessSec, setGetSessSec] = useState(0);
    const [getBreakMin, setGetBreakMin] = useState(0);
    const [getBreakSec, setGetBreakSec] = useState(0);
    const [breakFlag, setBreakFlag] = useState(false);
    const [resetFlag, setResetFlag] = useState(false);

    const handleReset = () => {
        setFlag(false);
        setResetFlag(true);
        setBreakFlag(false);
        setGetSessSec(0);
        setBreakLength(5);
        setSessionLength(25);
    };

    useEffect(() => {
        setSessionTimer(sessionLength * 60);
    }, [sessionLength]);

    useEffect(() => {
        setBreakTimer(breakLength * 60);
    }, [breakLength]);

    useEffect(() => {
        if (!breakFlag) {
            setGetSessMin(parseInt(sessionTimer / 60));
            setGetSessSec(parseInt(sessionTimer % 60));
            if (sessionTimer === 1) {
                setFlag(false);
            }
            setTimeout(() => {
                if (resetFlag) {
                    setSessionTimer(sessionLength * 60);
                    setResetFlag(false);
                } else if (flag) {
                    setSessionTimer(sessionTimer - 1);
                }
            }, 1000);
        }
        if (sessionTimer <= 0) {
            setBreakFlag(true);
            setFlag(false);
            setGetBreakMin(parseInt(breakTimer / 60));
            setGetBreakSec(parseInt(breakTimer % 60));
            if (breakTimer === 0) {
                setBreakFlag(false);
                handleReset();
            }
            setTimeout(() => {
                if (breakTimer > 0) {
                    setBreakTimer(breakTimer - 1);
                }
            }, 1000);
        }
    }, [flag, breakTimer, sessionTimer]);

    return (
        <div className="clock-wrapper">
            <h1>25 + 5 Clock</h1>
            <div className="break-wrapper">
                <h3 id="break-label">Break Length</h3>
                <div className="break-container">
                    <button
                        id="break-decrement"
                        onClick={() =>
                            breakLength > 1 && setBreakLength(breakLength - 1)
                        }
                    >
                        -
                    </button>
                    <span id="break-length">{breakLength}</span>
                    <button
                        id="break-increment"
                        onClick={() =>
                            breakLength < 60 && setBreakLength(breakLength + 1)
                        }
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="session-wrapper">
                <h3 id="session-label">Session Length</h3>
                <div className="session-container">
                    <button
                        id="session-decrement"
                        disabled={!flag ? false : true}
                        onClick={() =>
                            sessionLength > 1 &&
                            setSessionLength(sessionLength - 1)
                        }
                    >
                        -
                    </button>
                    <span id="session-length">{sessionLength}</span>
                    <button
                        id="session-increment"
                        disabled={!flag ? false : true}
                        onClick={() =>
                            sessionLength < 60 &&
                            setSessionLength(sessionLength + 1)
                        }
                    >
                        +
                    </button>
                </div>
                {!breakFlag && (
                    <div id="session-container">
                        <h3 id="timer-label">Session</h3>
                        <h1 id="time-left">{`${
                            getSessMin < 10 ? "0" + getSessMin : getSessMin
                        }:${
                            getSessSec < 10 ? "0" + getSessSec : getSessSec
                        }`}</h1>
                        <button id="start_stop" onClick={() => setFlag(!flag)}>
                            {flag ? "Stop" : "Start"}
                        </button>
                    </div>
                )}
                {breakFlag && (
                    <div id="session-container">
                        <h3 id="timer-label">Break</h3>
                        <h1 id="time-left">{`${
                            getBreakMin < 10 ? "0" + getBreakMin : getBreakMin
                        }:${
                            getBreakSec < 10 ? "0" + getBreakSec : getBreakSec
                        }`}</h1>
                        <button id="start_stop" onClick={() => setFlag(!flag)}>
                            {flag ? "Stop" : "Start"}
                        </button>
                    </div>
                )}
                <button
                    id="reset"
                    onChange={() => setFlag(false)}
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default App;
