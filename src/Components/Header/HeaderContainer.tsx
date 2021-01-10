import { connect } from "react-redux";
import {logout} from '../../Redux/AuthReducer'
import Header from "./Header";
import React from 'react';
import { AppStateType } from "../../Redux/Redux-store";

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

class HeaderContainer extends React.Component<PropsType>  {
    render () {
        return <Header {...this.props} />
    }
}

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {logout}) (HeaderContainer);