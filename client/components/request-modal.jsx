import React from 'react';

function RequestModal(props) {
  return (
    <div className="requestModalContainer">
      <div className="requestModalBackground" />
      <div className="request-modal">
        <div onClick={props.hide} className="fas fa-times closeRequestModal" />
        <div className="requestModalHeadline">{props.headline}</div>
        <div className="requestModalSummary">
          {props.summary}
        </div>
      </div>
    </div>
  );
}

export default RequestModal;
