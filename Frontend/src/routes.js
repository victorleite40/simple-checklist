import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Boards from './pages/Boards';
import List from './pages/List';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/boards" exact component={Boards} />
                <Route path="/boards/:board_id" exact component={List} children={<List />} />
            </Switch>
        </BrowserRouter>
    );
}