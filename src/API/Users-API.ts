import { GetItems, instance } from './API';
import { profileAPI } from "./Profile-API";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItems>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`);

    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`);
    },
    getUserId(userId: number) {
        return profileAPI.getProfile(userId);
    }
};
