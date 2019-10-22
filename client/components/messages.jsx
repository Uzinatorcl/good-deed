import React from 'react';
import Header from './header';
import Footer from './footer';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'messageList'
    };
  }

  changeView(newView) {
    this.setState({ view: newView });
  }

  render() {
    return (
      <>
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
