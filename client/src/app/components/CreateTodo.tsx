import * as React from 'react';
import { createTodo } from './services/todo.service';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { createMessage } from './services/message.service';

interface ICreateTodoProps {
    recordActions: boolean,
    setMessagesState: Function
};

interface ICreateTodoState {
    redirect: boolean
};

class CreateTodo extends React.Component<ICreateTodoProps, ICreateTodoState> {
    constructor(props: ICreateTodoProps) {
        super(props);

        this.state = {
            redirect: false
        }
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    };

    onSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;

        const data = {
            'name': target.formName.value,
            'description': target.formDescription.value,
            'date': new Date()
        }

        console.log(JSON.stringify(data) + ' attempted to be deleted')

        createTodo(data, this.props.recordActions, this.setRedirect, this.props.setMessagesState);
            
    };

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <button className="btn btn-danger" onClick={() => { this.setRedirect() }}>
                    Back
                </button>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="input" placeholder="Name" />
                    </Form.Group>

                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="input" placeholder="Description" />
                    </Form.Group>
                    <button className="btn btn-success" type="submit">
                        Create TODO
                </button>
                </Form>
            </div>
        )
    };
};

export default CreateTodo;