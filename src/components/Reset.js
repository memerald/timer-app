import React from "react";

const Reset = ({ setFlag, handleReset }) => {
    return (
        <div>
            <button
                id="reset"
                onChange={() => setFlag(false)}
                onClick={handleReset}
                // handles reset when clicked on reset button
            >
                Reset
            </button>
        </div>
    );
};

export default Reset;
