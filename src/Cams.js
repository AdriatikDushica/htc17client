import React, { Component } from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';

var provider = 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRyaWF0aWsiLCJhIjoiY2o3MzRxd2Q1MDN0bTJxdGNha3F2dWZqbiJ9.lNcK1We3R9LuUW5VGuYs6Q';

class Cams extends Component {
	componentDidMount() {
		var map = L.map('home-map').setView([45.8367, 9.0246], 15);

        L.tileLayer(provider, {
            maxZoom: 18
        }).addTo(map);

        this.props.cams.forEach(function (cam) {
            L.marker([cam.coordinates[0], cam.coordinates[1]]).addTo(map);
        });


		this.props.cams.forEach(cam => {
			var ws = new WebSocket(`ws://${cam.host}/ws`);
	        ws.onmessage =  (evt) => {
	            // this.setState({img: 'data:image/jpg;base64,' + evt.data});
	            var x = document.getElementById(`cam-${cam.id}`);
	            if(x)
	            	document.getElementById(`cam-${cam.id}`).src = 'data:image/jpg;base64,' + evt.data;
	        };
		});


    }

	render() {
		return (
			<div>
				<div className="container" style={{display: 'flex'}}>
					{this.props.cams.map(cam => (
						<div style={{marginTop: '50px', marginRight: '25px'}}>
							<h3>{cam.name}</h3>
							<img style={{width: '400px'}} id={`cam-${cam.id}`}/>
						</div>
					))}
				</div>
				<div id="home-map" style={{marginTop: '25px', width: '100%', height: '400px'}}></div>
			</div>
		)
	}
}

export default connect(state => ({
	cams: state.cams
}), null)(Cams);