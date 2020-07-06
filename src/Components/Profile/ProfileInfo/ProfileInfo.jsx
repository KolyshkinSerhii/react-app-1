import React from 'react';
import s from "./ProfileInfo.module.css";
import Preloader from '../../common/loader';
import ProfileStatusWithHooks from './ProfileStatus-withHooks';
import userPhoto from '..//..//../Images/user.png'

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div className={s.profile}>
            <div className={s.description}>
                <div><img src={props.profile.photos.small != null ? props.profile.photos.small : userPhoto } alt=""/></div>
                <div>{props.profile.fullName} </div>
                <div>{props.profile.contacts.facebook} </div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
}


export default ProfileInfo;