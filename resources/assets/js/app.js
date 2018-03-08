//app.js

require('./bootstrap');
import React from 'react';
import history from './history';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react'
import Master from './components/layout/master'
import {Router} from 'react-router-dom';
import configureStore from './store'
import ReactGA from 'react-ga';

ReactGA.initialize('UA-115027181-1');

const {persistor, store} = configureStore();

//provider is necessary for redux, it enables store access to components
//router used to keep track of redirects and history
//persistgate rehydrates state after reloads

render(

    (<Provider store={store}>
        <PersistGate persistor={persistor}>
            <Router history={history}>
                <Master/>
            </Router>
        </PersistGate>
    </Provider>),
    document.getElementById('example')

);