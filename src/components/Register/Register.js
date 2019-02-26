import React, { Component } from "react";
import { Form, Icon, Input, Button, Card } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import styled from "styled-components";

const FormItem = Form.Item;

const SFormItem = styled(FormItem)`
  margin: 2px;
`;

const RegisterPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0 50px;
  padding-bottom: 300px;
  /* background: #f0f2f5; */
  z-index: -1;
  background: none;
`;
class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleRegister = e => {
    e.preventDefault();

    const { name, email, password } = this.state;
    if (!email || !password || !name) {
      this.setState({ errors: "Please fill all fields." });
      return;
    } else {
      let newUser = { name, email, password };

      console.log(`User created as: `, JSON.stringify(newUser));
      console.log(this.state.errors);

      this.props.registerUser(newUser, this.props.history);

      // Send that user created to the server
    }
    // const { resetFields } = this.props.form;
    // resetFields();
  };

  handleName = e => {
    this.setState({ name: e.target.value });
  };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { errors } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <RegisterPage>
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
          <Form onSubmit={this.handleRegister} className="registration-form">
            <SFormItem label="Full Name">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your name!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Enter full name"
                  onChange={this.handleName}
                />
              )}
            </SFormItem>
            <SFormItem label="Email">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not a valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="email"
                  placeholder="Enter Email"
                  onChange={this.handleEmail}
                />
              )}
            </SFormItem>
            <SFormItem label="Password">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please enter a password"
                  }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.handlePassword}
                />
              )}
            </SFormItem>
            <SFormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
                style={{ width: "100%", height: "45px", marginTop: "10px" }}
              >
                Register
              </Button>
              Or{" "}
              <NavLink to="/login" exact>
                LogIn
              </NavLink>
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
      </RegisterPage>
    );
  }
}

const UserRegistration = Form.create({ name: "register" })(Register);

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(UserRegistration));
