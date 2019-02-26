import React from "react";
import { NavLink } from "react-router-dom";
import Menu from "antd/lib/menu";
import Icon from "antd/lib/icon";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  box-shadow: 0px 2px 3px rgba(200, 218, 223, 0.55);
`;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Header = () => (
  <React.Fragment>
    <h2>EPS-Inventory Management System v1.0</h2>
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
          <Menu.Item key="user">User</Menu.Item>
          <Menu.Item key="print">Print</Menu.Item>
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
          <Menu.Item key="register">
            <NavLink to="/register" exact>
              Register User
            </NavLink>
          </Menu.Item>
          <Menu.Item key="login">
            <NavLink to="/login" exact>
              Log In
            </NavLink>
          </Menu.Item>
          <Menu.Item key="logout">
            <NavLink to="/logout" exact>
              Log Out
            </NavLink>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
      {/* File Submenu ends here... */}
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
            {/* <Icon type="gold" /> */}
            <NavLink to="/inventory/receive-stock/" exact>
              Receive Stock
            </NavLink>
          </Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup>
          <Menu.Item key="transfer">
            {/* <Icon type="gold" /> */}
            Transfer Stock
          </Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup>
          <Menu.Item key="re-order">
            {/* <Icon type="gold" /> */}
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
                Add Category
              </NavLink>
            </Menu.Item>
            <Menu.Item key="view-categories">
              <NavLink to="/categories/view/categories/" exact>
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
                Add Item
              </NavLink>
            </Menu.Item>
            <Menu.Item key="view-items">
              <NavLink to="/items/view/items/" exact>
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
                Add Supplier
              </NavLink>
            </Menu.Item>
            <Menu.Item key="view-suppliers">
              <NavLink to="/suppliers/view/suppliers/" exact>
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
                Add Waybill
              </NavLink>
            </Menu.Item>
            <Menu.Item key="view-waybills">
              <NavLink to="/waybills/view/waybills/" exact>
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
            <Icon type="question" />
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
    </StyledMenu>
  </React.Fragment>
);

export default Header;
