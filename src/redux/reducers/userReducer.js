import { AUTHTYPES } from "../actions/userAction";

const initialState = {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHTYPES.AUTH:
            return action.payload;

        default:
            return state;
    }
};

export default authReducer;
