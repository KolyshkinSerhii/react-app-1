import { GetItems, instance, ResponseTypes } from './API';
import { profileAPI } from "./Profile-API";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItems>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post<ResponseTypes>(`follow/${userId}`).then(res => res.data)

    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseTypes>
    },
    getUserId(userId: number) {
        return profileAPI.getProfile(userId);
    }
};
