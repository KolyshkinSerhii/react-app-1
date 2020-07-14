import React from 'react';
import userPhoto from "..//..//Images/user.png";
import { NavLink } from 'react-router-dom';
import s from './User.module.css'


const Following = ({user, followingInProgress, unfollow, follow}, ...props) => {
    return (
        <div className={s.user}>
            <div>
                {<NavLink to={'/profile/' + user.id}>
                    <div>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} alt=""></img>
                    </div>
                </NavLink>}
            </div>
            <div>{user.name}</div>
            <div>{user.status}</div>
        </div>)
    }

export default Following;