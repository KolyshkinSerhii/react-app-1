import { actions, follow, unfollow } from './Users-reducer';
import { ResponseTypes, ResultCodesEnum } from './../API/API';
import { usersAPI } from './../API/Users-API';


jest.mock("..//API/Users-API.ts")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ResponseTypes ={
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach( () => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})
usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test('follow', async () => {
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
});

test("unfollow", async () => {
    const thunk = unfollow(1);

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})