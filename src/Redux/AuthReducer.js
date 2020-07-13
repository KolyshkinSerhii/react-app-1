import {
    authAPI, securityAPI
} from "../API/API";
import {
    stopSubmit
} from "redux-form"

const SET_USER_DATA = 'network/auth/SET-USER-DATA';
const SET_CAPTCHA_URL_SUCCESS = 'network/auth/SET-CAPTCHA-URL-SUCCESS';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

            default:
                return state;
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId,email,login,isAuth}
});
export const setCaptchaUrlSuccess = (captchaUrl) => ({
    type: SET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {
            id,
            login,
            email
        } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error";
        dispatch(stopSubmit('login', {_error: message}));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.captchaUrl();
    const captchaUrl = response.data.url
    dispatch(setCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;