import React, { Component } from "react";
import Chart from "react-apexcharts";

const url = "http://localhost:5000/api/items";

class ChartsMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      options: {
        data: [],
        chart: {
          foreColor: "blue"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        },
        dataLabels: { enabled: false }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  _isMounted = true;

  componentDidMount() {
    if (this._isMounted) {
      this.setState({ loading: true });
    }
    fetch(url, { method: "GET" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Oh no! Something went wrong...");
        }
      })
      .then(items => {
        // console.log(items);
        if (this._isMounted) {
          this.setState({ loading: false, data: [items.item] });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <p>Loading...</p>;
    }
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        width="100%"
        height="450"
      />
    );
  }
}
export default ChartsMain;
