import usersReducer, { actions, InitialStateType } from "./Users-reducer";


let state: InitialStateType;

beforeEach( () => {
    state = {
        users: [
            //@ts-ignore
            {id: 0, name: "Serhii0", followed: false, photos: { small: null , large: null }, status: "string0"},
            //@ts-ignore
            {id: 1, name: "Serhii1", followed: false, photos: { small: null, large: null }, status: "string1"},
            //@ts-ignore
            {id: 2, name: "Serhii2", followed: true, photos: { small: null, large: null }, status: "string2"},
            //@ts-ignore
            {id: 3, name: "Serhii3", followed: true, photos: { small: null, large: null }, status: "string3"}
        ],
        pageSize: 10,
        totalItemsCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
        
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})