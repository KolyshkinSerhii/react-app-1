import { actions } from '../../../Redux/Profile-reducer';
import MyPosts from './MyPosts.jsx';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    addNewPost: (addPost) => {
      dispatch(actions.addPostActionCreator(addPost));
    }
  }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts);
export default MyPostsContainer;