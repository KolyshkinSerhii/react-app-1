import React from 'react';
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div>
      <div className={s.item}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsP_Ur8FvgyIock3PjlvCNl0U90rPJA7hwjt41Ge1AIgml6kY3" alt=""></img>
        {props.message}
         <div>like {props.likeCounts}</div>
      </div>
    </div>
  );
}

export default Post;