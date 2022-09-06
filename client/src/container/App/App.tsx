import React, {useEffect, useState} from "react";
import Router from '../../components/Router';
import {UsersContext} from '../../context/users-context';
import './App.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {User} from "../../types/user";
import {ServerEndPoints, ServerUrl} from "../../consts/server";

let socket: WebSocket;

function App() {

    const [users, setUsers] = useState<User[]>([])
    const [isWebSocketConnected, setWebSocketConnection] = useState(true)

    const router = Router()

    const updateData = () => {
        socket.send('update')
    }

    useEffect(() => {
        socket = new WebSocket(`ws://${document.domain}${':8000'}/socket`)
        socket.onopen = () => setWebSocketConnection(true);
        socket.onclose = () => setWebSocketConnection(false);
        socket.onmessage = (e) => {
            setUsers(JSON.parse(e.data))
        }

        (async () => {
            try {
                const response = await fetch(ServerUrl + ServerEndPoints.getAllUsers);
                const users = await response.json();
                if (users == null) {
                    setUsers([])
                    return
                }
                setUsers(users);
            } catch (e) {
                console.log(e);
            }
        })()
    }, [])


    if (!isWebSocketConnected) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            <UsersContext.Provider value={
                {
                    updateData: updateData,
                    users: users,
                }
            }>
                <div className="page">
                    {router}
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </UsersContext.Provider>
        </>
    );
}

export default App;
