import * as React from 'react';
import { MessageService } from './services/message.service';

// interface IMessages {
//     id: number,
//     message: string
// }

interface IMessageProps {
    setRecordAction: Function
}

export const MessageView: React.FC<IMessageProps> = (props) => {
    let messageService = new MessageService();
    let [messages, setMessages] = React.useState([]);
    let [recordActions, setRecordAction] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:2700/messages`);
            const responseData = await response.json();
            setMessages(responseData);
        }
        fetchData();
    }, [messages]);


    return (

        <div>
            <ul >
                {messages.map(messages => {
                    return (
                        <li key={messages.id}>{messages.message}</li>
                    );
                })}
            </ul>
            <button className="btn btn-danger" onClick={() => { messageService.deleteMessage() }}>Clear Messages</button>
            <button
                className={
                    recordActions
                        ? "btn btn-secondary"
                        : "btn btn-primary"
                }
                onClick={() => {
                    if (recordActions === true) {
                        setRecordAction(false)
                        props.setRecordAction(false)
                    } else {
                        setRecordAction(true)
                        props.setRecordAction(true)
                    }
                }}>
                {
                    recordActions
                        ? "Stop Recording"
                        : "Record"
                }
            </button>
        </div>
    );
};