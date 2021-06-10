import React from 'react';

const Filmroll = (props) => {
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
      <div className='player-outside'>{props.children}</div>
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
