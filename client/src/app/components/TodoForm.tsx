import * as React from 'react';
import Form from 'react-bootstrap/Form';

type TodoFormProps = {
    todoID: number,
    updateTodo: Function,

}

export const TodoForm: React.FC<TodoFormProps> = (props) => {

    
    return (
        <div>
            <Form onSubmit={() => { props.updateTodo() }}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="input" placeholder="Name" />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="input" placeholder="Description" />
                </Form.Group>
                <button className="btn btn-primary" type="submit">
                    Update
                </button>
            </Form>
        </div>
    );
};