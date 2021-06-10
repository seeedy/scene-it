import React, { useState } from 'react';

const Filmroll = () => {
  const [ready, setReady] = useState(false);
  const [name, setName] = useState();

  const handleChange = (e) => {
    setName(e.target.value);
  };

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
          <div className='self-name'>{self.name}</div>

          <input
            type='text'
            value={name}
            placeholder='Enter your name'
            onChange={handleChange}
            id='name-input'
          />

          {ready && (
            <div className='ready'>
              <p>{`I'm ready`}</p>
            </div>
          )}

          {name && (
            <button className='rdy-btn' onClick={() => setReady(true)}>
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
