import React, { Component } from "react";
import { Button, Form, Input, InputNumber, Select, Card } from "antd";
import styled from "styled-components";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

const SFormItem = styled(FormItem)`
  margin: 2px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 100px;
`;

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_name: "",
      category: "",
      description: "",
      units: "",
      min_stock: "",
      price: "",
      status: "",
      remarks: "",
      categories: []
    };
  }

  fetchCategories = () => {
    fetch(`http://localhost:5000/api/categories`, { method: "GET" })
      .then(response => response.json())
      .then(categories => {
        // console.log(categories, categories.length);
        this.setState({ categories: categories });
      })
      .catch(err => {
        console.log(err);
        alert("Oops! Something went wrong, contact the administrator");
      });
  };

  handleItemName = e => {
    console.log(e.target.value);
    this.setState({ item_name: e.target.value });
  };

  handleDescription = e => {
    console.log(e.target.value);
    this.setState({ description: e.target.value });
  };

  handleUnits = e => {
    console.log(e.target.value);
    this.setState({ units: e.target.value });
  };

  handlePrice = value => {
    console.log(value);
    this.setState({ price: value });
  };

  handleMinStock = e => {
    // console.log(e);
    this.setState({ min_stock: e });
  };

  handleStatus = value => {
    console.log(value);
    this.setState({ status: value });
  };

  handleRemarks = e => {
    // console.log(e.target.value);
    this.setState({ remarks: e.target.value });
  };

  handleAddItem = e => {
    e.preventDefault();

    const {
      item_name,
      category,
      description,
      units,
      min_stock,
      price,
      status,
      remarks
    } = this.state;

    let newItem = {
      item_name,
      category,
      description,
      units,
      min_stock,
      price,
      status,
      remarks
    };

    // console.log(newItem);
    console.log(`Here you go!: `, JSON.stringify(newItem));

    // Send that product created to the server
    fetch("http://localhost:5000/api/items", {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      res
        .json()
        .then(data => {
          // console.log("successful" + data);
          alert("Item created successfully!");
        })
        .catch(err => console.log(err));
    });
  };

  handleCancel = e => {
    console.log(this.state);
    // this.setState({ categories: [] });
  };

  handleItemCategory = value => {
    // console.log(value);
    this.setState({ category: value });
  };

  componentDidMount() {
    this.fetchCategories();
  }

  reset = () => {
    this.props.form.resetFields();
    console.log(this.props);
  };

  render() {
    // console.log(this.props);
    const umpGrid = {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr",
      gridGap: "10px",
      padding: "0px"
    };

    const { categories } = this.state;
    return (
      <React.Fragment>
        <h2>
          Add New Item
          <hr
            style={{
              backgroundColor: "#dedede",
              border: "none",
              height: "1px"
            }}
          />
        </h2>
        <Wrapper>
          <Card title="Item Details" width="500px">
            <Form layout="horizontal" onSubmit={this.handleAddItem}>
              <SFormItem label="Item Name:">
                <Input
                  placeholder="Enter item name"
                  onChange={this.handleItemName}
                />
              </SFormItem>
              <SFormItem label="Category:">
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Select item category"
                  onChange={this.handleItemCategory}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {categories.map(category => (
                    <Option key={category._id} value={category._id}>
                      {category.category_name}
                    </Option>
                  ))}
                </Select>
              </SFormItem>
              <SFormItem label="Description:">
                <TextArea
                  rows={3}
                  onChange={this.handleDescription}
                  style={{ width: "100%", marginBottom: "0px" }}
                />
              </SFormItem>
              <div style={umpGrid}>
                <SFormItem label="Unit of Measure">
                  <Input
                    placeholder="Enter Units"
                    onChange={this.handleUnits}
                  />
                </SFormItem>
                <div>
                  <SFormItem label="Min Stock Level">
                    <InputNumber
                      min={0}
                      max={100000}
                      defaultValue={0}
                      onChange={this.handleMinStock}
                    />
                  </SFormItem>
                </div>
                <div>
                  <SFormItem label="Price">
                    <InputNumber
                      defaultValue={1000}
                      formatter={value =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={value => value.replace(/\$\s?|(,*)/g, "")}
                      onChange={this.handlePrice}
                    />
                  </SFormItem>
                </div>
              </div>
              <SFormItem label="Status:">
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  onChange={this.handleStatus}
                  placeholder="Select status"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="Enabled">Enabled</Option>
                  <Option value="Disabled">Disabled</Option>
                </Select>
              </SFormItem>
              <SFormItem label="Remarks:">
                <TextArea
                  rows={3}
                  onChange={this.handleRemarks}
                  style={{ width: "100%", marginBottom: "0px" }}
                />
              </SFormItem>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  style={{ padding: "5px 10px", margin: "10px 0px 5px 5px" }}
                  onClick={this.reset}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  style={{ padding: "5px 10px", margin: "10px 0px 5px 5px" }}
                  onClick={this.handleAddItem}
                >
                  Add Item
                </Button>
              </div>
            </Form>
          </Card>
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default AddItem;
