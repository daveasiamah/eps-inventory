import React, { Component } from "react";
import { Table, Button, Icon } from "antd";
// import { Resizable } from "react-resizable";

class ViewItems extends Component {
  defaultState = {
    data: [],
    pagination: {},
    loading: false
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });

    this.fetchItems({
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

  fetchItems = () => {
    this.setState({ loading: true });
    fetch(`http://localhost:5000/api/items`, { method: "GET" })
      .then(response => response.json())
      .then(items => {
        // console.log(items, items.length);
        const pagination = { ...this.state.pagination };
        //Read total count from server
        pagination.total = items.length;
        this.setState({ loading: false, data: items, pagination });
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(`Oops! Server offline... Please check and try again!`);
        console.log(`Check server status ${err}`);
      });
  };

  showTable = e => {
    e.preventDefault();
    this.fetchItems();
    console.log(e);
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ marginBottom: "100px" }}>
          <h2>
            Items List
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
            View Items
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
    title: "Item Name",
    dataIndex: "item_name",
    // filters: [
    //   { text: "Male", value: "male" },
    //   { text: "Female", value: "female" }
    // ],
    // sorter: true,
    // render: name => `${name.item_name}`
    width: "15%"
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "15%"
  },
  {
    title: "Category",
    dataIndex: "category_id",

    width: "10%"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    width: "9%"
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "9%"
  },
  {
    title: "Status",
    dataIndex: "status",
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

export default ViewItems;
