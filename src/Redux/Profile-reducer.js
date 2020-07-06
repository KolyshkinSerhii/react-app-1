import {
    usersAPI,
    profileAPI
} from '../API/API';

const ADD_POST = 'network/profile/UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'network/profile/SET-USER-PROFILE';
const SET_STATUS = 'network/profile/SET-STATUS'


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
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
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
            default:
                return state;
    }
}

export const addPostActionCreator = (addPost) => ({
    type: ADD_POST,
    addPost
})
export const setStatus = (status) => ({
    type: SET_STATUS,
    status
})
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
})

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getUserId(userId);
    dispatch(setUserProfile(response.data))
}

export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export default profileReducer;