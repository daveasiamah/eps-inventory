import React, { Component } from "react";
import Chart from "react-apexcharts";

class ItemsChart extends Component {
  state = {
    options: {
      chart: {
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
    fetch(`http://localhost:5000/api/items`, { method: "GET" })
      .then(response => response.json())
      .then(items => {
        // console.log(items);
        let item = items.map(item => item.item_name);
        console.log(item);
        this.setState({
          options: {
            ...this.state.options,
            xaxis: {
              ...this.state.options.xaxis,
              ...this.state.options.xaxis.categories,
              categories: item
            }
          }
        });

        let prices = items.map(price => price.price);
        const results = Object.keys(prices).map(
          price => prices[price],
          console.log(prices)
        );
        console.log(typeof prices);
        console.log("Converted result is: " + typeof results);
        //TODO: Populate series with result of prices from api data
        // this.setState({
        //   series: {
        //     ...this.state.series,
        //     series: [results]
        //   }
        // });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="pie-chart" style={{ objectFit: "fill", padding: "5px" }}>
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
