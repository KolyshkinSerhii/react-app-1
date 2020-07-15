import React from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { Textarea } from '../../../common/ControlForms';
import required, { maxLengthCreator } from '../../../../Utilities/Validation/Validator';

let maxLength100 = maxLengthCreator(100)

const SendMessage = (props) => {

let addNewMessage = (value) => {
    props.sendNewMessage(value.newMessageBody);
}

const onSubmitSuccess = (formValues, dispatch) => {
    dispatch(reset ('dialogsSendMessageForm'));
}

    return (
        <div>
            <SendMessageReduxForm onSubmit={addNewMessage}
                                onSubmitSuccess={onSubmitSuccess}/>
        </div>
    )
}

const SendMessageForm = (props) => {
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

const SendMessageReduxForm = reduxForm({ form: 'dialogsSendMessageForm' }) (SendMessageForm)

export default SendMessage;