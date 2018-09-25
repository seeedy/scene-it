import React from 'react';
import { connect } from 'react-redux';
import { } from '../actions';
import { getSocket } from '../socket';



class Guesser extends React.Component {
    constructor(props) {
        super(props);
        this.state={};

    }




    render() {
        return null;
    }
}




const mapStateToProps = state => {
    return {
        scene: state.scene
    };
};


export default connect(mapStateToProps)(Guesser);
