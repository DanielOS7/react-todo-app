import * as React from 'react';
import { todoRequest } from './services/todo.service';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { getMessages, createMessage } from './services/message.service';
import { Container, Row, Col } from 'react-bootstrap';

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

    /**
     * Sets redirect property in state to true which will enable renderRedirect() to redirect the page.
     */
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    /**
     * Called when component is rerendered, if redirect property in state is truthy a url path to append will be returned to the Redirect object
     */
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    };


    /**
     * Triggered when the Create Todo button is clicked in the form.
     * 
     * Calls the todoRequest function in todo.service and sends a new Date value and the Name, Description values in the form 
     * with a POST request method.
     * 
     * @param e the event that was passed to the function. 
     */
    onSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;

        const data = {
            'name': target.formName.value,
            'description': target.formDescription.value,
            'date': new Date()
        }

        console.log(JSON.stringify(data) + ' attempted to be deleted')

        todoRequest(data, 'POST')
            .then(response => {
                if (response.status === 200) {
                    console.log('Todo Created');
                    if (this.props.recordActions === true) {
                        createMessage({ message: 'Added New Todo' }, this.props.setMessagesState);
                    }
                    this.setRedirect();
                } else {
                    alert('Failed to create Todo');
                };
            })
            .catch(error => console.error(error));

    };

    render() {
        return (
            <div style={{ marginTop: "10px", marginBottom: "15px" }}>
                {this.renderRedirect()}
                <Container fluid style={{ textAlign: "center" }}>
                    <div style={{ float: "left" }}>
                        <button className="btn btn-danger" onClick={() => { this.setRedirect() }}>
                            Back
                        </button>
                    </div>
                    <h2>Create A New To-Do!</h2>
                    <Row>
                        <Col>
                            <Form onSubmit={this.onSubmit} style={{ marginLeft: "30vw", marginRight: "30vw" }}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="input" placeholder="Name" />
                                </Form.Group>

                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="input" placeholder="Description" />
                                </Form.Group>
                                <button className="btn btn-success" type="submit">
                                    Create To-DO
                                </button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    };
};

export default CreateTodo;