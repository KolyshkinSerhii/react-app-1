import React from 'react';
import {reduxForm} from "redux-form";
import { Input, createField, Textarea } from '../../common/ControlForms';
import s from "./ProfileInfo.module.css";



const ProfileDataForm = ({handleSubmit, error, profile}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>
            <div>
                <b>Full name</b>: {createField('Full name', 'fullName', [], Input)}
            </div>
            <div><b>Looking for a job</b>:
                {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div><b>Skills</b>: 
                {createField('Skills', 'lookingForAJobDescription',[], Textarea)}
            </div>
            <div><b>About me</b>: {createField('About me', 'aboutMe',[], Input)} </div>
            <div> <b>Contacts</b>:
                <div className={s.contacts}>
                    <b>{Object.keys(profile.contacts).map(key => {
                        return <div>{key}: {createField(key, 'contacts.' + key.toLocaleLowerCase(), [], Input)}</div>
                    })}</b>
                </div>
            </div>
            { error && <div>
                    {error}
                </div> }
        </form>
    )
}

const ProfileDataReduxForm =  reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataReduxForm;

