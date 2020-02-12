const API = 'http://localhost:2700/messages';

interface IBody {
    id?: number,
    message?: string
}

export class MessageService {

    createMessage(body: IBody) {
        return fetch(`${API}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
    }

    deleteMessage() {
        return fetch(`${API}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Message Deleted');
                    window.location.reload();
                } else {
                    alert('Failed to update message');
                };
            })
            .catch( error => console.error(error));
    }

}