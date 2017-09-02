import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { v4 } from 'uuid';
import swal from 'sweetalert2';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {
    Link
} from 'react-router-dom';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameField: 'Entrata edificio',
            camField: '192.168.0.119:8888'
        }
    }

    onAddCam = () => {
        if(this.state.nameField.length===0) {
            swal('Errore', 'Inserire un nome', 'error');
            return;
        }
        if(this.state.camField.length===0) {
            swal('Errore', 'Inserire un indirizzo valido', 'error');
            return;
        }

        fetch(`http://${this.state.camField}/coordinates`)
            .then(response => response.json())
            .then(jsonResponse => {
                this.props.onAddCam({
                    id: v4(),
                    name: this.state.nameField,
                    host: this.state.camField,
                    coordinates: jsonResponse.coordinates
                })
                this.setState({camField: '', nameField: ''});
            })
            .catch(() => swal('Errore', 'La videocamera non è raggiungibile', 'error'))
    }

    onDeleteCam = id => {
        this.props.onDeleteCam(id);
        console.log('asd');
    }

    render() {
        var {cams} = this.props;
        return (
            <div className="container" style={{marginTop: '50px'}}>
                {cams.length==0
                    ? <h3 style={{textAlign: 'center'}}>Non ci sono videocamera configurate!</h3>
                    : cams.map(cam =>  (
                        <Card key={cam.id} style={{marginBottom: '25px'}}>
                            <CardTitle title={cam.name} subtitle={`Indirizzo: ${cam.host}`} />
                            <CardText>
                                <Link to={`/camera/${cam.id}`}>Guarda</Link>
                                <a href="#" style={{marginLeft: '15px'}} onClick={() => this.onDeleteCam(cam.id)}>Rimuovi</a>
                            </CardText>
                        </Card>
                    ))
                }

                <div style={{marginTop: '50px'}}>
                    <TextField
                        floatingLabelText="Indirizzo"
                        value={this.state.camField}
                        onChange={e => this.setState({camField: e.target.value})}
                    />
                    <TextField
                        style={{marginLeft: '15px'}}
                        floatingLabelText="Nome"
                        value={this.state.nameField}
                        onChange={e => this.setState({nameField: e.target.value})}
                    />
                    <RaisedButton style={{marginLeft: '15px'}} label="Aggiungi" onClick={this.onAddCam} />
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        cams: state.cams
    }),
    dispatch => ({
        onAddCam: cam => dispatch({type: 'CAM_ADD', cam}),
        onDeleteCam: id => dispatch({type: 'CAM_DELETE', id})
    })
)(Settings);