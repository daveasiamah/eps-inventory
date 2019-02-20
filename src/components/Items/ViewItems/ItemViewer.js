import React, { Component } from "react";

class ItemViewer extends Component {
  state = {
    items: [],
    selectedTeam: "",
    validationError: ""
  };

  componentDidMount() {
    fetch("http://localhost:5000/api/items")
      .then(response => {
        return response.json();
      })
      .then(data => {
        let itemsFromApi = data.map(item => {
          return { value: item, display: item };
        });
        this.setState({
          items: [{ value: "", display: "(Select item)" }].concat(itemsFromApi)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <select
          value={this.state.selectedTeam}
          onChange={e =>
            this.setState({
              selectedTeam: e.target.value,
              validationError:
                e.target.value === ""
                  ? "You must select your favourite item"
                  : ""
            })
          }
        >
          {this.state.items.map(item => (
            <option key={item.value} value={item.value}>
              {item.display}
            </option>
          ))}
        </select>
        <div style={{ color: "red", marginTop: "5px" }}>
          {this.state.validationError}
        </div>
      </div>
    );
  }
}

export default ItemViewer;
