import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Table } from "antd";

import baseServerUri from "../../utils/baseServerUri";

class StockCountReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReport: "",
      reports: []
    };
  }
  _isMounted = true;

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.fetchInventory();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchInventory = () => {
    this.setState({ loading: true });
    fetch(`${baseServerUri}/api/inventory`, { method: "GET" })
      .then(response => response.json())
      .then(report => {
        // console.log(report);
        if (this._isMounted) {
          this.setState({ loading: false, reports: report });
        }
      })
      .catch(err => console.log(err));
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });

    this.fetchInventory({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order
    });
  };

  handleReportSelect = rptId => {
    let Reports = this.state.reports;
    //Search for the current Report in state
    let currentReport = Reports.filter(rptById => rptById._id === rptId);
    this.setState({
      selectedReport: currentReport
    });
    // console.log("The selected Report is: " + JSON.stringify(currentReport));

    //Map items to get selected values
    currentReport.map(report =>
      this.setState({
        item_name: report.item_name,
        category: report.category.category_name,
        status: report.status,
        description: report.description,
        price: report.price,
        min_stock: report.min_stock
      })
    );
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            marginBottom: "100px",
            paddingLeft: "10px",
            paddingRight: "10px"
          }}
        >
          <h2>
            Stock Count Report
            <hr
              style={{
                backgroundColor: "#dedede",
                border: "none",
                height: "1px"
              }}
            />
          </h2>

          {/* <Button
            type="primary"
            onClick={this.showTable}
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              margin: "5px"
            }}
          >
            <span>
              <Icon
                style={{ fontSize: "1.5em", marginRight: "5px" }}
                type="eye"
              />
            </span>
            View Stock Count
          </Button> */}
          <Table
            style={{ backgroundColor: "#FFFF" }}
            columns={columns}
            bordered
            size={"small"}
            rowKey={"_id"}
            dataSource={this.state.reports}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

const columns = [
  {
    title: "Item Name",
    dataIndex: "item_name",
    // filters: [
    //   { text: "Male", value: "male" },
    //   { text: "Female", value: "female" }
    // ],
    // sorter: true,
    // render: name => `${name.item_name}`
    width: "30%"
  },

  {
    title: "Category",
    dataIndex: "category",

    width: "25%"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    width: "10%"
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "10%"
  }
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     width: "9%"
  //   },
  //   {
  //     title: "Date Updated",
  //     dataIndex: "updatedAt",
  //     width: "9%"
  //   },
  //   {
  //     title: "Date Created",
  //     dataIndex: "createdAt",
  //     width: "9%"
  //   }
];

StockCountReport.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(StockCountReport);
