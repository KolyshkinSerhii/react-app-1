import { ProfileType } from './../TSTypes/TSTypesFile';
import Axios from 'axios';

const instance = Axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "f204f603-a647-41de-80aa-0a1511661d17"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        })
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)

    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getUserId(userId: number) {
         return profileAPI.getProfile(userId)
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodesEnumForCaptcha {
    CaptchaIsRequered = 10
}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    resultCode: ResultCodesEnum | ResultCodesEnumForCaptcha
    messages: Array<string>
    data: { userId: number }
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha = null as null | string) {
        return instance.post<LoginResponseType>('auth/login', { email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        return instance.delete<LoginResponseType>('auth/login').then(res => res.data)
    }
}

export const securityAPI = {
    captchaUrl() {
        return instance.get(`/security/get-captcha-url`);
    }
}

type ProfileResponse = ProfileType

export const profileAPI = {
    getProfile(userId: number) {
         return instance.get<ProfileResponse>('profile/' + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status})
    },
    savePhoto(file: any) {
        const formData = new FormData();
        formData.append('image', file);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-type': 'multipart-form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put('profile', profile)
    }
}