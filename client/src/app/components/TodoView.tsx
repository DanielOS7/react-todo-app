import * as React from 'react';
import { TodoList } from './TodoList';
import { getTodos, updateTodo, deleteTodo } from './services/todo.service';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { ITodos } from './models/todo-model';

interface ITodoViewProps {
    recordActions: boolean,
    setMessagesState: Function
};

interface ITodoViewState {
    todos: ITodos[],
    todoID: number,
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
            redirect: false,
            updateFormView: false
        }
    };

    componentDidMount = () => {
        getTodos(this.setTodoState);
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    setTodoState = (data: []) => {
        this.setState({
            todos: data
        }, () => { console.log(this.state.todos) })
    }

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

    getTodos = () => {
        getTodos(this.setTodoState);
    }

    deleteTodo = (todoID: number) => {
        deleteTodo({ 'id': todoID }, this.props.recordActions, this.getTodos, this.props.setMessagesState);
    
    };

    onSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;

        const data = {
            'id': this.state.todoID,
            'name': target.Name.value,
            'description': target.Description.value
        }

        updateTodo(data, this.props.recordActions, this.getTodos, this.props.setMessagesState);
    };

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <h2>Hey</h2>
                {/* Added condition to TodoList component to not display when todos property in state has its initial values 
                this was to overcome a race effect error when making todos in TodoList component. */}
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
                        <button
                            className="btn btn-primary"
                            type="submit">
                            Update
                        </button>
                        <button
                            className="btn btn-danger"
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