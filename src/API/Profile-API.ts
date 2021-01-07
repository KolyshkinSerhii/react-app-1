import { PhotosType, ProfileType } from './../TSTypes/TSTypesFile';
import { instance, ResponseTypes } from './API';

type ProfileResponse = ProfileType

type SetPhoto = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileResponse>('profile/' + userId).then(res => res.data);
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId).then(res => res.data);
    },
    updateStatus(status: string) {
        return instance.put<ResponseTypes>('profile/status', { status }).then(res => res.data);
    },
    savePhoto(file: any) {
        const formData = new FormData();
        formData.append('image', file);
        return instance.put<ResponseTypes<SetPhoto>>('profile/photo', formData, {
            headers: {
                'Content-type': 'multipart-form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put('profile', profile);
    }
};
