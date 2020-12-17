import {authAPI, ResultCodesEnum, ResultCodesEnumForCaptcha, securityAPI} from "../API/API";
import {stopSubmit} from "redux-form"

const SET_USER_DATA = 'network/auth/SET-USER-DATA';
const SET_CAPTCHA_URL_SUCCESS = 'network/auth/SET-CAPTCHA-URL-SUCCESS';

export type InitialStateType = typeof initialState;

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string |null
};


const authReducer = (state = initialState, action: any): InitialStateType => {
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
type SetAuthUserDataPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {
        userId,
        email,
        login,
        isAuth
    }
});

export const setCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: SET_CAPTCHA_URL_SUCCESS,
    payload: {
        captchaUrl
    }
});

export const getAuthUserData = () => async (dispatch: any) => {
    let MeData = await authAPI.me();
    if (MeData.resultCode === ResultCodesEnum.Success) {
        let {
            id,
            login,
            email
        } = MeData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let LoginData = await authAPI.login(email, password, rememberMe, captcha);
    if (LoginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (LoginData.resultCode === ResultCodesEnumForCaptcha.CaptchaIsRequered) {
            dispatch(getCaptchaUrl())
        }
        let message = LoginData.messages.length > 0 ? LoginData.messages[0] : "some error";
        dispatch(stopSubmit('login', {
            _error: message
        }));
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.captchaUrl();
    const captchaUrl = response.data.url
    dispatch(setCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch: any) => {
    let LoginData = await authAPI.logout();
    if (LoginData.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;