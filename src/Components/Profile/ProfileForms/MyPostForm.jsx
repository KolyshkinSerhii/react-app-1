import React from 'react';
import { reduxForm, reset} from 'redux-form';
import required, {maxLengthCreator } from '../../../Utilities/Validation/Validator';
import { Textarea, createField } from '../../common/ControlForms';

const maxLength100 = maxLengthCreator(100);

const SendMyPost = (props) => {

    let onAddNewPost = (value) => {
        props.addNewPost(value.addPost);
      }
    const onSubmitSuccess = (formValues, dispatch) => {
        dispatch(reset ('sendMyPost'));
    }
    return (
        <div>
            <SendMessageReduxForm onSubmit={onAddNewPost}
                                onSubmitSuccess={onSubmitSuccess} />
        </div>
    )
}

const SendMyPostForm = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                {createField('New post', 'addPost', [required, maxLength100], Textarea, {}, '')}
                <div>
                    <button>Add post</button>
                </div>
            </form>
    )
}

const SendMessageReduxForm = reduxForm({ form: 'sendMyPost' }) (SendMyPostForm)

export default SendMyPost;