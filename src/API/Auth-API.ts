import { ResultCodesEnum, ResultCodesEnumForCaptcha, instance, ResponseTypes } from './API';

type MeResponseType = {
    id: number
    email: string
    login: string
};
type LoginResponseType = {
    userId: number
};

export const authAPI = {
    me() {
        return instance.get<ResponseTypes<MeResponseType>>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha = null as null | string) {
        return instance.post<ResponseTypes<LoginResponseType, ResultCodesEnum | ResultCodesEnumForCaptcha>>('auth/login', { email, password, rememberMe, captcha }).then(res => res.data);
    },
    logout() {
        return instance.delete('auth/login').then(res => res.data) as Promise<ResponseTypes>
    }
};
