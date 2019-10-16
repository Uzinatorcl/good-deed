import React from 'react';
import Header from './header';
import Footer from './footer';
import DeedList from './deed-list';

class Commit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      deedList: [],
      view: 'categoryList',
      categoryFetchCompleted: false,
      categoryToDisplay: null,
      deedListFetchCompleted: false
    };
    this.changeCommitView = this.changeCommitView.bind(this);
    this.getDeeds = this.getDeeds.bind(this);
  }
  componentDidMount() {
    fetch('api/categories.php')
      .then(response => response.json())
      .then(data => {
        this.setState({ categoryList: data, categoryFetchCompleted: true });
      })
      .catch(error => console.error(error));
  }
  getDeeds(categoryId) {
    fetch(`api/deeds.php?id=${categoryId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ deedList: data, deedListFetchCompleted: true });
      })
      .catch(error => console.error(error));
  }
  generateCategoryList() {
    if (this.state.categoryFetchCompleted) {
      return (
        <>
        <div className="heading">CHOOSE YOUR CATEGORY</div>
        <div className="categoryList">
          {this.state.categoryList.map(category => {
            return <Categories key={category.category_id} id={category.category_id} name={category.name} changeView={this.changeCommitView} select={this.getDeeds}/>;
          })}
        </div>
      </>
      );
    } else {
      return 'loading categories...';
    }
  }
  generateDeedList() {
    if (this.state.deedListFetchCompleted) {
      return (
        <div className="deedListContainer">
          {this.state.deedList.map(deed => {
            return <DeedList key ={deed.request_id}headline={deed.headline} image_url={deed.image_url}/>;
          })}
        </div>
      );
    } else {
      return 'loading deeds...';
    }
  }
  changeCommitView(newView) {
    this.setState({ view: newView });
  }
  commitDisplay() {
    const display = this.state.view === 'categoryList' ? this.generateCategoryList() : this.generateDeedList();
    return display;
  }
  render() {
    const display = this.commitDisplay();
    return (
      <div className="container">
        <Header />
        {display}
        <Footer setView={this.props.setView} />
      </div>
    );
  }
}
function Categories(props) {
  return (
    <div className="category" onClick={() => { props.select(props.id); props.changeView('deeds'); } }>{props.name.toUpperCase()}</div>
  );
}

export default Commit;
