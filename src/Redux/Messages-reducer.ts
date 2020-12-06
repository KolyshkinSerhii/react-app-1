const SEND_MESSAGE = 'network/messages/SEND-MESSAGE';

export type InitialStateType = typeof initialState

type DialogsType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

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
    ] as Array<DialogsType> ,
    messages: [{
        id: 1,
        message: "Hi"
    },
    {
        id: 2,
        message: "Hey"
    }
    ] as Array<MessageType>
}

const messagesReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, { id: 3, message: body }]
            }
        default:
            return state;
    }
}

type sendMessageCreatorType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorType => ({ type: SEND_MESSAGE, newMessageBody });

export default messagesReducer;