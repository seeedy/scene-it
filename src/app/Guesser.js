import React from 'react';
import { connect } from 'react-redux';
import { } from '../actions';
import { getSocket } from '../socket';



class Guesser extends React.Component {
    constructor(props) {
        super(props);
        this.state={};

        this.sendGuess = this.sendGuess.bind(this);

    }



    sendGuess(e) {
        if (e.keyCode == 13) {
            getSocket().emit('sendGuess', e.target.value);
        }
    }


    render() {

        if (!this.props.scene) {
            <div id="game-wrapper">


                <div id="guesser-wrapper">

                    <h1>Waiting for scene</h1>

                    <input type="text" />
                </div>
            </div>;
        }

        return (

            <div id="game-wrapper">


                <div id="guesser-wrapper">


                    <img className="guess-img" src={this.props.scene} />

                    <input
                        type="text"
                        onKeyDown={this.sendGuess}/>
                </div>
            </div>


        );

    }
}




const mapStateToProps = state => {
    return {
        scene: state.scene
    };
};


export default connect(mapStateToProps)(Guesser);
