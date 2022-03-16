import { postDataAPI } from "../../utlis/fetchData";
import valid from "../../utlis/userAuth";

export const AUTHTYPES = {
    AUTH: "AUTH",
};

export const login = (data) => async (dispatch) => {
    try {
        const res = await postDataAPI("login", data);
        dispatch({
            type: AUTHTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
            },
        });

        localStorage.setItem("firstLogin", true);
    } catch (error) {
        alert(error.response.data.msg);
    }
};

export const registerUser = (data) => async () => {
    const check = valid(data);

    if (check.errLength > 0) {
        alert("Invalid inputs");
    } else {
        try {
            await postDataAPI("register", data);
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
};

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem("firstLogin");
        await postDataAPI("logout");
        window.location.href = "/";

        dispatch({
            type: AUTHTYPES.AUTH,
            payload: {},
        });
    } catch (error) {
        alert(error.message);
    }
};

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
        try {
            const res = await postDataAPI("refresh_token");
            dispatch({
                type: AUTHTYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user,
                },
            });
        } catch (error) {
            alert(error.message);
        }
    }
};
