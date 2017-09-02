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
} from 'react-router-dom'
import L from 'leaflet';

var provider = 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRyaWF0aWsiLCJhIjoiY2o3MzRxd2Q1MDN0bTJxdGNha3F2dWZqbiJ9.lNcK1We3R9LuUW5VGuYs6Q';
// var provider = 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';

const theme = {
};

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

class Map extends Component {
    componentDidMount() {
        var map = L.map('home-map').setView([46.7818348,8.2925331], 8);

        L.tileLayer(provider, {
            maxZoom: 18
        }).addTo(map);
    }
    render() {
        return <div id="home-map"></div>
    }
}

class EntryApp extends Component {
    render() {
        return (
            <div>
                <AppBar
                    title="SafeCity"
                    iconElementLeft={null}
                    iconElementRight={<RightMenuButtons />}
                />
                <Route path="/" exact component={() =>  <Map />}/>
                <Route path="/settings" component={() => <div>settings</div>}/>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <Router>
                    <EntryApp/>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
