import * as React from 'react';
import  { MessageService }  from './services/message.service'

// interface IMessages {
//     id: number,
//     message: string
// }

type MessageProps = {
    // messages: IMessages[],
    // clearMessages: Function
}

export const MessageView: React.FC<any> = (props) => {
    let messageService = new MessageService();
    let [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:2700/messages`);
            const responseData = await response.json();
            setMessages(responseData);
        }
        fetchData();
    }, []);
    
    return (
        <div>
            <ul>
                {messages.map( messages => {
                    return (
                    <li key={messages.id}>{messages.message}</li>
                    );
                })}
            </ul>
            <button onClick={() => {messageService.deleteMessage()}}>Delete</button>
            <button onClick={() => {console.log(messages)}}>Log</button>
        </div>
    );
};