import React, { Component } from "react";
import { Button, Form, Input, Select, Card } from "antd";
import styled from "styled-components";

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
  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      description: "",
      status: ""
    };
  }

  handleCancel = e => {
    console.log(this.props.children);
  };

  handleChangeStatus = e => {
    // console.log(e);
    let status = this.state.status;
    status = e;
    this.setState({ status: e });
    console.log(status);
  };

  handleCategoryName = e => {
    console.log(e.target.value);
    this.setState({ category_name: e.target.value });
    console.log(this.state.category_name);
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleAddCategory = e => {
    e.preventDefault();
    let newCategory = { ...this.state };
    console.log(newCategory);
    console.log(`Here you go!: `, JSON.stringify(newCategory));

    // Send that product created to the server
    fetch("http://localhost:5000/api/categories", {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCategory)
    }).then(res => {
      res
        .json()
        .then(data => {
          console.log("successful" + JSON.stringify(data));
          alert("Category Created Successfully!");
          // this.state.category_name = "";
        })
        .catch(err => console.log(err));
    });

    // form.resetFields();
    // this.setState({ visible: false });
  };

  render() {
    return (
      <React.Fragment>
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
          <Card title={"Category Details"} style={{ width: 400 }}>
            <Form layout="horizontal" onSubmit={this.handleAddCategory}>
              <StyledFormItem label="Category Name:">
                <Input
                  name="category_name"
                  placeholder="Enter category name"
                  onChange={this.handleCategoryName}
                />
              </StyledFormItem>
              <StyledFormItem label="Status:">
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  // defaultValue="Enabled"
                  placeholder="Select a status"
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
              </StyledFormItem>
              <StyledFormItem label="Description:">
                <TextArea
                  name="description"
                  rows={2}
                  style={{ width: "100%", marginBottom: "0px" }}
                  onChange={this.handleDescriptionChange}
                />
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
      </React.Fragment>
    );
  }
}

export default AddCategory;
