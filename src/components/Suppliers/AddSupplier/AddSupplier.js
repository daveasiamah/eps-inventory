import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { Button, Card, Form, Input, Row, Col, Select } from "antd";
import styled from "styled-components";
import countries from "./countries.json";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

const AntFormItem = styled(FormItem)`
  margin-bottom: 5px;
`;

class AddSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier_name: "",
      country: "",
      city: "",
      email: "",
      address: "",
      phone: "",
      remarks: "",
      status: ""
    };
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

  handleStatus = value => {
    this.setState({ status: value });
  };

  handleSupplierName = e => {
    this.setState({ supplier_name: e.target.value });
  };

  handleRemarks = e => {
    this.setState({ remarks: e.target.value });
  };

  handleCity = e => {
    this.setState({ city: e.target.value });
  };
  handleCountry = value => {
    this.setState({ country: value });
  };
  handleAddress = e => {
    this.setState({ address: e.target.value });
  };
  handleEmail = e => {
    this.setState({ email: e.target.value });
  };
  handlePhone = e => {
    this.setState({ phone: e.target.value });
  };

  handleAddSupplier = e => {
    e.preventDefault();
    if (this.state.supplier_name === "") {
      alert("Please enter Supplier name");
      return;
    }
    let newSupplier = { ...this.state };
    console.log(newSupplier);
    // console.log(`Here you go!: `, JSON.stringify(newSupplier));

    fetch("http://localhost:5000/api/suppliers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSupplier)
    }).then(res => {
      res
        .json()
        .then(data => {
          console.log("Message:" + JSON.stringify(data));
          alert("Supplier created successfully!");
        })
        .catch(err => console.log(err));
    });

    // form.resetFields();
    // this.setState({ visible: false });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
          <h2>
            Add New Supplier
            <hr
              style={{
                backgroundColor: "#dedede",
                border: "none",
                height: "1px"
              }}
            />
          </h2>
          <PageWrapper>
            <Card title="New Supplier Details" style={{ width: "50vw" }}>
              <Form layout="vertical" onSubmit={this.handleAddItem}>
                <Row gutter={8}>
                  <Col span={12}>
                    <AntFormItem label="Company Name:">
                      {getFieldDecorator("supplier_name", {
                        rules: [
                          {
                            required: true,
                            message: "Please input the supplier's company name!"
                          }
                        ]
                      })(
                        <Input
                          placeholder="Enter company name"
                          onChange={this.handleSupplierName}
                        />
                      )}
                    </AntFormItem>
                  </Col>
                  <Col span={12}>
                    <AntFormItem label="Email:">
                      {getFieldDecorator("email", {})(
                        <Input
                          placeholder="company@domain.com"
                          onChange={this.handleEmail}
                        />
                      )}
                    </AntFormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={12}>
                    <AntFormItem label="Phone Number:">
                      {getFieldDecorator("phone", {})(
                        <Input
                          placeholder="+000-000-000-000"
                          onChange={this.handlePhone}
                        />
                      )}
                    </AntFormItem>
                  </Col>
                  <Col span={12}>
                    <AntFormItem label="Address:">
                      {getFieldDecorator("address", {})(
                        <TextArea
                          rows={2}
                          style={{ width: "100%", marginBottom: "0px" }}
                          onChange={this.handleAddress}
                        />
                      )}
                    </AntFormItem>
                  </Col>
                </Row>

                <Row gutter={8}>
                  <Col span={12}>
                    <AntFormItem label="Country:">
                      {getFieldDecorator("country", {})(
                        <Select
                          style={{ width: "100%" }}
                          showSearch
                          optionFilterProp="children"
                          onChange={this.handleCountry}
                          placeholder="Select country"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {/* <Option key="1" value="Select country">
                          Select Country
                        </Option> */}
                          {countries.map(country => (
                            <Option
                              key={country.country}
                              value={country.country}
                            >
                              {country.country}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </AntFormItem>
                  </Col>
                  <Col span={12}>
                    <AntFormItem label="City:">
                      {getFieldDecorator("city", {})(
                        <Input
                          placeholder="Enter city name"
                          onChange={this.handleCity}
                        />
                      )}
                    </AntFormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={12}>
                    <AntFormItem label="Status:">
                      {getFieldDecorator("status", {})(
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
                      )}
                    </AntFormItem>
                  </Col>
                  <Col span={12}>
                    <AntFormItem label="Remarks:">
                      {getFieldDecorator("remarks", {})(
                        <TextArea
                          rows={2}
                          style={{ width: "100%", marginBottom: "0px" }}
                          onChange={this.handleRemarks}
                        />
                      )}
                    </AntFormItem>
                  </Col>
                </Row>
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
                    onClick={this.handleAddSupplier}
                  >
                    Add Supplier
                  </Button>
                  <Button
                    style={{ padding: "5px 10px", margin: "10px 0px 5px 5px" }}
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card>
          </PageWrapper>
        </div>
      </React.Fragment>
    );
  }
}

const NewSupplier = Form.create({ name: "supplier" })(AddSupplier);

AddSupplier.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(NewSupplier);
