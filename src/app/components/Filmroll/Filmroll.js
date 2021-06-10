import React, { useState } from 'react';

const Filmroll = (props) => {
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    setReady(true);
  };

  const { name, setPlayerName } = props;
  console.log(name);

  return (
    <div className='player-wrapper'>
      <div id='filmroll-top'>
        <div className='perforations'></div>
        <div className='perforations'></div>
        <div className='perforations'></div>
        <div className='perforations'></div>
        <div className='perforations'></div>
        <div className='perforations'></div>
      </div>
      <div className='player-outside'>
        <div className='self-player'>
          {name && <div className='self-name'>{name}</div>}

          {!name && (
            <input
              type='text'
              value={value}
              placeholder='Enter your name'
              onChange={handleChange}
              onKeyDown={(e) => setPlayerName(e, value)}
              id='name-input'
            />
          )}

          {ready && (
            <div className='ready'>
              <p>{`I'm ready`}</p>
            </div>
          )}

          {name && !ready && (
            <button className='rdy-btn' onClick={handleClick}>
              Ready
            </button>
          )}
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
  );
};

export default Filmroll;
