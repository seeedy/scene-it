import React from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../socket';



class Transition extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            timer: 20
        };

        this.nextRound = this.nextRound.bind(this);

        this.count;
        this.tick = this.tick.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }

    componentDidMount() {
        this.setState({
            scene: this.props.scene,
            searchTerm: this.props.searchTerm,
        });

        this.startTimer();
    }

    startTimer() {
        this.count = this.state.timer;
        this.intervalHandle = setInterval(this.tick, 1000);
    }

    tick() {

        this.count--;
        this.setState({
            timer: this.count
        });

        if (this.count == 0) {
            clearInterval(this.intervalHandle);
            this.nextRound();
        }
    }


    nextRound() {
        getSocket().emit('nextRound');
    }


    render() {

        const { onlinePlayers } = this.props;

        if (!onlinePlayers) {
            return <div>no players</div>;
        }

        const winner = onlinePlayers.find(player => player.wonRound === true);
        const scorer = onlinePlayers.find(player => player.role == 'scorer');



        return (
            <div id="transition-wrapper">
                {winner && <div id="winner">
                    <p>{scorer.name} chose a scene from &#34;{this.state.searchTerm}&#34;. </p>
                    <p>{winner.name} won this round!</p>
                    <img src={this.state.scene} className="winner-img" />
                    <p>Winning answer: &#34;{winner.guess}&#34;</p>
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

                <div>Next round starts in <span>{this.state.timer}</span></div>
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
