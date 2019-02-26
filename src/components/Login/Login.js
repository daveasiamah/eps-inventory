import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Form, Icon, Input, Button, Card } from "antd";
import axios from "axios";
import bgImage from "./login-bg3.jpeg";

const FormItem = Form.Item;

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-items: center;
  padding: 100px 0 50px;
  padding-bottom: 315px;
  /* padding-top: 315px; */
  z-index: -1;
  background: no-repeat center/ 100% 100% url(${bgImage});
`;

class Login extends Component {
  state = {
    email: "",
    password: "",
    user: "",
    errors: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ errors: "Please enter email and password" });
      return;
    } else {
      this.setState({ errors: "" });
      let user = { email, password };

      // Send that product created to the server
      axios
        .post("http://localhost:5000/api/login", user)
        .then(res => {
          console.log("Success: " + JSON.stringify(res.data.success));
          this.setState({ errors: "" }, this.props.form.resetFields());
        })
        .catch(
          err => console.log(err),
          this.setState({
            errors: "Invalid login details, please check and try again."
          })
        );
    }
  };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { errors } = this.state;
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
            {errors ? (
              <div
                style={{
                  padding: "10px",
                  border: "1px #dedede solid",
                  borderRadius: "3px 3px",
                  color: "red",
                  textAlign: "left"
                }}
              >
                {errors}
              </div>
            ) : null}
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem
                label="Email"
                // help="Should be like user@domain.com"
                // validateStatus="error"
              >
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
                {/* <Checkbox>Remember me</Checkbox> */}

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
