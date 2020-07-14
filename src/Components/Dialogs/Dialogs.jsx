import React from 'react';
import s from "./Dialogs.module.css";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import SendMessage from './Message/DialogsForm/SendMessageForm';



const Dialogs = (props) => {

    let state = props.messagesPage;

    let dialogsElements = state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);

    let messageElements = state.messages.map(m => <Message message={m.message} />);
    
    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_item}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <SendMessage sendNewMessage={props.sendNewMessage}/>
            </div>
        </div>
    );
}

export default Dialogs;