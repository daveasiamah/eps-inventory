import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Button, Form, Input, InputNumber, Select, Card } from "antd";
import styled from "styled-components";

import baseServerUri from "../../../utils/baseServerUri";

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
  padding-left: 10px;
  padding-right: 10px;
`;

class AddItem extends Component {
  defaultState = {
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
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }
  _isMounted = true;

  fetchCategories = () => {
    fetch(`${baseServerUri}/api/categories`, { method: "GET" })
      .then(response => response.json())
      .then(categories => {
        // console.log(categories, categories.length);
        if (this._isMounted) {
          this.setState({ categories: categories });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleReset = () => {
    this.setState(this.defaultState);
  };

  handleItemName = e => {
    this.setState({ item_name: e.target.value });
  };

  handleDescription = e => {
    this.setState({ description: e.target.value });
  };

  handleUnits = e => {
    this.setState({ units: e.target.value });
  };

  handlePrice = value => {
    this.setState({ price: value });
  };

  handleMinStock = e => {
    this.setState({ min_stock: e });
  };

  handleStatus = value => {
    this.setState({ status: value });
  };

  handleRemarks = e => {
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
    if (
      item_name !== "" &&
      category !== "" &&
      description !== "" &&
      min_stock !== "" &&
      price !== "" &&
      status !== "" &&
      remarks !== ""
    ) {
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

      // Send that product created to the server
      fetch(`${baseServerUri}/api/items`, {
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
            this.props.form.resetFields();
            alert("Item Created.");
          })
          .catch(err => {
            alert(`Please check:${err.Error.errmsg}`);
            console.log(err.errmsg);
          });
      });
    }
    // else {
    //   alert("Please fill all required fields.");
    //   return;
    // }
  };

  handleCancel = e => {
    e.preventDefault();
    this.props.form.resetFields();
  };

  handleItemCategory = value => {
    this.setState({ category: value });
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.fetchCategories();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const umpGrid = {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr",
      gridGap: "10px",
      padding: "0px"
    };
    const { getFieldDecorator } = this.props.form;
    const { categories } = this.state;
    return (
      <React.Fragment>
        <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
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
            {/* <Card title="Item Details" width="500px"> */}

            <Card
              bordered={true}
              style={{
                width: 500,
                borderRadius: "7px",
                zIndex: 99,
                opacity: 1,
                borderTop: "3px solid #40A9FF"
              }}
            >
              <h2 style={{ textAlign: "center" }}>Item Details</h2>
              <Form layout="horizontal" onSubmit={this.handleAddItem}>
                <SFormItem label="Item Name:">
                  {getFieldDecorator("item", {
                    rules: [
                      { required: true, message: "Please enter item name." }
                    ]
                  })(
                    <Input
                      placeholder="Enter item name"
                      onChange={this.handleItemName}
                    />
                  )}
                </SFormItem>
                <SFormItem label="Category:">
                  {getFieldDecorator("category", {})(
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
                  )}
                </SFormItem>
                <SFormItem label="Description:">
                  {getFieldDecorator("description", {})(
                    <TextArea
                      rows={3}
                      onChange={this.handleDescription}
                      style={{ width: "100%", marginBottom: "0px" }}
                    />
                  )}
                </SFormItem>
                <div style={umpGrid}>
                  <SFormItem label="Unit of Measure">
                    {getFieldDecorator("uom", {})(
                      <Input
                        placeholder="Enter Units"
                        onChange={this.handleUnits}
                      />
                    )}
                  </SFormItem>
                  <div>
                    <SFormItem label="Min Stock Level">
                      {getFieldDecorator("min_stock", {})(
                        <InputNumber
                          min={0}
                          max={100000}
                          // defaultValue={0}
                          onChange={this.handleMinStock}
                        />
                      )}
                    </SFormItem>
                  </div>
                  <div>
                    <SFormItem label="Price">
                      {getFieldDecorator("price", {})(
                        <InputNumber
                          min={0}
                          formatter={value =>
                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={value => value.replace(/\$\s?|(,*)/g, "")}
                          onChange={this.handlePrice}
                        />
                      )}
                    </SFormItem>
                  </div>
                </div>
                <SFormItem label="Status:">
                  {getFieldDecorator("status", {})(
                    <Select
                      showSearch
                      allowClear
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
                  )}
                </SFormItem>
                <SFormItem label="Remarks:">
                  {getFieldDecorator("remarks", {})(
                    <TextArea
                      rows={3}
                      onChange={this.handleRemarks}
                      style={{ width: "100%", marginBottom: "0px" }}
                    />
                  )}
                </SFormItem>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                  }}
                >
                  <Button
                    type="primary"
                    style={{ padding: "5px 10px", margin: "10px 0px 5px 5px" }}
                    onClick={this.handleAddItem}
                  >
                    Add Item
                  </Button>
                  <Button
                    style={{ padding: "5px 10px", margin: "10px 0px 5px 5px" }}
                    // onClick={this.handleCancel}
                    onClick={e => {
                      e.preventDefault();
                      this.props.form.resetFields();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card>
          </Wrapper>
        </div>
      </React.Fragment>
    );
  }
}

const NewItem = Form.create({ name: "addItem" })(AddItem);

NewItem.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NewItem);
