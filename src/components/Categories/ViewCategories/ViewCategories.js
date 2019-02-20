import React, { Component } from "react";
import { Table } from "antd";
// import { Resizable } from "react-resizable";
import { Button, Icon } from "antd";
// import styled from "styled-components";

class ViewCategories extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }
  defaultState = {
    data: [],
    pagination: {},
    loading: false
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });

    this.fetchCategories({
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

  //Fetching data from API using native 'fetch() api'.
  fetchCategories = () => {
    this.setState({ loading: true });
    fetch(`http://localhost:5000/api/categories`, { method: "GET" })
      .then(response => response.json())
      .then(categories => {
        // console.log(categories, categories.length);
        const pagination = { ...this.state.pagination };
        //Read total count from server
        pagination.total = categories.length;
        this.setState({ loading: false, data: categories, pagination });
      })
      .catch(err => console.log(err));
  };

  showTable = e => {
    e.preventDefault();
    this.fetchCategories();
    // console.log(e);
  };

  render() {
    console.table(this.state.data);
    return (
      <React.Fragment>
        <div style={{ marginBottom: "100px" }}>
          <h2>
            Categories List
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
            View Categories
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
            // onChange={this.handleTableChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

const columns = [
  {
    title: "Category Name",
    dataIndex: "category_name",
    // filters: [
    //   { text: "Male", value: "male" },
    //   { text: "Female", value: "female" }
    // ],
    // sorter: true,
    // render: name => `${name.item_name}`
    width: "30%"
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "30%"
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "10%"
  },
  {
    title: "Date Updated",
    dataIndex: "updatedAt",
    width: "15%"
  },
  {
    title: "Date Created",
    dataIndex: "createdAt",
    width: "15%"
  }
];

export default ViewCategories;