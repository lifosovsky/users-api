import React, {useEffect, useState} from "react";
import Router from '../../components/Router';
import {UsersContext} from '../../context/users-context';
import './App.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {User} from "../../types/user";
import {ServerEndPoints, ServerUrl} from "../../consts/server";
import {HashRouter} from "react-router-dom";

function App() {

    const [isActualData, setIsActualData] = useState(false)
    const [users, setUsers] = useState<User[]>([])

    const setActualData = () => {
        setIsActualData(true)
    }

    const setInvalidData = () => {
        setIsActualData(false)
    }

    const router = Router()

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(ServerUrl + ServerEndPoints.getAllUsers);
                const users = await response.json();
                if (users == null) {
                    setUsers([])
                    setActualData();
                    return
                }
                setUsers(users);
                setActualData();
            } catch (e) {
                console.log(e);
            }
        })()
    }, [isActualData])

    return (
            <UsersContext.Provider value={
                {isActualData: isActualData, setActualData: setActualData, setInvalidData: setInvalidData, users: users}
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
    );
}

export default App;
