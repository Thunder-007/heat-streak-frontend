import axios from "axios";
import React from "react";
import {Button, Container} from 'react-bootstrap';

function LogoutUser() {
    axios.get('http://localhost:8000/auth/github/logout/',{
        params: {
            access_token: localStorage.getItem('access_token')
        }
    }).then((response) => {
        if(response.status === 200) {
            console.log(response.data);
            localStorage.removeItem('access_token');
            window.location.href = '/';
        }
    });

}

function HomePage() {
    const userEndpoint = "https://api.github.com/user";
    const authToken = localStorage.getItem('access_token');
    const [userName, setUserName] = React.useState(null);
    React.useEffect(() => {
        axios.get(userEndpoint, {
            headers: {
                Authorization: authToken
            }
        }).then((response) => {
            setUserName(response.data.login);
        }).catch((error) => {
            console.log(error);
        });
    }, [authToken]);
    return (
        <Container>
            <h1>Hi {userName}</h1>
            <Button variant="primary" onClick={LogoutUser}>Logout</Button>
        </Container>
    );
}

export default HomePage;