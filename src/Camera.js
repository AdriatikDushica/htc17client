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
        // var ws = new WebSocket(`ws://${this.props.cam.host}/ws`);
        var ws = new WebSocket(`ws://192.168.0.133:8888/ws`);

        ws.onmessage =  (evt) => {
            //document.getElementById("stream").src = 'data:image/jpg;base64,' + evt.data;
            this.setState({img: 'data:image/jpg;base64,' + evt.data});
            console.log('asd');
        };

        ws.onerror = function (e) {
            console.log(e);
        };

        ws.onclose = function() {
        };

    }

    render() {
        var {cam} = this.props;
        return (
            <div className="container" style={{marginTop: '50px'}}>
                <img src={this.state.img} />
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