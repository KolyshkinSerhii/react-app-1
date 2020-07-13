import React from 'react';
import { connect } from 'react-redux';
import {getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile} from './../../Redux/Profile-reducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../HOC/WithAuthRedirect';

class ProfileContainer extends React.Component {

  refreshProfile() {
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId != prevProps.match.params.userId) 
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

let mapStateToProps = (state) => ({ 
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authoraizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

export default compose(

  connect (mapStateToProps, {getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect
) (ProfileContainer)