import React, { useEffect, useState } from "react";

function App() {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(1);
    const [sessionTimer, setSessionTimer] = useState(sessionLength * 60);
    const [breakTimer, setBreakTimer] = useState(breakLength * 60);
    const [flag, setFlag] = useState(false);
    const [getSessMin, setGetSessMin] = useState(0);
    const [getSessSec, setGetSessSec] = useState(0);
    const [getBreakMin, setGetBreakMin] = useState(0);
    const [getBreakSec, setGetBreakSec] = useState(0);
    let breakFlag = false;

    useEffect(() => {
        setSessionTimer(sessionLength * 60);
    }, [sessionLength]);

    useEffect(() => {
        setBreakTimer(breakLength * 60);
    }, [breakLength]);

    if (!breakFlag) {
        setTimeout(() => {
            setGetSessMin(parseInt(sessionTimer / 60));
            setGetSessSec(parseInt(sessionTimer % 60));
            if (flag) {
                setSessionTimer(sessionTimer - 1);
            }
        }, 1000);
    }
    if (getSessMin <= 0 && getSessSec <= 0) {
        breakFlag = true;
        setTimeout(() => {
            setGetBreakMin(parseInt(breakTimer / 60));
            setGetBreakSec(parseInt(breakTimer % 60));
            // if (flag) {
            setBreakTimer(breakTimer - 1);
            // }
        }, 1000);
    }

    return (
        <div className="clock-wrapper">
            <h1>25 + 5 Clock</h1>
            <div className="break-wrapper">
                <h3 id="break-label">Break Length</h3>
                <div className="break-container">
                    <button
                        id="break-decrement"
                        onClick={() => setBreakLength(breakLength - 1)}
                    >
                        -
                    </button>
                    <span id="break-length">{breakLength}</span>
                    <button
                        id="break-increment"
                        onClick={() => setBreakLength(breakLength + 1)}
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
                        onClick={() => setSessionLength(sessionLength - 1)}
                    >
                        -
                    </button>
                    <span id="session-length">{sessionLength}</span>
                    <button
                        id="session-increment"
                        disabled={!flag ? false : true}
                        onClick={() => setSessionLength(sessionLength + 1)}
                    >
                        +
                    </button>
                </div>
                {!breakFlag && (
                    <div id="session-container">
                        <h3 id="timer-label">Session</h3>
                        <h1>{`${
                            getSessMin < 10 ? "0" + getSessMin : getSessMin
                        } : ${
                            getSessSec < 10 ? "0" + getSessSec : getSessSec
                        }`}</h1>
                        <button onClick={() => setFlag(!flag)}>
                            {flag ? "Stop" : "Start"}
                        </button>
                    </div>
                )}
                {breakFlag && (
                    <div id="session-container">
                        <h3 id="timer-label">Break</h3>
                        <h1>{`${
                            getBreakMin < 10 ? "0" + getBreakMin : getBreakMin
                        } : ${
                            getBreakSec < 10 ? "0" + getBreakSec : getBreakSec
                        }`}</h1>
                        <button onClick={() => setFlag(!flag)}>
                            {flag ? "Stop" : "Start"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
