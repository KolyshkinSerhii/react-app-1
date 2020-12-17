import React from 'react';
import { connect } from 'react-redux';
import {getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile} from '../../Redux/Profile-reducer';
import Profile from './Profile';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../HOC/WithAuthRedirect';
import { AppStateType } from '../../Redux/Redux-store';
import { ProfileType } from '../../TSTypes/TSTypesFile';

type OwnPropsType = {
  pageTitle: string
}

type MapStatePropsType = {
  authoraizedUserId: number | null
  profile: ProfileType | null
  status: string
  isAuth: boolean
}
type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateStatus: () => void
  savePhoto: () => void
  saveProfile: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class ProfileContainer extends React.Component<PropsType & RouteComponentProps> {

  refreshProfile() {
    // @ts-ignores
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authoraizedUserId;
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId); 
  }
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    //@ts-ignores
    if (this.props.match.params.userId !== prevProps.match.params.userId) 
    {this.refreshProfile();
    }
  }

  render()  {
    return (
      <div>
        <Profile {...this.props}
        //@ts-ignores
        isOwner={!this.props.match.params.userId} 
        profile={this.props.profile}
        status={this.props.status} 
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}/>
      </div >
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({ 
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authoraizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

export default compose(
  // @ts-ignore
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect
) (ProfileContainer)