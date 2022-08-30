import React from 'react';
import { BrowserRouter, Routes as Switch, Route} from 'react-router-dom';
import MainPage from '../../pages/MainPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<MainPage />} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;