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
        foreColor: "black"
      },
      xaxis: {
        categories: []
      },
      dataLabels: { enabled: false },
      title: {
        text: "Items In Stock Year To Date",
        align: "center",
        margin: 20,
        offsetY: 10,
        style: {
          fontFamily: "calibri",
          fontSize: "25px",
          color: "black"
        }
      }
    },
    series: [
      {
        name: "quantity",
        data: []
      }
    ]
  };

  _isMounted = true;

  //Testing with Inventory endpoint
  componentDidMount() {
    axios
      .get(`${baseServerUri}/api/inventory`)
      .then(inventory => {
        const Inventory = inventory.data;

        const ItemNames = Inventory.map(inv => inv.item_name);

        const ItemQuantity = Inventory.map(inv => inv.quantity);
        if (this._isMounted) {
          this.setState({
            options: {
              ...this.state.options,
              xaxis: {
                ...this.state.options.xaxis,
                ...this.state.options.xaxis.categories,
                categories: ItemNames
              }
            }
          });

          this.setState({
            series: [
              {
                ...this.state.series,
                data: ItemQuantity
              }
            ]
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
      <div className="charts" style={{ objectFit: "fill", padding: "5px" }}>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width="100%"
          height="500"
        />
      </div>
    );
  }
}

export default ItemsChart;
