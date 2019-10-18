import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import "antd/dist/antd.min.css";

import PrivateRoute from "./common/PrivateRoutes/PrivateRoute";
import CreateProfile from "./components/CreateProfile/CreateProfile";
import EditProfile from "./components/EditProfile/EditProfile";
import AddCategory from "./components/Categories/AddCategory/AddCategory";
import ViewCategories from "./components/Categories/ViewCategories/ViewCategories";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Inventory from "./components/Inventory/Inventory";
import AddItem from "./components/Items/AddItem/AddItem";
import ViewItems from "./components/Items/ViewItems/ViewItems";
import Reports from "./components/Reports/Reports";
import Waybill from "./components/Waybill/AddWaybill/Waybill";
import ViewWaybill from "./components/Waybill/ViewWaybills/ViewWaybill";
import AddSupplier from "./components/Suppliers/AddSupplier/AddSupplier";
import ViewSuppliers from "./components/Suppliers/ViewSuppliers/ViewSuppliers";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Users from "./components/Users/Users";

//Check for token in localStorage
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  //Decode token and get user info and expiry
  const decoded = jwt_decode(localStorage.jwtToken);

  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Clear current profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Switch>
            {/* <Route exact path="/" component={HomePage} /> */}
            <Route exact path="/login" component={LoginContainer} />
            <Route exact path="/register" component={RegisterContainer} />
            <Route component={DefaultContainer} />
          </Switch>
        </React.Fragment>
      </Provider>
    );
  }
}

const LoginContainer = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/login" component={Login} />
      {/* <Route path="" component={NotFoundPage} /> */}
    </Switch>
  </React.Fragment>
);

const RegisterContainer = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/register" component={Register} />
    </Switch>
  </React.Fragment>
);

const NotFoundPage = ({ location }) => (
  <div style={{ paddingLeft: "20px" }}>
    <h2>404 Page Not Found!</h2>
    <h2>
      No match found for <code>{location.pathname}</code>
    </h2>
    <p>Please use the menu bar to navigate to the required page.</p>
  </div>
);

// const HomePage = () => (
//   <React.Fragment>
//     <Route path="/" component={Login} />
//   </React.Fragment>
// );

const DefaultContainer = () => (
  <React.Fragment>
    <Header />
    <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      <PrivateRoute path="/items/view/items" exact component={ViewItems} />
      <PrivateRoute path="/items/add/item" exact component={AddItem} />
      <PrivateRoute
        path="/categories/add/category"
        exact
        component={AddCategory}
      />
      <PrivateRoute
        exact
        path="/inventory/receive-stock"
        component={Inventory}
      />
      <PrivateRoute
        path="/categories/view/categories"
        component={ViewCategories}
        exact
      />
      <PrivateRoute exact path="/reports/view/reports" component={Reports} />
      <PrivateRoute
        exact
        path="/suppliers/add/supplier"
        component={AddSupplier}
      />
      <PrivateRoute
        exact
        path="/suppliers/view/suppliers"
        component={ViewSuppliers}
      />
      <PrivateRoute exact path="/waybill/add/waybill" component={Waybill} />
      <PrivateRoute
        exact
        path="/waybill/view/waybills"
        component={ViewWaybill}
      />
      <PrivateRoute exact path="/users" component={Users} />
      <Route component={NotFoundPage} />
    </Switch>
  </React.Fragment>
);

export default App;
