import React from "react";

const Reset = ({ setFlag, handleReset }) => {
    return (
        <div>
            <span
                id="reset"
                onChange={() => setFlag(false)}
                onClick={handleReset}
                // handles reset when clicked on reset button
            >
                <i className="fas fa-redo-alt"></i>
            </span>
        </div>
    );
};

export default Reset;
