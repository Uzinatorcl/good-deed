import React from 'react';
import Header from './header';
import Footer from './footer';
import CheckCommits from './check-commits';
import MessageChats from './message-chats';
import Alert, { openAlert } from 'simple-react-alert';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deeds: null,
      messages: null,
      view: 'messageList',
      currentMessages: null
    };
    this.changeView = this.changeView.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
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

  renderMessages(id) {
    const currentMessages = this.state.messages.find(message => message.commit_id === id);
    this.setState({ currentMessages: currentMessages }, () => console.log(this.state));
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
            setDeed={this.renderMessages}
            setView={this.changeView}
            newView={'messages'}
          />;
        })
      );
    }
  }

  render() {
    const display = this.messagesDisplay();
    return (
      <>
      <Alert/>
      <Header/>
      <div className="heading">MESSAGES</div>
      <div className="messagesContainer">
        {display}
      </div>
      <div className="messagesButtonContainer">

      </div>
      <Footer setView={this.props.setView}/>
      </>
    );
  }

}

export default Messages;
