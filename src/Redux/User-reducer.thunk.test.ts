import { follow } from './Users-reducer';
import { ResponseTypes, ResultCodesEnum } from './../API/API';
import { usersAPI } from './../API/Users-API';


jest.mock("..//API/Users-API.ts")
const usersAPIMock = usersAPI;

const result: ResponseTypes ={
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}
//@ts-ignore
usersAPIMock.follow.mockReturnValue(Promise.resolve(result));

test('toggleFollowUnfollow', async () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn();
//@ts-ignore
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
});
