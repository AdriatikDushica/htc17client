import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Map from './Map';
import Settings from './Settings';
import Camera from './Camera';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'

function cams(state = [], action) {
    switch (action.type) {
        case 'CAM_ADD':
            return [...state, action.cam];
        case 'CAM_DELETE':
            return state.filter(cam => cam.id!=action.id);
        default:
            return state;
    }
}

function windowSize(state = {width: 0, height: 0}, action) {
    switch (action.type) {
        case 'WINDOW_SIZE':
            return {
                width: action.w,
                height: action.y
            };
        default:
            return state;
    }
}

export const store = createStore(combineReducers({
    cams,
    windowSize
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let onresize = function(event) {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    // alert(x + ' × ' + y);
    store.dispatch({type: 'WINDOW_SIZE', x, y});
};

window.onresize = onresize;
onresize();

const theme = {};

class RightMenuButtons extends Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <div>
                <FlatButton {...this.props} label="Mappa"  containerElement={<Link to="/"/>} />
                <FlatButton {...this.props} label="Impostazioni"  containerElement={<Link to="/settings"/>} />
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <Provider store={store}>
                    <Router>
                        <div>
                            <AppBar
                                title="SafeCity"
                                iconElementLeft={null}
                                iconElementRight={<RightMenuButtons />}
                            />
                            <Route path="/" exact component={() =>  <Map />}/>
                            <Route path="/settings" component={() => <Settings />}/>
                            <Route path="/camera/:id" component={() => <Camera />}/>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
