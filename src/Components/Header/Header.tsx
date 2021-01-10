import React from 'react';
import s from "./Header.module.css";
import { NavLink } from 'react-router-dom';

type PropsType = {
  isAuth: boolean
  login:  string | null
  logout: () => void
}

const Header:React.FC <PropsType> = (props) => {
  return (
    <header className={s.header}>
      <div className={s.rightSide}>
        <div>
          <img className={s.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQEu5LZKIe4h-OR00uA6wj-qaES5TGp4g0kQnjkdujgJxZM7HjD" alt=""></img>
        </div>
        <div className={s.logo}>RIDERS CLUB</div>
      </div>
      <div className={s.loginBlock}>
        {props.isAuth ? 
        <div>{props.login} | <button onClick={props.logout} >Logout</button> </div>
          : <NavLink to={'/login/'}>login</NavLink>}
      </div>
    </header>
  );
}

export default Header;