import React from 'react';
import s from "./Message.module.css";

const Message = (props) => {
    return (
        <div className={s.messages}>
            <div className={s.message}>{props.message}</div>
        </div>
    );
}

export default Message;