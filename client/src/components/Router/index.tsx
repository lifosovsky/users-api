import React from 'react';
import {HashRouter, Route, Routes as Switch} from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import PopupLayout from "../Popups/PopupLayout";

const Router = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/user" element={<PopupLayout children={<MainPage/>}/>}/>
            </Switch>
        </HashRouter>
    );
};

export default Router;