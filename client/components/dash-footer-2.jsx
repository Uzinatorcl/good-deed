import React from 'react';

function DashFooter2(props) {
  return (
    <div className="dashFooterButtonContainer">
      <div onClick={() => props.setView('settings')} className="dashFooterIcon fas fa-cog"></div>
      <div onClick={() => props.setView('messages')} className="dashFooterIcon far fa-envelope"></div>
      <div onClick={() => props.setView('commit')} className="dashFooterIcon deedMarkerButton"></div>
      <div onClick={() => props.setView('request')} className="dashFooterIcon fas fa-plus-square"></div>
      <div onClick={() => props.setView('check')} className="dashFooterIcon fas fa-user-check"></div>
    </div>
  );
}

export default DashFooter2;
