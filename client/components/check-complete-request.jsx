import React from 'react';

function CompleteRequestUser(props) {
  return (
    <div onClick = {() => { props.reviewData(props.commitId); props.changeView('review-form'); }}className="checkComplete">
      <div className="checkCompleteUsername">
        {props.username}
      </div>
      <div className="checkCompleteImageContainer">
        <img className="checkCompleteImage" src={props.image} alt="your commits profile image" />
      </div>
    </div>
  );
}

export default CompleteRequestUser;
