import { createStore, combineReducers, applyMiddleware} from "redux";
import profileReducer from "./Profile-reducer";
import messagesReducer from "./Messages-reducer";
import usersReducer from "./Users-reducer"
import authReducer from "./AuthReducer";
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from "redux-thunk";
import appReducer from "./App-reducer";


let rootReducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducersType = typeof rootReducers
export type AppStateType = ReturnType<RootReducersType>

let store = createStore(rootReducers, applyMiddleware(thunkMiddleware))


type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsType<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropertiesType<T>>  

export default store
// @ts-ignore
window.store = store