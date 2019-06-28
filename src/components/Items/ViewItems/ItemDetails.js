import React, { Component } from "react";

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: []
    };
  }
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <h1>Item Details Page</h1>
      </React.Fragment>
    );
  }
}

export default ItemDetails;
