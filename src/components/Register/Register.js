import React, { Component } from "react";
import { Form, Icon, Input, Button, Card } from "antd";
import { NavLink } from "react-router-dom";
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
  padding-bottom: 100px;
  background: #f0f2f5;
`;
class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    error: ""
  };

  handleRegister = e => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;
    if (!email || !password || !name) {
      alert("Please enter email and password");
      return;
    } else {
      let user = { name, email, password, password2 };

      // console.log(user);
      console.log(`Here you go!: `, JSON.stringify(user));

      //   // Send that product created to the server
      //   fetch("http://localhost:5000/api/users", {
      //     method: "POST",
      //     body: JSON.stringify(user),
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json"
      //     }
      //   }).then(res => {
      //     res
      //       .json()
      //       .then(data => {
      //         console.log("successful" + data);
      //         alert("Item created successfully!");
      //       })
      //       .catch(err => console.log(err));
      //   });
    }
  };

  handleName = e => {
    console.log(e.target.value);
    this.setState({ name: e.target.value });
  };
  handleEmail = e => {
    console.log(e.target.value);
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    console.log(e.target.value);
    this.setState({ password: e.target.value });
  };
  handlePasswordConfirm = e => {
    console.log(e.target.value);
    this.setState({ password2: e.target.value });
  };

  render() {
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
            opacity: 1.35,
            borderTop: "3px solid #40A9FF"
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1>
              Register User
              <hr
                style={{
                  backgroundColor: "#dedede",
                  border: "none",
                  height: "1px"
                }}
              />
            </h1>
          </div>
          <Form onSubmit={this.handleRegister} className="registration-form">
            <SFormItem label="Full Name">
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Enter full name"
                onChange={this.handleName}
              />
            </SFormItem>
            <SFormItem label="Email">
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Enter Email"
                onChange={this.handleEmail}
              />
            </SFormItem>
            <SFormItem label="Password">
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Enter Password"
                onChange={this.handlePassword}
              />
            </SFormItem>
            <SFormItem label="Confirm Password">
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Confirm password"
                onChange={this.handlePasswordConfirm}
              />
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
            </SFormItem>
          </Form>
        </Card>
      </RegisterPage>
    );
  }
}
export default Register;
