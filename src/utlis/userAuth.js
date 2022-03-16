const valid = ({ userName, password }) => {
    const error = {};

    if (!userName) {
        error.userName = "Please enter your name";
    } else if (userName.length > 25) {
        error.userName = "name is upto 25 characters long";
    }

    if (!password) {
        error.password = "Please enter your password";
    } else if (password.length < 6) {
        error.password = "password must be at least 6 character long ";
    }

    return {
        errMsg: error,
        errLength: Object.keys(error).length,
    };
};

export default valid;
