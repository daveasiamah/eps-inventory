import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Card, Select } from "antd";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import styled from "styled-components";

const FormItem = Form.Item;
const Option = Select.Option;

const SFormItem = styled(FormItem)`
  margin: 2px;
`;

const ProfilePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0 50px;
  padding-bottom: 300px;
  /* background: #f0f2f5; */
  z-index: -1;
  background: none;
`;
class Profile extends Component {
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
    // console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
      console.log(`Profile created: `, JSON.stringify(profileData));

      // Send the profile created to the server
      this.props.createProfile(profileData, this.props.history);
    }
  };

  handleUserHandle = e => {
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
    const { getFieldDecorator } = this.props.form;

    return (
      <ProfilePage>
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
          <h1 style={{ textAlign: "center" }}>Create Profile</h1>
          <Form onSubmit={this.handleProfile}>
            {/* <div>
              {errors.handle}
              {errors.company}
              {errors.website}
            </div> */}
            <SFormItem label="Handle">
              {getFieldDecorator("handle", {
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
                  onChange={this.handleUserHandle}
                />
              )}
            </SFormItem>
            <SFormItem label="Company">
              {getFieldDecorator("company", {
                // rules: [
                // {
                //   type: "company",
                //   message: "The input is not a valid E-mail!"
                // },
                //   {
                //     required: true,
                //     message: "Please input your company!"
                //   }
                // ]
              })(
                <Input
                  prefix={
                    <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="company"
                  placeholder="Enter company"
                  onChange={this.handleCompany}
                />
              )}
            </SFormItem>
            <SFormItem label="Website">
              {getFieldDecorator("website", {
                // rules: [
                //   {
                //     required: true,
                //     message: "Please enter a website"
                //   }
                // ]
              })(
                <Input
                  prefix={
                    <Icon type="global" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="website"
                  placeholder="Enter website"
                  onChange={this.handleWebsite}
                />
              )}
            </SFormItem>
            <SFormItem label="Location">
              {getFieldDecorator("location", {
                // rules: [
                //   {
                //     required: true,
                //     message: "Please enter a location"
                //   }
                // ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="environment"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  type="location"
                  placeholder="Enter location"
                  onChange={this.handleLocation}
                />
              )}
            </SFormItem>
            <SFormItem label="Status:">
              {getFieldDecorator("status", {})(
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select status"
                  optionFilterProp="children"
                  optionLabelProp="value"
                  onChange={this.handleStatus}
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
            <SFormItem>
              <Button
                type="primary"
                onClick={this.handleProfile}
                style={{ width: "100%", height: "45px", marginTop: "10px" }}
              >
                Create Profile
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
      </ProfilePage>
    );
  }
}

const NewProfile = Form.create({ name: "profile" })(Profile);

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(NewProfile));
