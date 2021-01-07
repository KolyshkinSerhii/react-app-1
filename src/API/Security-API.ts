import { instance } from "./API";

type GetCaptchaUrlType = {
    url: string
}

export const securityAPI = {
    captchaUrl() {
        return instance.get<GetCaptchaUrlType>(`/security/get-captcha-url`).then(res => res.data);
    }
};
