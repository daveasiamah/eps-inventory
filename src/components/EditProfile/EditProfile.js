import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Card, Select } from "antd";
import { withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import styled from "styled-components";

const FormItem = Form.Item;
const Option = Select.Option;

const SFormItem = styled(FormItem)`
  margin: 2px;
`;
const SInput = styled(Input)`
  /* border-radius: 3px; */
`;

const SSelect = styled(Select)`
  border-radius: 3px;
`;

const EditProfilePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0 50px;
  padding-bottom: 300px;
  /* background: #f0f2f5; */
  z-index: -1;
  background: none;
`;

class EditProfile extends Component {
  state = {
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    errors: {}
  };

  componentDidMount() {
    // if (!this.props.auth.isAuthenticated) {
    //   this.props.history.push("/login");
    // }
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      //If profile doesn't exist, make empty string
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.status = !isEmpty(profile.status) ? profile.status : "";

      //Set component state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status
      });
    }
  }

  handleProfile = e => {
    e.preventDefault();

    const { handle, company, website, location, status } = this.state;
    if (!handle) {
      this.setState({ errors: this.props.errors });
      // console.log(this.state.errors);
      return;
    } else {
      let profileData = { handle, company, website, location, status };
      console.log(`Profile edited: `, JSON.stringify(profileData));

      // Send the profile created to the server
      this.props.createProfile(profileData, this.props.history);
    }
  };

  handleUserHandle = e => {
    // this.props.form.setFieldsValue({
    //   handle: e.target.value
    // });
    // console.log(this.state.handle);
    this.setState({ handle: e.target.value });
  };

  handleCompany = e => {
    this.setState({ company: e.target.value });
  };

  handleWebsite = e => {
    this.setState({ website: e.target.value });
  };
  handleLocation = e => {
    this.setState({ location: e.target.value });
  };
  handleStatus = value => {
    this.setState({ status: value });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    // const { errors } = this.state;
    // const { getFieldDecorator } = this.props.form;
    return (
      <EditProfilePage>
        {/* <div>{this.state.errors}</div> */}
        <Card
          bordered={true}
          style={{
            width: 420,
            borderTopLeftRadius: "7px",
            borderTopRightRadius: "7px",
            borderBottomLeftRadius: "7px",
            borderBottomRightRadius: "7px",
            zIndex: 99,
            opacity: 1,
            borderTop: "3px solid #40A9FF"
          }}
        >
          <h1 style={{ textAlign: "center" }}>Edit Profile</h1>
          <Form onSubmit={this.handleProfile}>
            {/* <div>
              {errors.handle}
              {errors.company}
              {errors.website}
            </div> */}
            <SFormItem label="Handle">
              {/* {getFieldDecorator("handle", {
                // getValueFromEvent: this.handleUserHandle,
                initialValue: this.state.handle,
                onChange: this.handleUserHandle,
                rules: [
                  {
                    required: true,
                    message: "Please input your handle!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Enter handle"
                  //   onChange={this.handleUserHandle}
                />
              )} */}
              <SInput
                value={this.state.handle}
                onChange={this.handleUserHandle}
                placeholder="Enter handle"
                name="handle"
              />
            </SFormItem>
            <SFormItem label="Company">
              {/* {getFieldDecorator("company", {
                initialValue: this.state.company,
                rules: [
                {
                  type: "company",
                  message: "The input is not a valid E-mail!"
                },
                  {
                    required: true,
                    message: "Please input your company!"
                  }
                ]
              })( */}
              <SInput
                prefix={
                  <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="company"
                placeholder="Enter company"
                value={this.state.company}
                onChange={this.handleCompany}
              />
              {/* )} */}
            </SFormItem>
            <SFormItem label="Website">
              {/* {getFieldDecorator("website", {
                initialValue: this.state.website,
                rules: [
                  {
                    required: true,
                    message: "Please enter a website"
                  }
                ]
              })( */}
              <SInput
                prefix={
                  <Icon type="global" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="website"
                value={this.state.website}
                placeholder="Enter website"
                onChange={this.handleWebsite}
              />
              {/* )} */}
            </SFormItem>
            <SFormItem label="Location">
              {/* {getFieldDecorator("location", {
                initialValue: this.state.location,
                rules: [
                  {
                    required: true,
                    message: "Please enter a location"
                  }
                ]
              })( */}
              <Input
                prefix={
                  <Icon
                    type="environment"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                type="location"
                value={this.state.location}
                placeholder="Enter location"
                onChange={this.handleLocation}
              />
              {/* )} */}
            </SFormItem>
            <SFormItem label="Status:">
              {/* {getFieldDecorator("status", {
                initialValue: this.state.status
              })( */}
              <SSelect
                //   showSearch
                style={{ width: "100%" }}
                placeholder="Select status"
                //   optionFilterProp="children"
                //   optionLabelProp="value"
                value={this.state.status}
                onChange={this.handleStatus}
                //   filterOption={(input, option) =>
                //     option.props.children
                //       .toLowerCase()
                //       .indexOf(input.toLowerCase()) >= 0
                //   }
              >
                <Option value="Enabled">Enabled</Option>
                <Option value="Disabled">Disabled</Option>
              </SSelect>
              {/* )} */}
            </SFormItem>
            <SFormItem>
              <Button
                type="primary"
                onClick={this.handleProfile}
                style={{ width: "100%", height: "45px", marginTop: "10px" }}
              >
                Save Profile
              </Button>
              <span style={{ padding: "10px", float: "right" }}>
                <Button
                  onClick={e => {
                    e.preventDefault();
                    this.props.form.resetFields();
                  }}
                >
                  Clear
                </Button>
              </span>
            </SFormItem>
          </Form>
        </Card>
      </EditProfilePage>
    );
  }
}

const NewProfile = Form.create({ name: "profile" })(EditProfile);

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(NewProfile));
