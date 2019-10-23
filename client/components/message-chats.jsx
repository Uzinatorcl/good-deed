import React from 'react';

function MessageChats(props) {
  if (props.yourUserId === props.sendingUserId) {
    return (
      <div className="checkCommits">
        <div className="checkCommitsHeadline">
          {props.message}
        </div>
        <div className="checkCommitsImageContainer">
          <img className="checkCommitsImage" src={props.image} alt="your profile image" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="checkCommits">
        <div className="checkCommitsImageContainer">
          <img className="checkCommitsImage" src={props.image} alt="your profile image" />
        </div>
        <div className="checkCommitsHeadline">
          {props.message}
        </div>
      </div>
    );
  }
}

export default MessageChats;
