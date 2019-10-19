// This is the page that will call the API calls for the authentication
const remoteURL = 'http://localhost:8088';

export default {
    createUser(user) {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then (Response => Response.json())
    },
    getUserData() {
        return fetch(`${remoteURL}/users`)
            .then(data => data.json())
    }
}