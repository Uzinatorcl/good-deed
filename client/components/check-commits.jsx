import React from 'react';

function CheckCommits(props) {
  return (
    <div onClick={() => { props.setDeed(props.commitId); props.setView(props.newView); }} className="checkCommits">
      <div className="checkCommitsHeadline">
        {props.headline}
      </div>
      <div className="checkCommitsImageContainer">
        <img className="checkCommitsImage"src={props.image} alt="your commits profile image"/>
      </div>
    </div>
  );
}

export default CheckCommits;
