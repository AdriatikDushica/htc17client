import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            img: null
        }
    }

    componentDidMount() {
        var ws = new WebSocket(`ws://${this.props.cam.host}/ws`);
        // var ws = new WebSocket(`ws://192.168.0.133:8888/ws`);

        var x = document.getElementById('thecam');
        if(x)
            x.src = null;
        
        ws.onmessage =  (evt) => {
            // this.setState({img: 'data:image/jpg;base64,' + evt.data});
            var x = document.getElementById('thecam');
            if(x)
                x.src = 'data:image/jpg;base64,' + evt.data;
        };

        ws.onerror = function (e) {
            console.log(e);
        };

        ws.onclose = function() {
            
        };
    }

    componentWillUnmount() {
        console.log('unmount');
    }

    render() {
        return (
            <div className="container" style={{marginTop: '50px', textAlign: 'center'}}>
                <h3>{this.props.cam.name}</h3>
                <img id="thecam" />
            </div>
        );
    }
}

export default withRouter(connect(
    (state, props) => ({
        cam: state.cams.find(cam => cam.id==props.match.params.id)
    }),
    dispatch => ({
        onAddCam: cam => dispatch({type: 'CAM_ADD', cam})
    })
)(Settings));