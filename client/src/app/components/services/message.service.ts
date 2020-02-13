const API = 'http://localhost:2700/messages';

interface IBody {
    id?: number,
    message?: string
}

export const getMessages = (setMessageState: Function) => {
    return fetch(`${API}`)
        .then(response => response.json())
        .then(data => setMessageState(data))
        .catch(error => console.error(error));
}

export const createMessage = (body: IBody) => {
    return fetch(`${API}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
}

export const deleteMessage = (setMessages: Function) => {
    return fetch(`${API}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.status === 200) {
                console.log('Message Deleted');
                getMessages(setMessages);
            } else {
                alert('Failed to update message');
            };
        })
        .catch( error => console.error(error));
}

