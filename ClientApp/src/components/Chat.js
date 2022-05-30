import {useState} from 'react';
import {Input, Button} from 'antd';
import {SendOutlined, LogoutOutlined} from '@ant-design/icons';
import {ChatWindow} from './ChatWindow';

import "./Chat.scss"

const {TextArea} = Input;


export const Chat = (props) => {
    const [isAuth, setAuth] = useState(false);
    const [nick, setNick] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([{
        nick: "Nick",
        message: "Test",
        date: Date.now()
    }])

    const onSend = () => {
        setMessages(prevState => ([...prevState, {nick, message, date: Date.now()}]))
        setMessage("")
    }

    return (
        <>
            {
                isAuth ?
                    <div className="chat-container">
                        <ChatWindow messages={messages}/>
                        <div className="chat-container__input">
                            <TextArea showCount maxLength={100} style={{height: 120}} value={message}
                                      onChange={e => setMessage(e.target.value)}/>
                            <div className="chat-container__actions">
                                <Button onClick={onSend} icon={<SendOutlined/>} type="primary"/>
                                <Button onClick={() => setAuth(false)} icon={<LogoutOutlined/>} type="primary"/>
                            </div>
                        </div>
                    </div>
                    : <div>
                        <Input placeholde="Nick" value={nick} onChange={e => setNick(e.target.value)}/>
                        <Button disabled={!nick || nick.length === 0} onClick={() => setAuth(true)}>Zaloguj</Button>
                    </div>
            }
        </>
    )
};
