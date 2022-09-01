import React from 'react';
import {HashRouter, Route, Routes as Switch, useLocation} from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import PopupLayout from "../Popups/PopupLayout";

const Router = () => {
    const location = useLocation();
    //@ts-ignore
    const background = location.state && location.state.background
    return (
        <>
            <Switch location={background || location}>
                <Route path="/" element={<MainPage/>}>
                    <Route path='user' element={<PopupLayout />}/>
                </Route>
            </Switch>
            {
                background &&
                <Switch>
                    <Route path='user' element={<PopupLayout />}/>
                </Switch>
            }
        </>
    );
};

export default Router;