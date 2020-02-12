import * as React from 'react';
import { TodoList } from './TodoList';
import { TodoService } from './services/todo.service';
import { TodoForm } from './TodoForm';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';

interface ITodos {
    id: number,
    name: string,
    description: string,
    date: string
}

type TodoViewState = {
    todos: ITodos[],
    todoID: number,
    redirect: boolean
};

class TodoView extends React.Component<any, TodoViewState> {

    constructor(props: any, private todoService: TodoService) {
        super(props);

        this.todoService = new TodoService();

        this.state = {
            todos: [{
                id: 0,
                name: '',
                description: '',
                date: ''
            }],
            todoID: 0,
            redirect: false
        }
    }

    componentDidMount = () => {

        this.todoService.getTodos().then(data => this.setState({
            todos: data
        }, () => { console.log(this.state.todos) }));
    };

    setTodoID = (todoID: number): void => {
        this.setState({
            todoID: todoID
        })
        console.log(todoID);
    }


    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/create-todo' />
        }
    }


    onSubmit = (e: any) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;

        const data = {
            'id': this.state.todoID,
            'name': target.formName.value,
            'description': target.formDescription.value
        }

        console.log(JSON.stringify(data) + ' attempted to be updated')

        this.todoService.updateTodo(data);
    }


    deleteTodo = (todoID: number) => {
        this.todoService.deleteTodo({ 'id': todoID })
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <h2>Hey</h2>
                {/* Added condition to TodoList component to not display when todos property in state has its initial values */}
                {this.state.todos[0].id === 0
                    ? null
                    : <TodoList todos={this.state.todos} setTodoID={this.setTodoID} deleteTodo={this.deleteTodo} />
                }
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="input" placeholder="Name" />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="input" placeholder="Description" />
                    </Form.Group>
                    <button className="btn btn-primary" type="submit"> Update </button>
                    <button className="btn btn-success" onClick={this.setRedirect}>Add Todo</button>
                </Form>
            </div>
        )
    }
}

export default TodoView;