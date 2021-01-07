import { ThunkAction } from 'redux-thunk';
import { InferActionsType, AppStateType } from './Redux-store';
import { ResultCodesEnum, ResultCodesEnumForCaptcha } from "../API/API";
import { securityAPI } from "../API/Security-API";
import { authAPI } from "../API/Auth-API";
import { FormAction, stopSubmit } from "redux-form"



export type InitialStateType = typeof initialState;

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};


const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'network/auth/SET-USER-DATA':
        case 'network/auth/SET-CAPTCHA-URL-SUCCESS':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

type ActionTypes = InferActionsType<typeof actions>

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'network/auth/SET-USER-DATA',
        payload: {
            userId,
            email,
            login,
            isAuth
        }
    } as const),

    setCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'network/auth/SET-CAPTCHA-URL-SUCCESS',
        payload: {
            captchaUrl
        }
    } as const)
}

export const getAuthUserData = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch: any) => {
    let MeData = await authAPI.me();
    if (MeData.resultCode === ResultCodesEnum.Success) {
        let {
            id,
            login,
            email
        } = MeData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | FormAction> => async (dispatch) => {
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

export const getCaptchaUrl = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
    let data = await securityAPI.captchaUrl();
    const captchaUrl = data.url
    dispatch(actions.setCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch: any) => {
    let LoginData = await authAPI.logout();
    if (LoginData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;