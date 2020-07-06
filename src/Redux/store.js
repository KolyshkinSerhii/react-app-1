import messagesReducer from "./Messages-reducer";
import profileReducer from "./Profile-reducer"


let store = {
    _state : {

        profilePage: {
            posts: [{
                    id: 1,
                    message: "Hi",
                    likeCounts: 12
                },
                {
                    id: 2,
                    message: "Hey",
                    likeCounts: 20
                }
            ],
            newPostText: ""
        },
        messagesPage: {
            dialogs: [{
                    id: 1,
                    name: "Dima"
                },
                {
                    id: 2,
                    name: "Valera"
                },
                {
                    id: 3,
                    name: "Peter"
                },
                {
                    id: 4,
                    name: "Jason"
                },
                {
                    id: 5,
                    name: "John"
                },
                {
                    id: 6,
                    name: "Mila"
                },
            ],
            messages: [{
                    id: 1,
                    message: "Hi"
                },
                {
                    id: 2,
                    message: "Hey"
                },
            ],
            newMessageBody: ""
        }
    },
    getState() {
        return this._state;    
    },
    _rerenderEntireTree() {
        console.log("");
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer;
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action);

        this._rerenderEntireTree(this._state);
            
        }

    }

export default store; 
window.store = store;