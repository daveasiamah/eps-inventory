import React, { Component } from "react";
import Chart from "react-apexcharts";

class CategoriesChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        dataLabels: { enabled: true },
        title: {
          text: "Categories In Stock Year To Date",
          align: "center",
          margin: 20,
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

  render() {
    return (
      <div className="donut" style={{ objectFit: "fill", padding: "5px" }}>
        <Chart
          options={this.state.options}
          series={this.state.series}
          labels={this.state.labels}
          type="pie"
          width="100%"
          height="450"
        />
      </div>
    );
  }
}

export default CategoriesChart;
