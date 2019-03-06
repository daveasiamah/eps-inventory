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
      series: [44, 55, 41, 17, 15],
      labels: ["Apple", "Mango", "Banana", "Papaya", "Orange"]
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
            options: {
              ...this.state.options,
              xaxis: {
                ...this.state.options.xaxis,
                ...this.state.options.xaxis.categories,
                categories: ItemNames
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200
                    }
                  }
                }
              ]
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
      <div className="donut" style={{ objectFit: "fill", padding: "25px" }}>
        <Chart
          options={this.state.options}
          series={this.state.series}
          labels={this.state.labels}
          type="pie"
          width="100%"
          height="500px"
        />
      </div>
    );
  }
}

export default CategoriesChart;
