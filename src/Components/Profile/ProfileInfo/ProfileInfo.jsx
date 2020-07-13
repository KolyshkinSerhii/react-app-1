import React, { useState } from 'react';
import s from "./ProfileInfo.module.css";
import Preloader from '../../common/loader';
import ProfileStatusWithHooks from './ProfileStatus-withHooks';
import userPhoto from '..//..//../Images/user.png'
import ProfileDataReduxForm from './ProfileDataForm';

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader />
    }

    const onAvatarSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
        
    }

    return (
        <div className={s.profile}>
            <div className={s.description}>
                <div><img src={props.profile.photos.large || userPhoto} alt="" /></div>
                {props.isOwner && <input type={"file"} onChange={onAvatarSelected} />}

                {editMode 
                ? <ProfileDataReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                : <ProfileData toEditMode={() => {setEditMode(true)}} profile={props.profile} isOwner={props.isOwner}/>}
                <div>
                    <b>Status</b>: <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner}/>
                </div>
            </div>
        </div>
    );
}

const Contacts = ({ contactTitle, contactValue }) => {
    return <div><b>{contactTitle}</b> : {contactValue}</div>
}
const ProfileData = (props, toEditMode) => {
    return (
        <div>
            <div>
                {props.isOwner && <button onClick={props.toEditMode}>Edit profile</button>}
            </div>
            <div><b>Full name</b>: {props.profile.fullName} </div>
            <div><b>Looking for a job</b>: {props.profile.lookingForAJob ? 'Yes' : 'No'} </div>
            {props.profile.lookingForAJob &&
                <div><b>Skills</b>: {props.profile.lookingForAJobDescription} </div>
            }
            <div><b>About me</b>: {props.profile.aboutMe} </div>
            <div> <b>Contacts</b>:
                <div className={s.contacts}>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;