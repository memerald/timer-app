import React from "react";

const BreakLength = ({ breakLength, setBreakLength, breakFlag }) => {
    return (
        <div className="break-wrapper">
            <h3 id="break-label">Break Length</h3>
            <div className="break-container">
                <button
                    className="timer-dec"
                    id="break-decrement"
                    disabled={breakFlag ? true : false}
                    onClick={() =>
                        // does not let break length to be less than 1 and decreases break length counter by 1
                        breakLength > 1 && setBreakLength(breakLength - 1)
                    }
                >
                    <i className="fas fa-arrow-alt-circle-down"></i>
                </button>
                <p id="break-length">{breakLength}</p>
                <button
                    className="timer-inc"
                    id="break-increment"
                    disabled={breakFlag ? true : false}
                    onClick={() =>
                        // does not let break length to be more than 60 and increases break length counter by 1
                        breakLength < 60 && setBreakLength(breakLength + 1)
                    }
                >
                    <i className="fas fa-arrow-alt-circle-up"></i>
                </button>
            </div>
        </div>
    );
};

export default BreakLength;
