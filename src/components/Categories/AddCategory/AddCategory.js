import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Button, Form, Input, Select, Card } from "antd";
import styled from "styled-components";

import baseServerUri from "../../../utils/baseServerUri";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

//Styling ant design components
const StyledFormItem = styled(FormItem)`
  margin: 5px;
`;

const StyledButton = styled(Button)`
  padding-top: 15px;
`;

// const InfoMessage = styled.div`
//   width: 200px;
//   border: 1px solid #cecece;
//   border-radius: 3px;
//   padding: 5px;
//   text-align: center;
// `;

const StyledPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 100px;
`;

class AddCategory extends Component {
  defaultState = {
    category_name: "",
    description: "",
    status: ""
  };
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  handleCancel = e => {
    e.preventDefault();
    this.props.form.resetFields();
  };

  handleChangeStatus = value => {
    this.setState({ status: value });
  };

  handleCategoryName = e => {
    this.setState({ category_name: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleAddCategory = e => {
    e.preventDefault();
    let newCategory = { ...this.state };
    if (
      newCategory.category_name !== "" &&
      newCategory.status.status !== "" &&
      newCategory.description !== ""
    ) {
      fetch(`${baseServerUri}/api/categories`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCategory)
      }).then(res => {
        res
          .json()
          .then(() => {
            this.props.form.resetFields();
            alert("Category Created Successfully!"); //TODO:Replace with toast
            this.setState(this.defaultState);
          })
          .catch(err => console.log(err));
      });
    } else {
      alert("Please fill all required fields.");
      return;
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <h2>
            Add New Category
            <hr
              style={{
                backgroundColor: "#dedede",
                border: "none",
                height: "1px"
              }}
            />
          </h2>
          <StyledPage>
            {/* <Card title={"Category Details"} style={{ width: 400 }}> */}

            <Card
              bordered={true}
              style={{
                width: 420,
                borderRadius: "7px",
                zIndex: 99,
                opacity: 1,
                borderTop: "3px solid #40A9FF"
              }}
            >
              <h2 style={{ textAlign: "center" }}>Category Details</h2>
              <Form layout="horizontal" onSubmit={this.handleAddCategory}>
                <StyledFormItem label="Category Name:">
                  {getFieldDecorator("category", {
                    rules: [
                      { required: true, message: "Please enter category name." }
                    ]
                  })(
                    <Input
                      name="category_name"
                      placeholder="Enter category name"
                      onChange={this.handleCategoryName}
                    />
                  )}
                </StyledFormItem>
                <StyledFormItem label="Status:">
                  {getFieldDecorator("status", {
                    rules: [
                      { required: true, message: "Please select status." }
                    ]
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      // defaultValue="Enabled"
                      placeholder="Select status"
                      optionFilterProp="children"
                      optionLabelProp="value"
                      onChange={this.handleChangeStatus}
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
                </StyledFormItem>
                <StyledFormItem label="Description:">
                  {getFieldDecorator("description", {
                    rules: [
                      { required: true, message: "Please add a description" }
                    ]
                  })(
                    <TextArea
                      name="description"
                      rows={4}
                      style={{ width: "100%", marginBottom: "0px" }}
                      onChange={this.handleDescriptionChange}
                    />
                  )}
                </StyledFormItem>
              </Form>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end"
                }}
              >
                <StyledButton
                  style={{ padding: "5px 10px", margin: "5px" }}
                  type="primary"
                  onClick={this.handleAddCategory}
                >
                  Add Category
                </StyledButton>
                <StyledButton
                  style={{ padding: "5px 10px", margin: "5px" }}
                  onClick={this.handleCancel}
                >
                  Cancel
                </StyledButton>
              </div>
            </Card>
          </StyledPage>
        </div>
      </React.Fragment>
    );
  }
}

const NewCategory = Form.create({ name: "addcategory" })(AddCategory);

NewCategory.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NewCategory);
