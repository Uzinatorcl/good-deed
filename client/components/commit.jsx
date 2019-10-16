import React from 'react';
import Header from './header';
import Footer from './footer';

class Commit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      deedList: [],
      view: 'categoryList',
      categoryFetchCompleted: false,
      categoryToDisplay: null
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
        this.setState({ deedList: data });
      })
      .catch(error => console.error(error));
  }
  generateCategoryList() {
    if (this.state.categoryFetchCompleted === true) {
      return this.state.categoryList.map(category => {
        return <Categories key={category.category_id} id={category.category_id} name={category.name} changeView={this.changeCommitView} select={this.getDeeds}/>;
      });
    } else {
      return 'loading categories...';
    }
  }
  changeCommitView(newView, newCategory) {
    this.setState({ view: newView, categoryToDisplay: newCategory });
  }
  commitDisplay() {
    const display = this.generateCategoryList();
    if (this.state.categoryToDisplay === null) {
      return (
        <>
          <div className="heading">CHOOSE YOUR CATEGORY</div>
          <div className="categoryList">
            {display}
          </div>
        </>
      );
    } else {
      return (
        null
      );
    }
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
    <div className="category" onClick={() => { props.select(props.id); } }>{props.name.toUpperCase()}</div>
  );
}

export default Commit;
