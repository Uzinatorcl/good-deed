import React from 'react';
import Header from './header';
import Footer from './footer';

class Commit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      view: 'categoryList',
      fetchCompleted: false
    };
  }
  componentDidMount() {
    fetch('api/categories.php')
      .then(response => response.json())
      .then(data => {
        this.setState({ categoryList: data, fetchCompleted: true });
        console.log(data);
      })
      .catch(error => console.error(error));
  }
  generateCategoryList() {
    if (this.state.fetchCompleted === true) {
      return this.state.categoryList.map(category => {
        return <Categories key={category.category_id} id={category.category_id}name={category.name} />;
      });
    } else {
      return 'loading categories...';
    }
  }

  render() {
    const display = this.generateCategoryList();
    return (
      <div className="container">
        <Header/>
        <div className="heading">CHOOSE YOUR CATEGORY</div>
        <div className="categoryList">
          {display}
        </div>
        <Footer setView={this.props.setView}/>
      </div>
    );
  }
}
function Categories(props) {
  return (
    <div className="category">{props.name.toUpperCase()}</div>
  );
}

export default Commit;
