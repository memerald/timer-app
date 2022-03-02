import React, { useEffect, useState } from "react";
import BreakLength from "./components/BreakLength";
import Reset from "./components/Reset";
import SessionLength from "./components/SessionLength";
import Timer from "./components/Timer";

function App() {
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
        setGetSessSec(0);
        setBreakLength(5);
        setSessionLength(25);
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

    return (
        <div className="clock-wrapper">
            <BreakLength
                breakLength={breakLength}
                setBreakLength={setBreakLength}
            />
            <div className="session-wrapper">
                <SessionLength
                    sessionLength={sessionLength}
                    setSessionLength={setSessionLength}
                    flag={flag}
                />

                <Timer
                    breakFlag={breakFlag}
                    getBreakMin={getBreakMin}
                    getBreakSec={getBreakSec}
                    getSessMin={getSessMin}
                    getSessSec={getSessSec}
                    setFlag={setFlag}
                    flag={flag}
                />
                <Reset setFlag={setFlag} handleReset={handleReset} />
            </div>
        </div>
    );
}

export default App;
