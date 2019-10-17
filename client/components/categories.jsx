import React from 'react';
function Categories(props) {
  return (
    <div className="category" onClick={() => { props.select(props.id); props.changeView(props.nextView); }}>{props.name.toUpperCase()}</div>
  );
}
export default Categories;
