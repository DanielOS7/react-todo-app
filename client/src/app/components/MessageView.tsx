import * as React from 'react';
import { getMessages, deleteMessage } from './services/message.service';


interface IMessages {
    id: number,
    message: string
}
interface IMessageProps {
    messages: IMessages[],
    recordActions: boolean,
    setRecordAction: Function,
    setMessagesState: Function
}

export const MessageView: React.FC<IMessageProps> = (props) => {
    let [recordActions, setRecordAction] = React.useState(true);



    return (
        <div>
            <ul >
                {props.messages.map(messages => {
                    return (
                        <li key={messages.id}>{messages.message}</li>
                    );
                })}
            </ul>
            <button className="btn btn-danger" onClick={() => { deleteMessage(props.setMessagesState) }}>Clear Messages</button>
            <button
                className={
                    props.recordActions
                        ? "btn btn-secondary"
                        : "btn btn-primary"
                }
                onClick={() => {
                    if (props.recordActions === true) {
                        setRecordAction(false)
                        props.setRecordAction(false)
                    } else {
                        setRecordAction(true)
                        props.setRecordAction(true)
                    }
                }}>
                {
                    props.recordActions
                        ? "Stop Recording"
                        : "Record"
                }
            </button>
        </div>
    );
};