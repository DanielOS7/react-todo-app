import * as React from 'react';
import { TodoService } from './services/todo.service';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { MessageService } from './services/message.service';

class CreateTodo extends React.Component<any, any> {
    todoService = new TodoService();
    messageService = new MessageService();
    constructor(props: any ){
        super(props);

        this.state = {
            redirect: false,
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;

        const data = {
            'name': target.formName.value,
            'description': target.formDescription.value
        }

        console.log(JSON.stringify(data) + ' attempted to be deleted')

        this.todoService.createTodo(data)
        .then(response => {
            if (response.status === 200) {
                console.log('Todo Created');
                this.messageService.createMessage({message: 'Added New Todo'})
                this.setRedirect();
            } else {
                alert('Failed to create Todo');
            };
        })
        .catch(error => console.error(error));
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <button className="btn btn-danger" onClick={() => {this.setRedirect()}}>
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
    }
}

export default CreateTodo;