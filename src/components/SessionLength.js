import React from "react";

const SessionLength = ({ sessionLength, setSessionLength, flag }) => {
    return (
        <div>
            <h3 id="session-label">Session Length</h3>
            <div className="session-container">
                <span
                    id="session-decrement"
                    disabled={!flag ? false : true}
                    onClick={() =>
                        // does not let session length to be less than 1 and decreases session length counter by 1
                        sessionLength > 1 && setSessionLength(sessionLength - 1)
                    }
                >
                    <i className="fas fa-arrow-alt-circle-down"></i>
                </span>
                <p id="session-length">{sessionLength}</p>
                <span
                    id="session-increment"
                    disabled={!flag ? false : true}
                    onClick={() =>
                        // does not let session length to be more than 60 and increases session length counter by 1
                        sessionLength < 60 &&
                        setSessionLength(sessionLength + 1)
                    }
                >
                    <i className="fas fa-arrow-alt-circle-up"></i>
                </span>
            </div>
        </div>
    );
};

export default SessionLength;
