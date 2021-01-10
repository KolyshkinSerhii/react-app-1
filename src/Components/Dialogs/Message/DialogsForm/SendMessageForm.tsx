import React from 'react';
import { reduxForm, Field, reset, InjectedFormProps } from 'redux-form';
import { Textarea } from '../../../common/ControlForms';
import required, { maxLengthCreator } from '../../../../Utilities/Validation/Validator';

let maxLength100 = maxLengthCreator(100)

type PropsType = {
    sendNewMessage: (messageText: string) => void
    newMessageBody: string
}

const SendMessage: React.FC<PropsType> = (props) => {

let addNewMessage = (value: {newMessageBody: string} ) => {
    props.sendNewMessage(value.newMessageBody);
}

const onSubmitSuccess = (formValues: any, dispatch: any) => {
    dispatch(reset ('dialogsSendMessageForm'));
}

    return (
        <div>
            <SendMessageReduxForm onSubmit={addNewMessage}
                                onSubmitSuccess={onSubmitSuccess}/>
        </div>
    )
}


const SendMessageForm: React.FC<InjectedFormProps<PropsType>> = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={"Enter your message"} name={'newMessageBody'} component={Textarea} validate={[required, maxLength100]}></Field>
                </div>
                <div>
                    <button>Send message</button>
                </div>
            </form>
    )
}

const SendMessageReduxForm = reduxForm<PropsType>({ form: 'dialogsSendMessageForm' }) (SendMessageForm)

export default SendMessage;