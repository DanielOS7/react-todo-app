import * as React from 'react';
import { getMessages, deleteMessage } from './services/message.service';
import { Container, Row, Col } from 'react-bootstrap';


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
    return (
        <div>
            <Container fluid style={{ textAlign: "center" }}>
                <h2>Messages</h2>
                <Row>
                    <Col>
                        <ul style={{ listStyle: "none" }} >
                            {props.messages.map(messages => {
                                return (
                                    <li key={messages.id}>{messages.message}</li>
                                );
                            })}
                        </ul>
                        <button
                            className={
                                props.recordActions
                                    ? "btn btn-secondary"
                                    : "btn btn-primary"
                            }
                            style={{ marginRight: "5px" }}
                            onClick={() => {
                                if (props.recordActions === true) {
                                    props.setRecordAction(false)
                                } else {
                                    props.setRecordAction(true)
                                }
                            }}>
                            {
                                props.recordActions
                                    ? "Stop Recording"
                                    : "Record"
                            }
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => { deleteMessage(props.setMessagesState) }}>Clear Messages</button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};