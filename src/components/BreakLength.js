import React from "react";

const BreakLength = ({ breakLength, setBreakLength }) => {
    return (
        <div>
            <h1>25 + 5 Clock</h1>
            <div className="break-wrapper">
                <h3 id="break-label">Break Length</h3>
                <div className="break-container">
                    <button
                        id="break-decrement"
                        onClick={() =>
                            // does not let break length to be less than 1 and decreases break length counter by 1
                            breakLength > 1 && setBreakLength(breakLength - 1)
                        }
                    >
                        -
                    </button>
                    <span id="break-length">{breakLength}</span>
                    <button
                        id="break-increment"
                        onClick={() =>
                            // does not let break length to be more than 60 and increases break length counter by 1
                            breakLength < 60 && setBreakLength(breakLength + 1)
                        }
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BreakLength;
