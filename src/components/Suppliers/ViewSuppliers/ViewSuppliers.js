import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { Table, Button, Icon } from "antd";
// import { Grid, Cell } from "styled-css-grid";

class ViewSuppliers extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }
  defaultState = {
    data: [],
    pagination: {},
    loading: false
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });

    this.fetchSuppliers({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order
    });
  };
  handleReset = () => {
    this.setState(this.defaultState);
    console.log(this.defaultState);
  };

  //Fetching data from API using native 'fetch() api.
  fetchSuppliers = () => {
    this.setState({ loading: true });
    fetch(`http://localhost:5000/api/suppliers`, { method: "GET" })
      .then(response => response.json())
      .then(suppliers => {
        // console.log(suppliers, suppliers.length);
        const pagination = { ...this.state.pagination };
        //Read total count from server
        pagination.total = suppliers.length;
        this.setState({ loading: false, data: suppliers, pagination });
      })
      .catch(err => console.log(err));
  };

  showTable = e => {
    e.preventDefault();
    this.fetchSuppliers();
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ marginBottom: "100px" }}>
          <h2>
            Suppliers List
            <hr
              style={{
                backgroundColor: "#dedede",
                border: "none",
                height: "1px"
              }}
            />
          </h2>

          <Button
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
            View Suppliers
          </Button>
          <Table
            style={{ backgroundColor: "#FFFF" }}
            columns={columns}
            bordered
            size={"small"}
            rowKey={"_id"}
            dataSource={this.state.data}
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
    title: "Supplier Name",
    dataIndex: "supplier_name",
    // filters: [
    //   { text: "Male", value: "male" },
    //   { text: "Female", value: "female" }
    // ],
    // sorter: true,
    // render: name => `${name.item_name}`
    width: "15%"
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: "15%"
  },
  {
    title: "Email",
    dataIndex: "email",

    width: "10%"
  },
  {
    title: "Address",
    dataIndex: "address",
    width: "9%"
  },
  {
    title: "City",
    dataIndex: "city",
    width: "9%"
  },
  {
    title: "Remarks",
    dataIndex: "remarks",

    width: "15%"
  },
  {
    title: "Date Updated",
    dataIndex: "updatedAt",
    width: "9%"
  },
  {
    title: "Date Created",
    dataIndex: "createdAt",
    width: "9%"
  }
];

ViewSuppliers.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ViewSuppliers);
