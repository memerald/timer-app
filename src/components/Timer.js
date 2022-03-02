import React from "react";
import Reset from "./Reset";

const Timer = ({
    breakFlag,
    getBreakMin,
    getBreakSec,
    getSessMin,
    getSessSec,
    setFlag,
    flag,
    handleReset,
}) => {
    return (
        <div className="timer-wrapper">
            {!breakFlag && (
                <div id="session-container">
                    <h3 id="timer-label">Session</h3>
                    {/*if minute and second gets lower than 10, adds a 0 before it*/}
                    <h1 id="time-left">{`${
                        getSessMin < 10 ? "0" + getSessMin : getSessMin
                    }:${getSessSec < 10 ? "0" + getSessSec : getSessSec}`}</h1>
                    <span id="start_stop" onClick={() => setFlag(!flag)}>
                        {flag ? (
                            <i className="fas fa-pause"></i>
                        ) : (
                            <i className="fas fa-play"></i>
                        )}
                        {/*sets flag true or false to stop or start timer*/}
                    </span>
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
                    <span id="start_stop" onClick={() => setFlag(!flag)}>
                        {flag ? (
                            <i className="fas fa-pause"></i>
                        ) : (
                            <i className="fas fa-play"></i>
                        )}
                        {/*sets flag true or false to stop or start timer*/}
                    </span>
                </div>
            )}
            <Reset setFlag={setFlag} handleReset={handleReset} />
        </div>
    );
};

export default Timer;
