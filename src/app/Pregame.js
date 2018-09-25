import React from 'react';
// import axios from './axios';
import { connect } from 'react-redux';
import { getSocket } from '../socket';
import Search from './search';

class Pregame extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            role: ''
        };

        this.toggleReady = this.toggleReady.bind(this);
    }

    static getDerivedStateFromProps(props, state) {

        if (props.role !== state.role) {
            return {
                role: props.role,
            };
        }
        return state;
    }


    toggleReady() {
        console.log('emitting ready to server');
        getSocket().emit('toggleReady', this.props.self);
    }

    render() {

        const { onlineUsers } = this.props;

        if (!onlineUsers) {
            return null;
        }

        const { self } = this.props;
        const otherUsers = onlineUsers.filter(id => id != self);

        if (!this.state.role) {
            return(
                <div id="pregame-wrapper">
                    <h2>Players online</h2>
                    <div id="online-players">
                        <div className="self-player">
                            myself
                            <div>{self}</div>
                            <button
                                className="rdy-btn"
                                onClick={this.toggleReady}
                            >Ready</button>
                        </div>
                        {otherUsers.map(user => (
                            <div className="other-player" key={user}>
                                other player
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
            return (<div>Guesser</div>);
        }





    }

}



const mapStateToProps = state => {
    return {
        onlineUsers: state.onlineUsers,
        self: state.self,
        role: state.role
    };
};


export default connect(mapStateToProps)(Pregame);
