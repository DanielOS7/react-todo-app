const API = 'http://localhost:2700/messages';

interface IBody {
    id?: number,
    message?: string
}


/**
 * Creates a HTTP GET request method to the messages API.
 * 
 * @param setMessageState a function to call to pass the response data to. 
 */
export const getMessages = (setMessageState?: (...args: any[]) => void) => {
    return fetch(`${API}`)
        .then(response => response.json())
        .then(data => setMessageState(data))
        .catch(error => console.error(error));
}

/**
 * Creates a HTTP POST request method to the messages API.
 * 
 * @param body body of data to send in the request. 
 * 
 * @param setMessages a function to call to pass the new data to.
 */
export const createMessage = (body: IBody, setMessages: (...args: any[]) => void ) => {
    return fetch(`${API}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if(response.status === 200){
            getMessages(setMessages);
        } 
    }
    )
    .catch(error => console.error(error));

}

/**
 * Creates a HTTP DELETE request method to the messages API.
 * 
 * @param setMessages a function to call to pass the new data to.
 */
export const deleteMessage = (setMessages: (...args: any[]) => void) => {
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
                alert('Failed to delete message');
            };
        })
        .catch( error => console.error(error));
}

