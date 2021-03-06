import { ResponseTypes } from './../API/API';
import { AppStateType, InferActionsType } from './Redux-store';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from "../API/Users-API";
import { UserType } from '../TSTypes/TSTypesFile';
import { objectInArray } from '../Utilities/Helpers/ObjectsInArray';



const initialState = {
    users: [] as Array<UserType>,
    totalItemsCount: 0,
    pageSize: 12,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //Array of users ID
    filter: {
        term: '',
        friend: null as null|boolean
    }
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'network/usersPage/FOLLOW':
            return {
                ...state,
                users: objectInArray(state.users, action.userId, 'id', {followed: true} )
            }
            case 'network/usersPage/UNFOLLOW':
                return {
                    ...state,
                    users: objectInArray(state.users, action.userId, 'id', {followed: false} )
                }
            case 'network/usersPage/SET-USERS': {
                    return { ...state, users: action.users }
                }
            case 'network/usersPage/SET-CURRENT-PAGE': {
                    return { ...state, currentPage: action.currentPage }
                }
            case 'network/usersPage/SET-TOTAL-COUNT': {
                    return { ...state, totalItemsCount: action.totalCount }
                }
            case 'IS-FETCHING': {
                    return { ...state, isFetching: action.isFetching }
                }
            case 'network/usersPage/SET-FILTER': {
                    return { ...state, filter: action.payload }
                }
            case 'TOGGLE-IS-FOLLOWING': {
                    return {
                        ...state,
                        followingInProgress: action.inProgress ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id !== action.userId)
                    }
                }
            default:
                    return state;
    }
}

type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({ type: "network/usersPage/FOLLOW", userId } as const),

    unfollowSuccess: (userId: number) => ({
        type: 'network/usersPage/UNFOLLOW',
        userId
    } as const),

    setUsers: (users: Array<UserType>) => ({
        type: 'network/usersPage/SET-USERS',
        users
    } as const),

    setTotalUsersCount: (totalCount: number) => ({
        type: 'network/usersPage/SET-TOTAL-COUNT',
        totalCount
    } as const),

    isFetchingNow: (isFetching: boolean) => ({
        type: 'IS-FETCHING',
        isFetching
    } as const),

    toggleFollowingProgress: (inProgress: boolean, userId: number) => ({
        type: 'TOGGLE-IS-FOLLOWING',
        inProgress,
        userId
    } as const),
    setCurrentPage:(currentPage: number) => ({
        type: 'network/usersPage/SET-CURRENT-PAGE',
        currentPage} as const),
    setFilter: (filter: FilterType) => ({
        type: 'network/usersPage/SET-FILTER',
        payload: filter
    } as const)
}


export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch) => {

    dispatch(actions.isFetchingNow(true));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setFilter(filter))

    let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
    dispatch(actions.isFetchingNow(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch: any,
                                    userId: number,
                                    APImethod: (userId: number) => Promise<ResponseTypes>,
                                    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await APImethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), actions.followSuccess);
}

export const unfollow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), actions.unfollowSuccess);
}

export default usersReducer;