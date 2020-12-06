import React from 'react';
import { UserType } from '../../TSTypes/TSTypesFile';
import Pagination from '../common/Pagination/Pagination';
import User from './User';
import s from './Users.module.css'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    portionSize?: number
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({ users, totalItemsCount, pageSize, onPageChanged, currentPage, ...props }) => {
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