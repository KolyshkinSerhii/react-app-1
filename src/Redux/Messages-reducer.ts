import { InferActionsType } from './Redux-store';

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
    ] as Array<DialogsType>,
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

const messagesReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'network/messages/SEND-MESSAGE':
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, { id: 3, message: body }]
            }
        default:
            return state;
    }
}

type ActionTypes = InferActionsType<typeof actions>
export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({ type: 'network/messages/SEND-MESSAGE', newMessageBody } as const)
}

export default messagesReducer;