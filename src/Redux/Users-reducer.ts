import { AppStateType } from './Redux-store';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../API/API';
import { UserType } from '../TSTypes/TSTypesFile';
import { objectInArray } from '../Utilities/Helpers/ObjectsInArray';

const FOLLOW = 'network/usersPage/FOLLOW';
const UNFOLLOW = 'network/usersPage/UNFOLLOW';
const SET_USERS = 'network/usersPage/SET-USERS';
const SET_CURRENT_PAGE = 'network/usersPage/SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'network/usersPage/SET-TOTAL-COUNT';
const IS_FETHING = 'IS-FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE-IS-FOLLOWING';


const initialState = {
    users: [] as Array<UserType>,
    totalItemsCount: 0,
    pageSize: 12,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //Array of users ID
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

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

type ActionsTypes = followSuccessType | unfollowSuccess | setUsersType | setCurrentPageType | setTotalUsersCountType | isFetchingNowType | toggleFollowingProgressType

type followSuccessType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): followSuccessType => ({
    type: FOLLOW,
    userId
})
type unfollowSuccess = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): unfollowSuccess => ({
    type: UNFOLLOW,
    userId
})
type setUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): setUsersType => ({
    type: SET_USERS,
    users
})
type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
type setTotalUsersCountType = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): setTotalUsersCountType => ({
    type: SET_TOTAL_COUNT,
    totalCount
})
type isFetchingNowType = {
    type: typeof IS_FETHING
    isFetching: boolean
}
export const isFetchingNow = (isFetching: boolean): isFetchingNowType => ({
    type: IS_FETHING,
    isFetching
})
type toggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING
    inProgress: boolean
    userId: number
}
export const toggleFollowingProgress = (inProgress: boolean, userId: number): toggleFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING,
    inProgress,
    userId
})

export const requestUsers = (currentPage: number, pageSize: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch) => {

    dispatch(isFetchingNow(true));

    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(isFetchingNow(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch: any, userId: number, APImethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await APImethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), followSuccess);
}

export const unfollow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), unfollowSuccess);
}

export default usersReducer;