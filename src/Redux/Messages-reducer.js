const SEND_MESSAGE = 'network/messages/SEND-MESSAGE';

let initialState = {
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
    }
    ],
    messages: [{
        id: 1,
        message: "Hi"
    },
    {
        id: 2,
        message: "Hey"
    }
    ]
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: 
            let body = action.newMessageBody
                return {
                ...state,
                messages: [...state.messages, {id:3, message: body}]
        }
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default messagesReducer;