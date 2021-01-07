import { InferActionsType, AppStateType } from './Redux-store';
import { getAuthUserData } from "./AuthReducer";
import { ThunkAction } from 'redux-thunk';


let initialState: InitialStateType = {
    initialized: false
};

export type InitialStateType = {
    initialized: boolean
}

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'network/App/INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

type ActionTypes = InferActionsType<typeof actions>

export const actions = {
    initializedSuccess: () => ({type: 'network/App/INITIALIZED-SUCCESS'} as const)
}

export const initializeApp = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
    .then( ()=> {
        dispatch(actions.initializedSuccess());
    })
}

export default appReducer;