import {Comment, Avatar} from 'antd';

const ExampleComment = ({nick, message, date, children}) => (
    <Comment
        author={<a>{nick} {new Date(date).toLocaleDateString()} {new Date(date).toLocaleTimeString()}</a>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
        content={
            <p>
                {message}
            </p>
        }
    >
        {children}
    </Comment>
);

export const ChatWindow = ({messages}) => {
    return (
        <div className="chat-container__messages">
            {messages.sort(x => x.date).map(x => <ExampleComment {...x}/>)}
        </div>
    );
};
