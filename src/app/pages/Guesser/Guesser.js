import React from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../socket';

class Guesser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'guesser',
    };

    this.sendGuess = this.sendGuess.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.role && props.role != state.role) {
      return {
        role: props.role,
      };
    }
    return state;
  }

  componentDidMount() {
    this.setState({
      scene: '',
    });
  }

  sendGuess(e) {
    if (e.keyCode === 13) {
      getSocket().emit('sendGuess', e.target.value);
      this.input.classList.add('hidden');
      this.after.classList.remove('hidden');
    }
  }

  render() {
    if (!this.props.scene) {
      return (
        <div id='game-wrapper'>
          <div id='guesser-wrapper'>
            <h1>Waiting for scene</h1>
            <img className='guess-img' src='/img/countdown.gif' />
          </div>
        </div>
      );
    }

    if (this.state.role == 'guesser') {
      return (
        <div id='game-wrapper'>
          <div id='guesser-wrapper'>
            <div className='player-wrapper'>
              <div id='filmroll-top'>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
              </div>
              <div className='player-outside'>
                <img className='guess-img' src={this.props.scene} />
              </div>
              <div id='filmroll-btm'>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
                <div className='perforations'></div>
              </div>
            </div>

            <div id='guess-bar' ref={(input) => (this.input = input)}>
              <input
                id='guess-input'
                type='text'
                onKeyDown={this.sendGuess}
                placeholder='Guess the movie'
              />
              <button className='guess-btn' onClick={this.sendGuess}>
                <i className='fas fa-paper-plane'></i>
              </button>
            </div>
            <div
              className={`after-guess hidden`}
              ref={(after) => (this.after = after)}
            >
              Your answer was sent! Waiting for decision...
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    scene: state.scene,
    onlinePlayers: state.onlinePlayers,
    self: state.self,
    role: state.role,
  };
};

export default connect(mapStateToProps)(Guesser);
