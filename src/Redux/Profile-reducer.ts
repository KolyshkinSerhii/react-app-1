import { AppStateType, InferActionsType } from './Redux-store';
import { profileAPI } from "../API/Profile-API";
import { usersAPI } from "../API/Users-API";
import {FormAction, stopSubmit} from 'redux-form'
import { PostType, ProfileType, PhotosType } from '../TSTypes/TSTypesFile';
import { ThunkAction } from 'redux-thunk';


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

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'network/profile/UPDATE-NEW-POST-TEXT':
            let newPost = {
                id: 3,
                message: action.addPost,
                likeCounts: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
            case 'network/profile/SET-USER-PROFILE': {
                return {
                    ...state,
                    profile: action.profile
                };
            }
            case 'network/profile/SET-STATUS': {
                return {
                    ...state,
                    status: action.status
                };
            }
            case 'network/profile/SET-PHOTO': {
                return {
                    ...state,
                    profile: {...state.profile, photos: action.photos} as ProfileType
                }
            }
            default:
                return state;
    }
}

type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    addPostActionCreator: (addPost: string) => ({
        type: 'network/profile/UPDATE-NEW-POST-TEXT',
        addPost
    } as const),
    setPhoto: (photos: PhotosType) => ({
        type: 'network/profile/SET-PHOTO',
        photos
    } as const),
    setStatus: (status: string) => ({
        type: 'network/profile/SET-STATUS',
        status
    } as const),
    setUserProfile: (profile: ProfileType) => ({
        type: 'network/profile/SET-USER-PROFILE',
        profile
    } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | FormAction>

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await usersAPI.getUserId(userId);
    dispatch(actions.setUserProfile(data))
}

export const getUserStatus = (userId:number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(actions.setPhoto(response.data.data.photos))
        }
}

export const saveProfile = (file: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(file);
        if (response.data.resultCode === 0) {
            if (userId != null) {
                dispatch(getUserProfile(userId))
                } else {
                    throw new Error("userId can't be null")
                };
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