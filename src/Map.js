import React, { Component } from 'react';
import L from 'leaflet';
import { connect } from 'react-redux';

var provider = 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRyaWF0aWsiLCJhIjoiY2o3MzRxd2Q1MDN0bTJxdGNha3F2dWZqbiJ9.lNcK1We3R9LuUW5VGuYs6Q';
// var provider = 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';

class Map extends Component {
    componentDidMount() {
        var map = L.map('home-map').setView([45.8367, 9.0246], 15);

        L.tileLayer(provider, {
            maxZoom: 18
        }).addTo(map);

        this.props.cams.forEach(function (cam) {
            L.marker([cam.coordinates[0], cam.coordinates[1]]).addTo(map);
        });
    }
    componentWillUnmount() {
        console.log('unmount');
    }
    render() {
        return <div id="home-map" style={{width: '100%', height: this.props.windowSize.height}}></div>
    }
}

export default connect(state => ({
    cams: state.cams,
    windowSize: state.windowSize
}))(Map);