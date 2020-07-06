import React from 'react';
import { reduxForm } from 'redux-form';
import required, {maxLengthCreator } from '../../../Utilities/Validation/Validator';
import { Textarea, createField } from '../../common/ControlForms';

const maxLength100 = maxLengthCreator(100);

const SendMyPost = (props) => {

    let onAddNewPost = (value) => {
        props.addNewPost(value.addPost);
      }

    return (
        <div>
            <SendMessageReduxForm onSubmit={onAddNewPost}/>
        </div>
    )
}

const SendMyPostForm = ({handleSubmit}) => {
    return (
            <form onSubmit={handleSubmit}>
                {createField('New post', 'addPost', [required, maxLength100], Textarea, {}, '')}
                <div>
                    <button>Add post</button>
                </div>
            </form>
    )
}

const SendMessageReduxForm = reduxForm({ form: 'sendMyPost' }) (SendMyPostForm)

export default SendMyPost;