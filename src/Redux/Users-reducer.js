import { usersAPI } from '../API/API';
import { objectInArray } from '../Utilities/Helpers/ObjectsInArray';

const FOLLOW = 'network/usersPage/FOLLOW';
const UNFOLLOW = 'network/usersPage/UNFOLLOW';
const SET_USERS = 'network/usersPage/SET-USERS';
const SET_CURRENT_PAGE = 'network/usersPage/SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'network/usersPage/SET-TOTAL-COUNT';
const IS_FETHING = 'IS-FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE-IS-FOLLOWING';

const initialState = {
    users: [],
    totalItemsCount: 0,
    pageSize: 12,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: objectInArray(state.users, action.userId, 'id', {followed: true} )
            }
            case UNFOLLOW:
                return {
                    ...state,
                    users: objectInArray(state.users, action.userId, 'id', {followed: false} )
                }
            case SET_USERS: {
                    return { ...state, users: action.users }
                }
            case SET_CURRENT_PAGE: {
                    return { ...state, currentPage: action.currentPage }
                }
            case SET_TOTAL_COUNT: {
                    return { ...state, totalItemsCount: action.totalCount }
                }
            case IS_FETHING: {
                    return { ...state, isFetching: action.isFetching }
                }
            case TOGGLE_IS_FOLLOWING: {
                    return {
                        ...state,
                        followingInProgress: action.inProgress ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id !== action.userId)
                    }
                }
            default:
                    return state;
    }
}

export const followSuccess = (userId) => ({
    type: FOLLOW,
    userId
})
export const unfollowSuccess = (userId) => ({
    type: UNFOLLOW,
    userId
})
export const setUsers = (users) => ({
    type: SET_USERS,
    users
})
export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
export const setTotalUsersCount = (totalCount) => ({
    type: SET_TOTAL_COUNT,
    totalCount
})
export const isFetchingNow = (isFetching) => ({
    type: IS_FETHING,
    isFetching
})
export const toggleFollowingProgress = (inProgress, userId) => ({
    type: TOGGLE_IS_FOLLOWING,
    inProgress,
    userId
})

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {

    dispatch(isFetchingNow(true));

    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(isFetchingNow(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch, userId, APImethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await APImethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), followSuccess);
}

export const unfollow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), unfollowSuccess);
}

export default usersReducer;