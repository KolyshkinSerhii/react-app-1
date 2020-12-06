import { getAuthUserData } from "./AuthReducer";

const INITIALIZED_SUCCESS = 'network/App/INITIALIZED-SUCCESS';


let initialState: InitialStateType = {
    initialized: false
};

export type InitialStateType = {
    initialized: boolean
}

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = ():InitializedSuccessActionType  => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
    .then( ()=> {
        dispatch(initializedSuccess());
    })
}

export default appReducer;