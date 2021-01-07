import Axios from 'axios';
import { UserType } from '../TSTypes/TSTypesFile';

export const instance = Axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "f204f603-a647-41de-80aa-0a1511661d17"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodesEnumForCaptcha {
    CaptchaIsRequered = 10
}

export type GetItems = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}


export type ResponseTypes<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}
