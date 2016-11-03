
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import App from './containers/App/index';
import PhotoSet from './components/PhotoSet';


const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="photoset/:photoset" component={PhotoSet} />
        </Route>
    </Router>
);

ReactDOM.render(
    routes,
    document.getElementById('root')
);
