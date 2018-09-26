import React from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../socket';



class Scorer extends React.Component {
    constructor(props) {
        super(props);
        this.state={};

        this.pickWinner = this.pickWinner.bind(this);
    }



    pickWinner(e) {
        console.log(e.target);
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


        return (

            <div id="game-wrapper">


                <div id="scorer-wrapper">


                    <img className="guess-img" src={this.props.scene} />

                    <div id="incoming-guesses">

                        {otherPlayers.map(player => (
                            <div key={player.userId}>
                                {!!player.guess &&
                                    <div
                                        className="player-guess"
                                        ref={guess => this.guess = guess} onClick={this.pickWinner}
                                    >

                                        <div className="guesser-info">
                                            <div className="guesser-name">name</div>
                                            <div className="guess-time">time</div>
                                        </div>
                                        <div className="guess-text">
                                            {player.guess}
                                        </div>
                                    </div>}
                            </div>
                        ))}



                    </div>
                </div>
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


export default connect(mapStateToProps)(Scorer);
