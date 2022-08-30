import React from "react";
import Router from '../../components/Router';
import {UsersContext} from '../../context/users-context';
import './App.css';
import { useState } from 'react';

function App() {

    const [isActualData, setIsActualData] = useState(false)

    const setActualData = () => {
        setIsActualData(true)
    }

    const setInvalidData = () => {
        setIsActualData(false)
    }

    return (
        <UsersContext.Provider value={
            {isActualData: isActualData, setActualData: setActualData, setInvalidData: setInvalidData}
        }>
            <div className="page">
                <Router />
            </div>
        </UsersContext.Provider>
    );
}

export default App;
