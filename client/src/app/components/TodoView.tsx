import * as React from 'react';
import { TodoList } from './TodoList';
import { getTodos, todoRequest } from './services/todo.service';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { ITodos } from './models/todo-model';
import { Container, Row, Col } from 'react-bootstrap';
import { getMessages, createMessage } from './services/message.service';

interface ITodoViewProps {
    recordActions: boolean,
    setMessagesState: Function
};

interface ITodoViewState {
    todos: ITodos[],
    todoID: number,
    todoName: string,
    redirect: boolean,
    updateFormView: boolean
};

class TodoView extends React.Component<ITodoViewProps, ITodoViewState> {
    constructor(props: ITodoViewProps) {
        super(props);

        this.state = {
            todos: [{
                id: 0,
                name: '',
                description: '',
                date: ''
            }],
            todoID: 0,
            todoName: '',
            redirect: false,
            updateFormView: false
        }
    };


    componentDidMount = (): void => {
        getTodos(this.setTodoState);
    };

    /**
     * Sets redirect property in state to true which will enable renderRedirect() to redirect the page.
     */
    setRedirect = (): void => {
        this.setState({
            redirect: true
        })
    };

    /**
     * Sets todos property in state to array values received.
     * 
     * @param data array data of retrieved todos.
     */
    setTodoState = (data: []): void => {
        this.setState({
            todos: data
        }, () => { console.log(this.state.todos) })
    }

    /**
     * Called when component is rerendered, if redirect property in state is truthy a url path to append will be returned to the Redirect object
     */
    renderRedirect = (): JSX.Element => {
        if (this.state.redirect) {
            return <Redirect to='/create-todo' />
        }
    };

    /**
     * Sets updateFormView property in state to boolean value passed in.
     *
     * @param showForm Value to set updateFormView property which determines if the update fomr is displayed. 
     */
    showForm = (showForm: boolean): void => {
        this.setState({
            updateFormView: showForm
        })
    };

    /**
     * Sets todoID and todoName properties in state to values passed.
     *
     * @param todoID The id of the todo clicked in the list.
     * 
     * @param todoName The name of the todo clicked in the list.  
     */
    setTodoDetails = (todoID: number, todoName: string): void => {
        this.setState({
            todoID: todoID,
            todoName: todoName
        }, () => { console.log(`Todo with ID: ${this.state.todoID} has been set to be used for form.`); })

    };

    /**
     * Calls the getTodos function in todo.service
     */
    getTodos = (): void => {
        getTodos(this.setTodoState);
    }


    /**
     * Called when the Delete button is clicked on in the todo list.
     * 
     * Calls the todoRequest function in todo.service and sends the id of the todo along with a DELETE method request.
     * 
     * @param todoID The todo id that is to be deleted. 
     */
    deleteTodo = (todoID: number): void => {
        todoRequest({ 'id': todoID }, 'DELETE')
            .then(response => {
                if (response.status === 200) {
                    console.log('Todo Deleted');
                    this.getTodos();
                    if (this.props.recordActions === true) {
                        createMessage({ message: 'Deleted Todo' }, this.props.setMessagesState);
                    }
                } else {
                    alert('Failed to update todo');
                };
            })
            .catch(error => console.error(error));

    };

    /**
     * Triggered when the Update button is clicked in the form.
     * 
     * Calls the todoRequest function in todo.service and sends the todoID stored in state and Name and Description values in the form 
     * with a PUT request method.
     * 
     * @param e the event that was passed to the function. 
     */
    onSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;

        const data = {
            'id': this.state.todoID,
            'name': target.Name.value,
            'description': target.Description.value
        }

        todoRequest(data, 'PUT')
            .then(response => {
                if (response.status === 200) {
                    console.log('Todo Updated');
                    this.getTodos();
                    if (this.props.recordActions === true) {
                        createMessage({ message: 'Updated Todo' }, this.props.setMessagesState);
                    }
                } else {
                    alert('Failed to update todo');
                };
            })
            .catch(error => console.error(error));

        target.Name.value = "";
        target.Description.value = "";
    };

    render() {
        return (
            <div style={{ marginTop: "10px", marginBottom: "15px" }}>
                {this.renderRedirect()}
                <Container fluid style={{ textAlign: "center" }}>
                    <h2>To-do List Challenge!</h2>
                    <Row>
                        <Col>
                            <div>
                                {/* Added condition to TodoList component to not display when todos property in state has its initial values 
                            this was to overcome a race effect error mapping todos in TodoList component. */}
                                <TodoList
                                    todos={this.state.todos}
                                    showForm={this.showForm}
                                    setTodoDetails={this.setTodoDetails}
                                    deleteTodo={this.deleteTodo} />
                            </div>
                            <button className="btn btn-success" style={{ marginBottom: "5px" }} onClick={this.setRedirect}>Add Todo</button>
                            {this.state.updateFormView
                                ? <div>
                                    <h5 style={{ color: "green", marginBottom: "5px" }}>Edit {this.state.todoName}</h5>
                                    <Form onSubmit={this.onSubmit} style={{ marginLeft: "30vw", marginRight: "30vw" }}>
                                        <Form.Group controlId="Name">
                                            <Form.Label>New Name</Form.Label>
                                            <Form.Control type="input" placeholder="Name" />
                                        </Form.Group>
                                        <Form.Group controlId="Description">
                                            <Form.Label>New Description</Form.Label>
                                            <Form.Control type="input" placeholder="Description" />
                                        </Form.Group>
                                        <button
                                            className="btn btn-primary"
                                            style={{ marginRight: "5px" }}
                                            type="submit">
                                            Update
                                    </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => { this.showForm(false) }}>
                                            Close
                                    </button>

                                    </Form>
                                </div>
                                : null
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
};

export default TodoView;