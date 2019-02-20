import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "antd/dist/antd.min.css";

//Importing Components
import AddCategory from "./components/Categories/AddCategory/AddCategory";
import ViewCategories from "./components/Categories/ViewCategories/ViewCategories";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Inventory from "./components/Inventory/Inventory";
import AddItem from "./components/Items/AddItem/AddItem";
import ViewItems from "./components/Items/ViewItems/ViewItems";
import Reports from "./components/Reports/Reports";
import AddSupplier from "./components/Suppliers/AddSupplier/AddSupplier";
import ViewSuppliers from "./components/Suppliers/ViewSuppliers/ViewSuppliers";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";

class App extends Component {
  state = {
    isNavBarHidden: true
  };
  render() {
    return (
      <React.Fragment>
        <Header />

        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard/" component={Dashboard} />
          <Route path="/login/" component={Login} />
          <Route path="/register/" component={Register} />
          <Route exact path="/inventory/receive-stock/" component={Inventory} />
          <Route path="/items/view/items/" exact component={ViewItems} />
          <Route path="/items/add/item/" exact component={AddItem} />
          <Route
            path="/categories/add/category/"
            exact
            component={AddCategory}
          />
          <Route
            path="/categories/view/categories/"
            component={ViewCategories}
            exact
          />
          <Route extact path="/reports/view/reports/" component={Reports} />
          <Route
            extact
            path="/suppliers/add/supplier/"
            component={AddSupplier}
          />
          <Route
            extact
            path="/suppliers/view/suppliers/"
            component={ViewSuppliers}
          />
          <Redirect from="/" to="/dashboard/" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
