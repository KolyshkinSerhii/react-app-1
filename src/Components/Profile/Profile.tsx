import React from 'react';
import s from "./Profile.module.css";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../TSTypes/TSTypesFile';

type PropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: () => void
  isOwner: () => void
  savePhoto: () => void
  saveProfile: () => void
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile} />
      <MyPostsContainer />
    </div>
  );
}

export default Profile;