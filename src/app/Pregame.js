import React from 'react';
// import axios from './axios';
import { connect } from 'react-redux';
import { getSocket } from '../socket';
import Search from './search';
import Guesser from './guesser';

class Pregame extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            role: ''
        };

        this.toggleReady = this.toggleReady.bind(this);
    }

    static getDerivedStateFromProps(props, state) {

        if (props.self && props.self.role != state.role) {
            return {
                role: props.self.role,
            };
        }
        return state;
    }


    toggleReady() {
        console.log('emitting ready to server');
        getSocket().emit('toggleReady', this.props.self);
    }

    render() {

        const { onlinePlayers } = this.props;
        const { self } = this.props;

        if (!onlinePlayers) {
            return <div>no players</div>;
        }

        if (!self) {
            return <div>no self</div>;
        }

        const otherPlayers = onlinePlayers.filter(player => player.userId != self.userId);

        if (!this.state.role) {
            return(
                <div id="pregame-wrapper">
                    <h2>Players online</h2>
                    <div id="online-players">
                        <div className="self-player">
                            myself
                            {self &&<div>{self.userId}</div>}
                            <button
                                className="rdy-btn"
                                onClick={this.toggleReady}
                            >Ready</button>
                        </div>
                        {otherPlayers.map(player => (
                            <div className="other-player" key={player.userId}>
                                {player.userId}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (this.state.role == 'quizzer') {
            return (<Search />);
        }

        if (this.state.role == 'guesser') {
            return (<Guesser />);
        }





    }

}



const mapStateToProps = state => {
    console.log('state', state);
    return {
        onlinePlayers: state.onlinePlayers,
        self: state.self,
        // role: state.self.role
    };
};


export default connect(mapStateToProps)(Pregame);
