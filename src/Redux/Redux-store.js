import { createStore, combineReducers, applyMiddleware} from "redux";
import profileReducer from "./Profile-reducer";
import messagesReducer from "./Messages-reducer";
import usersReducer from "./Users-reducer"
import authReducer from "./AuthReducer";
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from "redux-thunk";
import appReducer from "./App-reducer";


let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

window.store = store;