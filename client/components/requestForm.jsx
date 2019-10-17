import React from 'react';

class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: '',
      zipcode: '',
      summary: ''
    };
    this.trackHeadline = this.trackHeadline.bind(this);
    this.trackZipcode = this.trackZipcode.bind(this);
    this.trackSummary = this.trackSummary.bind(this);
    this.generateRequest = this.generateRequest.bind(this);
  }
  generateRequest() {
    const request = {
      'category_id': this.props.categoryId,
      'user_id': this.props.userId,
      'headline': this.state.headline,
      'zipcode': this.state.zipcode,
      'summary': this.state.summary
    };
    this.props.requestCallback(request);
  }
  trackHeadline(event) {
    this.setState({ headline: event.target.value });
  }
  trackZipcode(event) {
    this.setState({ zipcode: event.target.value });
  }
  trackSummary(event) {
    this.setState({ summary: event.target.value });
  }

  render() {
    return (
      <div className="requestContainer">
        <div className="heading">REQUEST INFO</div>
        <div className="requestFormContainer">
          <form className="requestForm">
            <input type="text" maxLength="61" className="requestBoxHeadline" id="headline" placeholder="HEADLINE" onChange={this.trackHeadline} />
            <input type="text" maxLength="10" className="requestBoxZipcode" id="zipcode" placeholder="ZIPCODE" onChange={this.trackZipcode} />
            <label className="summaryLabel">SUMMARY</label>
            <textarea id="summary" className="requestBoxSummary" cols="30" rows="8" onChange={this.trackSummary}></textarea>
          </form>
        </div>
        <div className="deedButtonContainer">
          <button onClick={() => this.props.changeView('categoryList')}>BACK</button>
          <button onClick={this.generateRequest}>SUBMIT</button>
        </div>
      </div>
    );
  }

}

export default RequestForm;
