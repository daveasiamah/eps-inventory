import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Form, Icon, Input, Button, Card, Alert } from "antd";

import bgImage from "./login-bg3.jpeg";
import isEmpty from "../../validation/is-empty";
import { CLEAR_ERRORS, CLEANUP_MESSAGES } from "../../actions/types";

const FormItem = Form.Item;

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  background: url(${bgImage});
  background-size: cover;
  height: 99vh;
`;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      visible: false,
      errors: {}
    };
    this.handleClose = () => {
      return this.setState({ visible: false });
    };
  }

  //Redirect to Dashboard if already logged in
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillUnmount() {
    this.setState({ errors: null });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
      // console.log(this.props);
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleLogin = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
    this.setState({ errors: this.props.errors.errors });
    // console.log(this.props.errors);

    if (!isEmpty(this.state.email, this.state.password)) {
      const userData = {
        email: this.state.email,
        password: this.state.password
      };

      if (!isEmpty(this.props.loginUser(userData, this.props.history))) {
        this.setState({ errors: this.props.errors.errors });
      }
    } else {
      if (isEmpty(this.state.email, this.state.password)) {
        this.setState({ errors: this.props.errors.errors });
        // console.log(this.state.errors);
      }
      let error = this.props.errors;
      this.setState({ errors: error.errors });
    }
  };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <LoginPage>
          <Card
            bordered={true}
            style={{
              width: 420,
              borderTopLeftRadius: "7px",
              borderTopRightRadius: "7px",
              borderBottomLeftRadius: "7px",
              borderBottomRightRadius: "7px",
              zIndex: 99,
              opacity: 1.35,
              borderTop: "3px solid #40A9FF"
            }}
          >
            <h1 style={{ textAlign: "center" }}>Login EPS-IMS</h1>
            <Form onSubmit={this.handleLogin} className="login-form">
              {this.props.errors.errors ? (
                this.state.visible ? (
                  <Alert
                    message={this.props.errors.errors}
                    type="error"
                    closable
                    afterClose={this.handleClose}
                  />
                ) : null
              ) : null}
              <FormItem label="Email">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not a valid Email!"
                    },
                    {
                      required: true,
                      message: "Please enter your email"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Email"
                    onChange={this.handleEmail}
                  />
                )}
              </FormItem>
              <FormItem label="Password">
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please enter your password" }
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
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100%", height: "45px" }}
                >
                  Log in
                </Button>
                <a
                  className="login-form-forgot"
                  href="/login"
                  style={{ float: "right" }}
                >
                  Forgot password
                </a>
                {/* Or{" "}
                <NavLink to="/register" exact>
                  Register User
                </NavLink> */}
              </FormItem>
            </Form>
          </Card>
        </LoginPage>
      </React.Fragment>
    );
  }
}

const UserLogin = Form.create({ name: "login" })(Login);

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(UserLogin);
