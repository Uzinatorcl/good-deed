import React from 'react';

function CheckRequests(props) {
  return (
    <div className="checkRequest">
      <div className="checkRequestHeadline">
        {props.headline}
      </div>
      <div className="checkRequestButtonContainer">
        <span className="fas fa-check checkRequestCompleteIcon"></span>
        <span onClick={() => { props.cancelCallback(props.requestId); }} className="fas fa-times checkRequestDeleteIcon"></span>
      </div>
    </div>
  );
}

export default CheckRequests;
