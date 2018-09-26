import React from 'react';
// import axios from './axios';
import { connect } from 'react-redux';
import { getSocket } from '../socket';
import Search from './Search';
import Guesser from './Guesser';
import Scorer from './Scorer';

class Pregame extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            role: ''
        };

        this.toggleReady = this.toggleReady.bind(this);
        this.setPlayerName = this.setPlayerName.bind(this);
    }

    static getDerivedStateFromProps(props, state) {

        if (props.self && props.self.role != state.role) {
            return {
                role: props.self.role,
            };
        }
        return state;
    }

    setPlayerName(e) {
        if (e.keyCode === 13) {
            console.log(e.target.value);
            getSocket().emit('setPlayerName', e.target.value);
            this.btn.classList.remove("hidden");
        }
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


                        <div className="player-wrapper">
                            <div id="filmroll-top">
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                            </div>
                            <div className="player-outside">
                                <div className="self-player">

                                    {self.name && self.name}
                                    {self &&<div>{self.userId}</div>}

                                    <input
                                        type="text"
                                        placeholder="choose screenname"
                                        onKeyDown={this.setPlayerName}
                                    />

                                    <button
                                        className={`rdy-btn hidden`}
                                        onClick={this.toggleReady}
                                        ref={btn => this.btn = btn}
                                    >Ready
                                    </button>
                                </div>
                            </div>
                            <div id="filmroll-btm">
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                            </div>
                        </div>

                        {otherPlayers.map(player => (
                            <div className="player-wrapper" key={player.userId}>
                                <div id="filmroll-top">
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                </div>
                                <div className="player-outside">

                                    <div className="other-player">
                                        {player.userId}
                                    </div>
                                </div>

                                <div id="filmroll-btm">
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                </div>
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

        if (this.state.role == 'scorer') {
            return (<Scorer />);
        }





    }

}



const mapStateToProps = state => {
    return {
        onlinePlayers: state.onlinePlayers,
        self: state.self,
    };
};


export default connect(mapStateToProps)(Pregame);
