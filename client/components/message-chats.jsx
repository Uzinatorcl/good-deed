import React from 'react';

function MessageChats(props) {
  if (props.yourUserId === props.sendingUserId) {
    return (
      <div className="chatMessage">
        <div className="chatMessageText">
          {props.message}
        </div>
        <div className="chatMessageImageContainer">
          <img className="chatMessageImage" src={props.image} alt="your profile image" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="chatMessage">
        <div className="chatMessageImageContainer">
          <img className="chatMessageImage" src={props.image} alt="your profile image" />
        </div>
        <div className="chatMessageText">
          {props.message}
        </div>
      </div>
    );
  }
}

export default MessageChats;
