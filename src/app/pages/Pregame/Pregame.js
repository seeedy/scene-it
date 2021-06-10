import React from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../../../socket';
import { Round, Transition } from '../';
import { Filmroll } from '../../components';

class Pregame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'pregame',
    };

    this.toggleReady = this.toggleReady.bind(this);
    this.setPlayerName = this.setPlayerName.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.stage && props.stage != state.stage) {
      return {
        stage: props.stage,
      };
    }
    return state;
  }

  setPlayerName(e, value) {
    console.log('set player name', e.keyCode, value);
    if (e.keyCode === 13) {
      getSocket().emit('setPlayerName', value);
    }
  }

  toggleReady() {
    getSocket().emit('toggleReady');
    this.btn.classList.add('hidden');
    this.ready.classList.remove('hidden');
  }

  render() {
    const { onlinePlayers, self } = this.props;

    if (!onlinePlayers) {
      return null;
    }

    if (!self) {
      return null;
    }

    const otherPlayers = onlinePlayers.filter(
      (player) => player.userId != self.userId
    );

    if (this.state.stage == 'pregame') {
      return (
        <div id='pregame-wrapper'>
          <h1>Scene it?</h1>
          <div id='online-players'>
            <Filmroll name={self.name} setPlayerName={this.setPlayerName} />

            {otherPlayers.map((player) => (
              <div className='player-wrapper' key={player.userId}>
                <div id='filmroll-top'>
                  <div className='perforations'></div>
                  <div className='perforations'></div>
                  <div className='perforations'></div>
                  <div className='perforations'></div>
                  <div className='perforations'></div>
                  <div className='perforations'></div>
                </div>
                <div className='player-outside'>
                  <div className='other-player'>
                    {player.name || 'Player joined'}

                    <div className='ready'>{player.ready && <p>READY!</p>}</div>
                  </div>
                </div>

                <div id='filmroll-btm'>
                  <div className='perforations'></div>
                  <div className='perforations'></div>
                  <div className='perforations'></div>
                  <div className='perforations'></div>
                  <div className='perforations'></div>
                  <div className='perforations'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (this.state.stage == 'round') {
      return <Round />;
    }

    if (this.state.stage == 'transition') {
      return <Transition />;
    }
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    onlinePlayers: state.onlinePlayers,
    self: state.self,
    stage: state.stage,
  };
};

export default connect(mapStateToProps)(Pregame);
