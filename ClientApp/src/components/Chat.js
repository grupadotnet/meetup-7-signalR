import {useState, useRef, useEffect} from 'react';
import {Input, Button} from 'antd';
import {SendOutlined, LogoutOutlined} from '@ant-design/icons';
import {ChatWindow} from './ChatWindow';
import {HubConnectionBuilder} from '@microsoft/signalr';

import "./Chat.scss"

const {TextArea} = Input;


export const Chat = () => {
    const [connection, setConnection] = useState(null);
    const [isAuth, setAuth] = useState(false);
    const [nick, setNick] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7057/hubs/chat')
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected!');

                    connection.on('ReceiveMessage', ({user, message, date}) => {
                        console.log(user)
                        setMessages(prevState => ([...prevState, {nick: user, message, date: new Date(date)}]))
                        setMessage("")
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const onSend = async () => {
        const chatMessage = {
            user: nick,
            message: message
        };

        console.log(connection._connectionState)
        if (connection._connectionState == "Connected") {
            try {
                setMessage("")
                await connection.send('SendMessage', chatMessage);
            } catch (e) {
                console.log(e);
            }
        } else {
            alert('No connection to server yet.');
        }
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
