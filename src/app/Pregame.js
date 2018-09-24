import React from 'react';
// import axios from './axios';
import { connect } from 'react-redux';
import { getSocket } from '../socket';

class Pregame extends React.Component {
    constructor(props) {
        super(props);
        this.state={};

        this.toggleReady = this.toggleReady.bind(this);
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

        console.log('onlineUsers', onlineUsers);
        const { self } = this.props;
        const otherUsers = onlineUsers.filter(id => id != self);


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

}



const mapStateToProps = state => {
    return {
        onlineUsers: state.onlineUsers,
        self: state.self
    };
};


export default connect(mapStateToProps)(Pregame);
