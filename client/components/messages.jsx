import React from 'react';
import Header from './header';
import Footer from './footer';
import MessageChats from './message-chats';
import Alert, { openAlert } from 'simple-react-alert';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deeds: null,
      messages: null,
      view: 'messageList'
    };
  }

  changeView(newView) {
    this.setState({ view: newView });
  }

  componentDidMount() {
    fetch(`api/messages_commits.php?id=${this.props.userData.id}`)
      .then(response => response.ok ? response.json() : Promise.reject(new Error('There was an error retrieving users message data')))
      .then(data => {
        this.setState({ deeds: data.deeds, messages: data.messages }, () => console.log(this.state));
      })
      .catch(() => {
        openAlert({ message: 'There was an error retrieving message data', type: 'danger' });
      });
  }

  render() {
    return (
      <>
      <Alert/>
      <Header/>
      <div className="heading">MESSAGES</div>
      <div className="messagesContainer">

      </div>
      <div className="messagesButtonContainer">

      </div>
      <Footer setView={this.props.setView}/>
      </>
    );
  }

}

export default Messages;
