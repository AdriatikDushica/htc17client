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

        ws.onmessage =  (evt) => {
            // this.setState({img: 'data:image/jpg;base64,' + evt.data});
            document.getElementById('thecam').src = 'data:image/jpg;base64,' + evt.data;
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
            <div className="container" style={{marginTop: '50px'}}>
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