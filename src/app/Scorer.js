import React from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../socket';
import Transition from './Transition';



class Scorer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            role: 'scorer'
        };

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.pickWinner = this.pickWinner.bind(this);
    }

    static getDerivedStateFromProps(props, state) {

        if (props.role && props.role != state.role) {
            return {
                role: props.role,
            };
        }
        return state;
    }



    showModal(player) {
        this.setState({
            winner: player
        });
        console.log(this.state);
        document.getElementById("scorer-modal").classList.add("shown");
    }

    closeModal() {
        document.getElementById("scorer-modal").classList.remove("shown");
    }


    pickWinner() {
        getSocket().emit('roundWinner', this.state.winner);
        document.getElementById("scorer-modal").classList.remove("shown");
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

        if (this.state.role == 'scorer') {
            return (

                <div id="game-wrapper">

                    <div id="scorer-modal">
                        <div id="pick-winner">
                            <p>Pick this answer as winner?</p>
                            <div className="buttons-box">
                                <button
                                    className="scene-btn"
                                    onClick={this.pickWinner}
                                ><i className="fas fa-check-circle"></i></button>
                                <button
                                    className="scene-btn"
                                    onClick={this.closeModal}
                                ><i className="fas fa-times-circle"></i></button>
                            </div>
                        </div>
                    </div>


                    <div id="scorer-wrapper">


                        <div className="player-wrapper">
                            <div id="filmroll-top">
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                            </div>
                            <div className="player-outside">
                                <img className="guess-img" src={this.props.scene} />

                            </div>
                            <div id="filmroll-btm">
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                            </div>
                        </div>






                        <div id="incoming-guesses">

                            {otherPlayers.map(player => (
                                <div key={player.userId}>
                                    {!!player.guess &&
                                        <div
                                            className="player-guess"
                                            ref={guess => this.guess = guess} onClick={() => this.showModal(player)}
                                        >

                                            <div className="guesser-info">
                                                <div className="guesser-name">{player.name}: </div>
                                                <div className="guess-text">
                                                    {player.guess}
                                                </div>
                                            </div>

                                        </div>}
                                </div>
                            ))}



                        </div>
                    </div>
                </div>


            );
        }

        if (this.state.role == 'transition') {
            return (<Transition />);
        }
    }
}




const mapStateToProps = state => {
    return {
        scene: state.scene,
        onlinePlayers: state.onlinePlayers,
        self: state.self,
        role: state.role
    };
};


export default connect(mapStateToProps)(Scorer);
