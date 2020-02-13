import * as React from 'react';
import { TodoList } from './TodoList';
import { TodoService } from './services/todo.service';
import { MessageView } from './MessageView';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';

interface ITodos {
    id: number,
    name: string,
    description: string,
    date: string
};

interface ITodoViewState {
    todos: ITodos[],
    todoID: number,
    redirect: boolean,
    updateFormView: boolean
};

interface ITodoViewProps {
    recordActions: boolean
};

class TodoView extends React.Component<ITodoViewProps, ITodoViewState> {
    todoService = new TodoService();
    constructor(props: any) {
        super(props);

        this.state = {
            todos: [{
                id: 0,
                name: '',
                description: '',
                date: ''
            }],
            todoID: 0,
            redirect: false,
            updateFormView: false
        }
    };

    componentDidMount = () => {

        this.todoService.getTodos().then(data => this.setState({
            todos: data
        }, () => { console.log(this.state.todos) })).catch(error => console.error(error));
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/create-todo' />
        }
    };

    showForm = (showForm: boolean): void => {
        this.setState({
            updateFormView: showForm
        })
    };

    setTodoID = (todoID: number): void => {
        this.setState({
            todoID: todoID
        }, () => { console.log(`Todo with ID: ${this.state.todoID} has been set to be used for form.`); })

    };

    deleteTodo = (todoID: number) => {
        this.todoService.deleteTodo({ 'id': todoID }, this.props.recordActions)
    };

    onSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;

        const data = {
            'id': this.state.todoID,
            'name': target.Name.value,
            'description': target.Description.value
        }

        console.log(JSON.stringify(data) + ' attempted to be updated')

        this.todoService.updateTodo(data, this.props.recordActions);
    };

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <h2>Hey</h2>
                {/* Added condition to TodoList component to not display when todos property in state has its initial values */}
                <div>
                    {this.state.todos[0].id === 0
                        ? null
                        : <TodoList
                            todos={this.state.todos}
                            showForm={this.showForm}
                            setTodoID={this.setTodoID}
                            deleteTodo={this.deleteTodo} />
                    }
                </div>
                <button className="btn btn-success" onClick={this.setRedirect}>Add Todo</button>
                {this.state.updateFormView
                    ? <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="input" placeholder="Name" />
                        </Form.Group>
                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="input" placeholder="Description" />
                        </Form.Group>
                        <button className="btn btn-primary" type="submit">Update</button>
                        <button
                            className="btn btn-danger"
                            type="submit"
                            onClick={() => { this.showForm(false) }}>
                            Cancel
                        </button>

                    </Form>
                    : null
                }
            </div>
        )
    }
};

export default TodoView;