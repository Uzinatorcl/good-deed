import React from 'react';

function CheckRequests(props) {
  return (
    <div className="checkRequest" onClick={() => props.setRequest(props.requestId)}>
      <div className="checkRequestHeadline">
        {props.headline}
      </div>
      <div className="checkRequestButtonContainer">
        <span onClick={e => { e.stopPropagation(); props.completeCallback(props.requestId); }} className="fas fa-check checkRequestCompleteIcon"></span>
        <span onClick={e => { e.stopPropagation(); props.cancelCallback(props.requestId); }} className="fas fa-times checkRequestDeleteIcon"></span>
      </div>
    </div>
  );
}

export default CheckRequests;
