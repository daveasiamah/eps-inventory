/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import Menu from "antd/lib/menu";
import Icon from "antd/lib/icon";
import { Avatar } from "antd";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import styled from "styled-components";
// import MenuItem from "antd/lib/menu/MenuItem";
// import Login from "../Login/Login";

const StyledMenu = styled(Menu)`
  width: 100%;
`;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component {
  handleLogout = e => {
    e.preventDefault();

    this.props.logoutUser();
    this.props.history.push("/login");
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    // console.log(this.props);
    return (
      <React.Fragment>
        <h2>EPS-Inventory Management System v1.0</h2>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <StyledMenu mode="horizontal" theme="light">
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="database" />
                  File
                </span>
              }
            >
              <MenuItemGroup>
                <Menu.Item key="user">
                  <Icon type="idcard" />
                  User
                </Menu.Item>
                <Menu.Item key="print">
                  <Icon type="printer" />
                  Print
                </Menu.Item>
                <SubMenu
                  title={
                    <span className="submenu-title-wrapper">
                      <Icon type="setting" />
                      Options
                    </span>
                  }
                >
                  <MenuItemGroup>
                    <Menu.Item key="user-setup">User Setup</Menu.Item>
                    <Menu.Item key="company-profile-setup">
                      Company Profile Setup
                    </Menu.Item>
                  </MenuItemGroup>
                  <MenuItemGroup>
                    <Menu.Item key="preferences">Preferences</Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="gold" />
                  Inventory
                </span>
              }
            >
              <MenuItemGroup>
                <Menu.Item key="stock">
                  <NavLink to="/inventory/receive-stock/" exact>
                    <Icon type="code-sandbox" />
                    Receive Stock
                  </NavLink>
                </Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup>
                <Menu.Item key="transfer">
                  <Icon type="swap" />
                  Transfer Stock
                </Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup>
                <Menu.Item key="re-order">
                  <Icon type="redo" />
                  Re-order
                </Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="setting" />
                  Setup
                </span>
              }
            >
              <MenuItemGroup>
                <SubMenu
                  title={
                    <span className="submenu-title-wrapper">
                      <Icon type="gold" />
                      Category
                    </span>
                  }
                >
                  <Menu.Item key="add-cat">
                    <NavLink to="/categories/add/category/" exact>
                      <Icon type="plus" />
                      Add Category
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="view-categories">
                    <NavLink to="/categories/view/categories/" exact>
                      <Icon type="eye" />
                      View Categories
                    </NavLink>
                  </Menu.Item>
                </SubMenu>
              </MenuItemGroup>
              <MenuItemGroup>
                <SubMenu
                  title={
                    <span className="submenu-title-wrapper">
                      <Icon type="gold" />
                      Item
                    </span>
                  }
                >
                  <Menu.Item key="add-items">
                    <NavLink to="/items/add/item/" exact>
                      <Icon type="plus" />
                      Add Item
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="view-items">
                    <NavLink to="/items/view/items/" exact>
                      <Icon type="eye" />
                      View Items
                    </NavLink>
                  </Menu.Item>
                </SubMenu>
              </MenuItemGroup>
              <MenuItemGroup>
                <SubMenu
                  title={
                    <span className="submenu-title-wrapper">
                      <Icon type="gold" />
                      Supplier
                    </span>
                  }
                >
                  <Menu.Item key="add-supplier">
                    <NavLink to="/suppliers/add/supplier/" exact>
                      <Icon type="plus" />
                      Add Supplier
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="view-suppliers">
                    <NavLink to="/suppliers/view/suppliers/" exact>
                      <Icon type="eye" />
                      View Suppliers
                    </NavLink>
                  </Menu.Item>
                </SubMenu>
              </MenuItemGroup>
              <MenuItemGroup>
                <SubMenu
                  title={
                    <span className="submenu-title-wrapper">
                      <Icon type="gold" />
                      Waybills
                    </span>
                  }
                >
                  <Menu.Item key="add-waybill">
                    <NavLink to="/waybills/add/waybill/" exact>
                      <Icon type="plus" />
                      Add Waybill
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="view-waybills">
                    <NavLink to="/waybills/view/waybills/" exact>
                      <Icon type="eye" />
                      View Waybills
                    </NavLink>
                  </Menu.Item>
                </SubMenu>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="bar-chart" />
                  Reports
                </span>
              }
            >
              <MenuItemGroup>
                <Menu.Item key="report">
                  <NavLink to="/Reports/view/reports/" exact>
                    <span>
                      <Icon type="bar-chart" />
                      View Reports
                    </span>
                  </NavLink>
                </Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="about">
              <NavLink
                to="//github.com/daveasiamah/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="submenu-title-wrapper">
                  <Icon type="question-circle" />
                  Help
                </span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="dashboard">
              <NavLink to="/dashboard/" exact>
                <span className="submenu-title-wrapper">
                  <Icon type="dashboard" />
                  Dashboard
                </span>
              </NavLink>
            </Menu.Item>
            <Menu.Item style={{ float: "right" }}>
              <Menu mode="horizontal" theme="light">
                <SubMenu
                  title={
                    <span className="submenu-title-wrapper">
                      {isAuthenticated === true ? (
                        <Avatar
                          style={{
                            backgroundColor: "#40A9FF",
                            verticalAlign: "middle",
                            // fontWeight: "bold",
                            fontSize: "2rem"
                          }}
                          size="large"
                          shape="circle"
                        >
                          {user.name.slice(0, 1)}
                          {/* {user.name.split(" ")[0]} */}
                        </Avatar>
                      ) : null}
                    </span>
                  }
                >
                  <MenuItemGroup>
                    <Menu.Item key="register">
                      <NavLink to="/register" exact>
                        <Icon type="user-add" />
                        Register User
                      </NavLink>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="logout">
                      <a href="" onClick={this.handleLogout}>
                        <span>
                          <Icon type="logout" />
                          Logout
                        </span>
                      </a>
                    </Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
              </Menu>
            </Menu.Item>
          </StyledMenu>
        </div>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Header));
