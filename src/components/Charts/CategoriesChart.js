import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

class CategoriesChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        dataLabels: { enabled: true },
        title: {
          text: "Categories In Stock",
          align: "center",
          margin: 0,
          offsetY: 0,
          style: {
            fontFamily: "calibri",
            fontSize: "25px",
            color: "black"
          }
        }
      },
      series: [],
      labels: []
    };
  }

  _isMounted = true;

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/items`)
      .then(items => {
        const Items = items.data;

        const ItemNames = Items.map(item => item.item_name);

        const ItemPrice = Items.map(item => item.price);
        if (this._isMounted) {
          this.setState({
            series: ItemPrice
          });

          this.setState({
            labels: ItemNames
          });
        }
        // console.log(this.state.series);
      })
      .catch(error => console.log(error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="pie" style={{ objectFit: "fill", padding: "25px" }}>
        <Chart
          options={this.state.options}
          series={this.state.series}
          labels={this.state.labels}
          type="donut"
          width="100%"
          height="500px"
        />
      </div>
    );
  }
}

export default CategoriesChart;
