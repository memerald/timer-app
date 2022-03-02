import React from "react";

const SessionLength = ({ sessionLength, setSessionLength, flag }) => {
    return (
        <div>
            <h3 id="session-label">Session Length</h3>
            <div className="session-container">
                <button
                    id="session-decrement"
                    disabled={!flag ? false : true}
                    onClick={() =>
                        // does not let session length to be less than 1 and decreases session length counter by 1
                        sessionLength > 1 && setSessionLength(sessionLength - 1)
                    }
                >
                    -
                </button>
                <span id="session-length">{sessionLength}</span>
                <button
                    id="session-increment"
                    disabled={!flag ? false : true}
                    onClick={() =>
                        // does not let session length to be more than 60 and increases session length counter by 1
                        sessionLength < 60 &&
                        setSessionLength(sessionLength + 1)
                    }
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default SessionLength;
