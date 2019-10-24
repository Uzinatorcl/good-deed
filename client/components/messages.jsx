import React from 'react';
import Header from './header';
import Footer from './footer';
import CheckCommits from './check-commits';
import MessageChats from './message-chats';
import Alert, { openAlert } from 'simple-react-alert';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.messagesContainerRef = React.createRef();
    this.state = {
      deeds: null,
      messages: null,
      view: 'messageList',
      currentMessages: null,
      messageBody: ''
    };
    this.changeView = this.changeView.bind(this);
    this.getMessagesToRender = this.getMessagesToRender.bind(this);
    this.trackMessage = this.trackMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  changeView(newView) {
    this.setState({ view: newView });
  }

  componentDidMount() {
    fetch(`api/messages_commits.php?id=${this.props.userData.id}`)
      .then(response => response.ok ? response.json() : Promise.reject(new Error('There was an error retrieving users message data')))
      .then(data => {
        this.setState({ deeds: data.deeds, messages: data.messages });
      })
      .catch(() => {
        openAlert({ message: 'There was an error retrieving message data', type: 'danger' });
      });
  }
  sendMessage() {
    const [messageData] = this.state.currentMessages;
    const { commit_id, commiters_user_id, requesters_user_id } = messageData;
    let recievingUserId;
    if (commiters_user_id === this.props.userData.id) {
      recievingUserId = requesters_user_id;
    } else {
      recievingUserId = commiters_user_id;
    }
    const sendMessageData = {
      'commit_id': commit_id,
      'commiters_user_id': commiters_user_id,
      'requesters_user_id': requesters_user_id,
      'sending_user_id': this.props.userData.id,
      'recieving_user_id': recievingUserId,
      'message': this.state.messageBody
    };
    fetch('api/send_message.php', {
      'method': 'POST',
      'body': JSON.stringify(sendMessageData)
    })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('There was an error sending the message to the server')))
      .then(data => {
        sendMessageData.message_id = data;
        sendMessageData.sending_user_image_url = this.props.userData.image_url;
        const messageCopy = this.state.messages.map(message => Object.assign({}, message));
        messageCopy.push(sendMessageData);
        this.setState({ messages: messageCopy }, () => { this.getMessagesToRender(commit_id); });
      })
      .catch(() => {
        openAlert({ message: 'There was an issue sending your message', type: 'danger' });
      });

  }

  trackMessage(event) {
    this.setState({ messageBody: event.target.value });
  }

  getMessagesToRender(commitId) {
    const currentMessages = this.state.messages.filter(message => message.commit_id === commitId);
    this.setState({ currentMessages: currentMessages }, () => {
      this.messagesContainerRef.current.scrollTop = this.messagesContainerRef.current.scrollHeight;
    });
  }

  messagesDisplay() {
    if (this.state.view === 'messageList' && this.state.deeds === null) {
      return 'loading messages...';
    }
    if (this.state.view === 'messageList' && this.state.deeds !== null) {
      return (
        this.state.deeds.map(deed => {
          return <CheckCommits
            key={deed.commit_id}
            commitId={deed.commit_id}
            headline={deed.headline}
            image={deed.image_url}
            setDeed={this.getMessagesToRender}
            setView={this.changeView}
            newView={'messages'}
          />;
        })
      );
    }
    if (this.state.view === 'messages' && this.state.currentMessages === null) {
      return 'loading messages...';
    }
    if (this.state.view === 'messages' && this.state.currentMessages !== null) {
      return this.state.currentMessages.map(messagesToDisplay => {
        return (
          <MessageChats
            key={messagesToDisplay.message_id}
            yourUserId={this.props.userData.id}
            sendingUserId={messagesToDisplay.sending_user_id}
            image={messagesToDisplay.sending_user_image_url}
            message={messagesToDisplay.message}
          />
        );
      });
    }
  }
  messageInteraction() {
    if (this.state.view !== 'messages') return '';
    return (
      <div className="messagesInteraction">
        <input type="text" className="sendMessage" id="sendMessage" placeholder="Your message goes here ..." value={this.state.messageBody} onChange={this.trackMessage}/>
        <div className="messageButtonContainer">
          <button onClick={() => this.changeView('messageList')}>BACK</button>
          <button onClick={this.sendMessage}>SEND</button>
        </div>
      </div>
    );
  }
  render() {
    const display = this.messagesDisplay();
    const messageInteraction = this.messageInteraction();
    return (
      <>
      <Alert/>
      <Header/>
      <div className="heading">MESSAGES</div>
      <div className="messagesContainer" ref={this.messagesContainerRef}>
        {display}
      </div>
      {messageInteraction}
      <Footer setView={this.props.setView}/>
      </>
    );
  }

}

export default Messages;
