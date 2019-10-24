import React from 'react';

function DeedList(props) {
  return (
    <div onClick={() => props.getDeed(props.id)} className="deedList">
      <div className="row w-100 deedInfoContainer">
        <div className="col-9 userHeadlineInfo">
          <div className="userHeadline">{props.headline}</div>
        </div>
        <div className="col-3 requestImageContainer">
          <img className="requesterImage" src={props.image_url} alt="requesters profile image" />
        </div>
      </div>
    </div>
  );
}

export default DeedList;
