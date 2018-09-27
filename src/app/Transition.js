import React from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../socket';



class Transition extends React.Component {
    constructor(props) {
        super(props);
        this.state={};


    }


    render() {

        const { onlinePlayers } = this.props;

        if (!onlinePlayers) {
            return <div>no players</div>;
        }



        return (
            <div id="transition-wrapper">
                between rounds

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        scene: state.scene,
        onlinePlayers: state.onlinePlayers,
        self: state.self
    };
};


export default connect(mapStateToProps)(Transition);
