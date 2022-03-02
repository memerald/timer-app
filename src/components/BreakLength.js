import React from "react";

const BreakLength = ({ breakLength, setBreakLength }) => {
    return (
        <div>
            <h1>25 + 5 Clock</h1>
            <div className="break-wrapper">
                <h3 id="break-label">Break Length</h3>
                <div className="break-container">
                    <span
                        id="break-decrement"
                        onClick={() =>
                            // does not let break length to be less than 1 and decreases break length counter by 1
                            breakLength > 1 && setBreakLength(breakLength - 1)
                        }
                    >
                        <i className="fas fa-arrow-alt-circle-down"></i>
                    </span>
                    <p id="break-length">{breakLength}</p>
                    <span
                        id="break-increment"
                        onClick={() =>
                            // does not let break length to be more than 60 and increases break length counter by 1
                            breakLength < 60 && setBreakLength(breakLength + 1)
                        }
                    >
                        <i className="fas fa-arrow-alt-circle-up"></i>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BreakLength;
