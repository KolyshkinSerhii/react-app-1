import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/Nav.jsx';
import { Redirect, Route, withRouter } from 'react-router-dom';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
// import DialogsContainer from './Components/Dialogs/DialogsContainer';
// import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import { connect } from 'react-redux';
import {initializeApp} from './Redux/App-reducer'
import { compose } from 'redux';
import Preloader from './Components/common/loader';
import Friends from './Components/Friends/Friends';
import { AppStateType } from './Redux/Redux-store';
import { withSuspense } from './HOC/WithSuspense';
import { UsersPage } from './Components/Users/UsersContainer';
import { Login } from './Components/Login/Login';

const DialogsContainer = React.lazy( () => import ('./Components/Dialogs/DialogsContainer'))
const ProfileContainer =React.lazy( () => import ('./Components/Profile/ProfileContainer'))

type MapStateProps = ReturnType<typeof mapStateToProps>
type MapDispatchProps = {
  initializeApp: () => void
}


class App extends React.Component<MapStateProps & MapDispatchProps> {

  componentDidMount() {
    this.props.initializeApp();
}

  render() {

    if(!this.props.initialize) {
      return <Preloader />
    }

    return (      
        <div className="app-wrapper">
          <HeaderContainer />
          <Navigation />
            <div className="app-wrapper-content">
              <Route path="/" render={() => <Redirect to={'/profile'} />} />
              <Route path="/dialogs" render={ withSuspense(DialogsContainer)}/>
              <Route path="/profile/:userId?" render={ withSuspense(ProfileContainer)}/>
              <Route path="/friends" render={ () => <Friends />}/>
              <Route path="/users" render={ () => <UsersPage />}/>
              <Route path="/news" render={ () => <News />}/>
              <Route path="/music" render={ () => <Music />}/>
              <Route path="/settings" render={ () => <Settings />}/>
              <Route path="/login" render={ () => <Login />}/>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialize: state.app.initialized
})

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp})
) (App)