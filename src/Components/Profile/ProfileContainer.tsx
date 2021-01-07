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
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
  userId: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authoraizedUserId;
    }
    this.props.getUserProfile(userId as number);
    this.props.getUserStatus(userId as number); 
  }
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) 
    {this.refreshProfile();
    }
  }

  render()  {
    return (
      <div>
        <Profile {...this.props}
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


export default compose<React.ComponentType>(
  connect(mapStateToProps, {getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect
) (ProfileContainer)