import { usersAPI, profileAPI } from '../API/API';
import {stopSubmit} from 'redux-form'
import { PostType, ProfileType, PhotosType } from '../TSTypes/TSTypesFile';

const ADD_POST = 'network/profile/UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'network/profile/SET-USER-PROFILE';
const SET_STATUS = 'network/profile/SET-STATUS';
const SET_PHOTO = 'network/profile/SET-PHOTO'


let initialState = {
    posts: [{
            id: 1,
            message: "Hi",
            likeCounts: 12
        },
        {
            id: 2,
            message: "Hey",
            likeCounts: 20
        }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}
export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.addPost,
                likeCounts: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
            case SET_USER_PROFILE: {
                return {
                    ...state,
                    profile: action.profile
                };
            }
            case SET_STATUS: {
                return {
                    ...state,
                    status: action.status
                };
            }
            case SET_PHOTO: {
                return {
                    ...state,
                    profile: {...state.profile, photos: action.photos} as ProfileType
                }
            }
            default:
                return state;
    }
}

type addPostActionCreatorType = {
    type: typeof ADD_POST
    addPost: string
}
export const addPostActionCreator = (addPost: string): addPostActionCreatorType => ({
    type: ADD_POST,
    addPost
})
type setPhotoType = {
    type: typeof SET_PHOTO
    photos: PhotosType
}
export const setPhoto = (photos: PhotosType): setPhotoType => ({
    type: SET_PHOTO,
    photos
})
type setStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): setStatusType => ({
    type: SET_STATUS,
    status
})
type setUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): setUserProfileType => ({
    type: SET_USER_PROFILE,
    profile
})

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getUserId(userId);
    dispatch(setUserProfile(response.data))
}

export const getUserStatus = (userId:number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch:any) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(setPhoto(response.data.data.photos))
        }
}

export const saveProfile = (file: any) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(file);
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId));
        } else {
            let wrongNetwork = response.data.messages[0]
              .slice(
                response.data.messages[0].indexOf(">") + 1,
                response.data.messages[0].indexOf(")")
              )
              .toLocaleLowerCase();
            dispatch(
              stopSubmit("edit-profile", {
                contacts: { [wrongNetwork]: response.data.messages[0] }
              })
            );
            return Promise.reject(response.data.messages[0]);
          }
        
}

export default profileReducer;