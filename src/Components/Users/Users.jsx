import React from 'react';
import Pagination from '../common/Pagination/Pagination';
import User from './User';
import s from './Users.module.css'


const Users = ({ users, totalItemsCount, pageSize, onPageChanged, currentPage, ...props }) => {
    return (
        <div>
                <Pagination totalItemsCount={totalItemsCount}
                    pageSize={pageSize}
                    onPageChanged={onPageChanged}
                    currentPage={currentPage} />
            <div className={s.user}>
                {
                    users.map(u => <User key={u.id}
                            user={u}
                            followingInProgress={props.followingInProgress}
                            follow={props.follow}
                            unfollow={props.unfollow}
                            />)
                }
            </div>
            
        </div>
    )
}

export default Users;