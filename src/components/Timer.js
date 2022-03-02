import React from "react";

const Timer = ({
    breakFlag,
    getBreakMin,
    getBreakSec,
    getSessMin,
    getSessSec,
    setFlag,
    flag,
}) => {
    return (
        <div>
            {!breakFlag && (
                <div id="session-container">
                    <h3 id="timer-label">Session</h3>
                    {/*if minute and second gets lower than 10, adds a 0 before it*/}
                    <h1 id="time-left">{`${
                        getSessMin < 10 ? "0" + getSessMin : getSessMin
                    }:${getSessSec < 10 ? "0" + getSessSec : getSessSec}`}</h1>
                    <button id="start_stop" onClick={() => setFlag(!flag)}>
                        {flag ? "Stop" : "Start"}{" "}
                        {/*sets flag true or false to stop or start timer*/}
                    </button>
                </div>
            )}
            {breakFlag && (
                <div id="session-container">
                    <h3 id="timer-label">Break</h3>
                    {/*if minute and second gets lower than 10, adds a 0 before it*/}
                    <h1 id="time-left">{`${
                        getBreakMin < 10 ? "0" + getBreakMin : getBreakMin
                    }:${
                        getBreakSec < 10 ? "0" + getBreakSec : getBreakSec
                    }`}</h1>
                    <button id="start_stop" onClick={() => setFlag(!flag)}>
                        {flag ? "Stop" : "Start"}
                        {/*sets flag true or false to stop or start timer*/}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Timer;
