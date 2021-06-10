import React from 'react';
import { connect } from 'react-redux';
import Search from '../../Search';
import Guesser from './Guesser';
import Scorer from '../../Scorer';

class Round extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'round',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.self && props.self.role != state.role) {
      return {
        role: props.self.role,
      };
    }
    return state;
  }

  render() {
    if (this.state.role == 'quizzer') {
      return <Search />;
    }

    if (this.state.role == 'guesser') {
      return <Guesser />;
    }

    if (this.state.role == 'scorer') {
      return <Scorer />;
    }

    return <div>no state.role</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    onlinePlayers: state.onlinePlayers,
    self: state.self,
  };
};

export default connect(mapStateToProps)(Round);
