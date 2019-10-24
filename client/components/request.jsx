import React from 'react';
import Header from './header';
import Footer from './footer';
import Categories from './categories';
import RequestForm from './requestForm';
import Alert, { openAlert } from 'simple-react-alert';

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryFetchCompleted: false,
      view: 'categoryList',
      selectedCategory: null
    };
    this.getCategory = this.getCategory.bind(this);
    this.changeRequestView = this.changeRequestView.bind(this);
    this.sendRequestToServer = this.sendRequestToServer.bind(this);
  }
  componentDidMount() {
    fetch('api/categories.php')
      .then(response => response.json())
      .then(data => {
        this.setState({ categoryList: data, categoryFetchCompleted: true });
      })
      .catch(error => console.error(error));
  }
  sendRequestToServer(request) {
    fetch('api/deeds.php', {
      method: 'POST',
      body: JSON.stringify(request)
    }).then(response => response.ok ? response : Promise.reject(new Error('There was an issue adding a request.')))
      .then(() => {
        openAlert({ message: 'Your request has successfully been posted!', type: 'success' });
      })
      .catch(() => {
        openAlert({ message: 'There was an issue adding your request.', type: 'warning' });
      });
  }
  getCategory(category) {
    this.setState({ selectedCategory: category });
  }
  generateRequestForm() {
    return (
      <RequestForm
        userId={this.props.userData.id}
        categoryId={this.state.selectedCategory}
        changeView={this.changeRequestView}
        requestCallback = {this.sendRequestToServer}
      />
    );
  }
  generateCategoryList() {
    if (this.state.categoryFetchCompleted) {
      return (
        <>
          <div className="heading">CHOOSE YOUR CATEGORY</div>
          <div className="categoryList">
            {this.state.categoryList.map(category => {
              return <Categories key={category.category_id} id={category.category_id} nextView={'requestForm'} name={category.name} changeView={this.changeRequestView} select={this.getCategory} />;
            })}
          </div>
        </>
      );
    } else {
      return 'loading categories...';
    }
  }
  changeRequestView(newView) {
    this.setState({ view: newView });
  }
  requestDisplay() {
    switch (this.state.view) {
      case 'categoryList':
        return this.generateCategoryList();
      case 'requestForm':
        return this.generateRequestForm();
    }
  }
  render() {
    const display = this.requestDisplay();
    return (
      <div className="container">
        <Alert />
        <Header />
        {display}
        <Footer setView={this.props.setView} />
      </div>
    );
  }
}

export default Request;
