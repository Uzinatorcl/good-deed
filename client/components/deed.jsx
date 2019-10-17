import React from 'react';

function Deed(props) {
  return (
    <>
    <div className="deedContainer">
      <div className="deedList">
        <div className="row w-100 deedInfoContainer">
          <div className="col-9 userHeadlineInfo">
            <div className="deedUsername">{props.username}</div>
            <div className="userHeadline">{props.headline}</div>
          </div>
          <div className="col-3 requestImageContainer">
            <img className="requesterImage" src={props.image} alt="requesters profile image" />
          </div>
        </div>
      </div>
      <div className="userLocation">{props.zipcode}</div>
      <div className="userSummary">{props.summary}</div>
    </div>
    <div className="deedButtonContainer">
      <button onClick={() => { props.changeView('deedList') ;}}>BACK</button>
      <button>COMMIT</button>
    </div>
    </>
  );
}

export default Deed;
