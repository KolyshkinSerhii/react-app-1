import React from 'react';
import userPhoto from "..//..//Images/user.png";
import { NavLink } from 'react-router-dom';
import s from './User.module.css'

const User = ({user, followingInProgress, unfollow, follow}, ...props) => {
        return (
            <div className={s.user}>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <div>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} alt=""></img>
                        </div>
                    </NavLink>
                    <div>
                        {user.followed ? 
                            <button disabled={followingInProgress.some(id => id === user.id)} onClick={ () => {unfollow(user.id)}}>Unfollow</button> 
                            
                            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={ () => {follow(user.id)}}>Follow</button>}
                    </div>
                </div>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </div>)
        }

export default User;