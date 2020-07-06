import React from 'react';
import s from "./MyPosts.module.css";
import Post from './Post/Post.jsx';
import SendMyPost from '../ProfileForms/MyPostForm';

const MyPosts = React.memo(props => {
  
  let postElements = props.posts.map(elem => <Post message={elem.message} likeCounts={elem.likeCounts} />);

  return (
    <div>
      <div className={s.my_posts}>
        MyPosts
        <SendMyPost addNewPost={props.addNewPost} />
      </div>
      <div className={s.post}>
        {postElements}
      </div>
    </div>
  );
})

export default MyPosts;