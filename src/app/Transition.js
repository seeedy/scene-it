import React from 'react';
import { connect } from 'react-redux';
// import { getSocket } from '../socket';



class Transition extends React.Component {
    constructor(props) {
        super(props);
        this.state={};


    }

    componentDidMount() {
        this.setState({
            scene: this.props.scene,
            searchTerm: this.props.searchTerm
        });
    }


    render() {

        const { onlinePlayers } = this.props;

        if (!onlinePlayers) {
            return <div>no players</div>;
        }

        const winner = onlinePlayers.find(player => player.wonRound === true);
        console.log(winner);



        return (
            <div id="transition-wrapper">
                {winner && <div id="winner">
                    <p>This was a scene from {this.state.searchTerm}. </p>
                    <p>{winner.name} won this round!</p>
                    <img src={this.state.scene} className="winner-img" />
                    Winning answer: {winner.guess}
                </div>}


                <h2>Scores</h2>
                <div id="score-board">
                    {onlinePlayers.map(player => (
                        <div className="player-score" key={player.userId}>
                            <p>{player.name}</p>
                            <p>{player.score}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        scene: state.scene,
        onlinePlayers: state.onlinePlayers,
        self: state.self,
        searchTerm: state.searchTerm
    };
};


export default connect(mapStateToProps)(Transition);
