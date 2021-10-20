import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

import baseServerUri from "../../utils/baseServerUri";

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
            fontSize: "20px",
          },
        },
      },
      series: [],
      labels: [],
    };
  }

  _isMounted = true;

  componentDidMount() {
    axios
      .get(`${baseServerUri}/api/inventory`)
      .then((items) => {
        const Items = items.data;
        console.log(items.data);
        const categoryNames = Items.map((item) => item.category);

        const ItemPrice = Items.map((item) => item.price);
        if (this._isMounted) {
          this.setState({
            series: ItemPrice,
            labels: categoryNames,
          });

          // this.setState({
          //   labels: categoryNames,
          // });
        }
      })
      .catch((error) => console.log(error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        labels={this.state.labels}
        type="donut"
        padding="20px"
        height="99%"
      />
    );
  }
}

export default CategoriesChart;
