import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, FilterType, requestUsers , follow, unfollow} from '../../Redux/Users-reducer';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../Redux/Users-selectors';
import Pagination from '../common/Pagination/Pagination';
import User from './User';
import s from './Users.module.css';
import { UsersSearchForm } from './usersSearchForm';

type PropsType = {
    portionSize?: number
}

export const Users: React.FC<PropsType> = React.memo((props) => {

    

    const users = useSelector(getUsers)
    const totalItemsCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [dispatch, currentPage, filter, pageSize])

    const onPageChanged = (pageNumber: number) => {

        dispatch(actions.setCurrentPage(pageNumber))
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {

        dispatch(requestUsers(1, pageSize, filter))
    }
    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>

            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Pagination totalItemsCount={totalItemsCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
                currentPage={currentPage} />
            <div className={s.user}>
                {
                    users.map(u => <User 
                        key={u.id}
                        user={u}
                        followingInProgress={followingInProgress}
                        follow={followUser}
                        unfollow={unfollowUser}
                    />)
                }
            </div>
        </div>
    )
})
