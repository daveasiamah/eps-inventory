import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

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
        name: "prices",
        data: []
      }
    ]
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/items`)
      .then(items => {
        const Items = items.data;

        const ItemNames = Items.map(item => item.item_name);

        const ItemPrice = Items.map(item => item.price);

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
              ...this.state.series[0],
              data: ItemPrice
            }
          ]
        });

        console.log(this.state.series);
      })
      .catch(error => console.log(error));
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
