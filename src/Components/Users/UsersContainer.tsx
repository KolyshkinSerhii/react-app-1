import React from "react";
import { useSelector } from "react-redux";
import { getIsFetching } from "../../Redux/Users-selectors";
import Preloader from '../common/loader';
import { Users } from "./Users";


export const UsersPage: React.FC = (props) => {

    const isFetching = useSelector(getIsFetching) 

    return <>
            {isFetching ? <Preloader /> : null}
                <Users />
            </>
}