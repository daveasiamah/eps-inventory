import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

import baseServerUri from "../../utils/baseServerUri";

class ItemsChart extends Component {
  state = {
    options: {
      chart: {
        height: 450,
        stacked: false,
      },
      xaxis: {
        categories: [],
      },
      dataLabels: { enabled: false },
      title: {
        text: "Items In Stock Year To Date",
        align: "center",
        margin: 20,
        offsetY: 10,
        style: {
          fontSize: "20px",
        },
      },
    },
    series: [
      {
        name: "quantity",
        data: [],
      },
    ],
  };

  _isMounted = true;

  componentDidMount() {
    axios
      .get(`${baseServerUri}/api/inventory`)
      .then((inventory) => {
        const Inventory = inventory.data;

        const ItemNames = Inventory.map((inv) => inv.item_name);

        const ItemQuantity = Inventory.map((inv) => inv.quantity);
        if (this._isMounted) {
          this.setState({
            options: {
              ...this.state.options,
              xaxis: {
                ...this.state.options.xaxis,
                ...this.state.options.xaxis.categories,
                categories: ItemNames,
              },
            },
          });

          this.setState({
            series: [
              {
                ...this.state.series,
                data: ItemQuantity,
              },
            ],
          });
        }
      })
      .catch((error) => console.log(error));

    console.log(this.state.series);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        padding="20px"
        height="99%"
      />
    );
  }
}

export default ItemsChart;
