import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Card } from "antd";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import bgImage from "./login-bg3.jpeg";
// import bgImage from "./datacenter.jpg";

const FormItem = Form.Item;

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0 50px;
  padding-bottom: 100px;
  background: no-repeat center/ 100% 100% url(${bgImage});

  z-index: -1;
`;

class Login extends Component {
  state = {
    email: "",
    password: "",
    user: ""
    // isNavBarHidden: null
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    } else {
      let user = { email, password };

      // console.log(user);
      console.log(`Here you go!: `, JSON.stringify(user));

      // Send that product created to the server
      fetch("http://localhost:5000/api/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(res => {
        res
          .json()
          .then(data => {
            console.log("successful" + JSON.stringify(data));
            alert("Login Successfull!");
          })
          .catch(err => console.log(err));
      });
    }
  };

  handleEmail = e => {
    console.log(e.target.value);
    this.setState({ email: e.target.value });
  };
  handlePassword = e => {
    console.log(e.target.value);
    this.setState({ password: e.target.value });
  };
  handleRegister = e => {
    alert("Please contact the developer!");
    console.log("User registration");
  };

  // componentDidMount() {
  //   this.setState({ isNavBarHidden: true });
  // }

  render() {
    return (
      <React.Fragment>
        {/* <h2>
          Account Login
          <hr
            style={{
              backgroundColor: "#dedede",
              border: "none",
              height: "1px"
            }}
          />
        </h2> */}
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
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h1>
                Login EPS-IMS
                <hr
                  style={{
                    backgroundColor: "#dedede",
                    border: "none",
                    height: "1px"
                  }}
                />
              </h1>
            </div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem
                label="Email"
                // help="Should be like user@domain.com"
                // validateStatus="error"
              >
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Enter Email"
                  onChange={this.handleEmail}
                />
              </FormItem>
              <FormItem
                label="Password"
                // help="Should be alpha numeric 8 characters or more."
                // validateStatus="error"
              >
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.handlePassword}
                />
              </FormItem>
              <FormItem>
                <Checkbox>Remember me</Checkbox>
                <a
                  className="login-form-forgot"
                  href="#Login"
                  style={{ float: "right" }}
                >
                  Forgot password
                </a>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100%", height: "45px" }}
                >
                  Log in
                </Button>
                Or{" "}
                <NavLink to="/register" exact>
                  Register User
                </NavLink>
              </FormItem>
            </Form>
          </Card>
        </LoginPage>
      </React.Fragment>
    );
  }
}

export default Login;
