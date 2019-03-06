import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";

import { NavLink, Link } from "react-router-dom";
import { Col, Row, Button, Spin, Icon } from "antd";
import styled from "styled-components";
import MyProfileActions from "./ProfileActions";

import findimage from "../../images/find.png";
import inventoryimage from "../../images/inventory.png";
import waybillimage from "../../images/waybill.png";
import reportsimage from "../../images/report.png";
import partnersimage from "../../images/partners.png";
import ItemsChart from "../Charts/ItemsChart";
import CategoriesChart from "../Charts/CategoriesChart";

const DashCard = styled.div`
  background-color: #fff;
  border: 1px solid #bababa;
  box-shadow: 3px 3px 0 #bababa;
  &:hover {
    cursor: pointer;
    border: 1px solid #bababa;
    /* box-shadow: 3px 3px 0 #40a9ff; */
    overflow: hidden;
    margin: -5px;
    transition: all 0.1s ease-in-out;
  }
  padding: 10px;
  transition: all 0.2s ease-in-out;
`;

// const HeaderCard = styled(Card)`
//   & > .ant-card-body {
//     padding: 10px;
//     background-color: "#ffff";
//   }
// `;

const ImageCard = styled.img`
  width: 70px;
  height: 70px;
`;

// const topColResponsiveProps = {
//   xs: 24,
//   sm: 12,
//   md: 8,
//   lg: 4,
//   xl: 4
// };

class Dashboard extends Component {
  _isMounted = true;

  handleDeleteAccount = e => {
    e.preventDefault();

    this.props.deleteAccount();
  };

  componentDidMount() {
    // if (!this.props.auth.isAuthenticated) {
    //   this.props.history.push("/login");
    // }
    this.props.getCurrentProfile();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      const antIcon = (
        <Icon type="setting" style={{ fontSize: 40, color: "skyblue" }} spin />
      );

      dashboardContent = (
        <div>
          <Spin indicator={antIcon} size="large" />
        </div>
      );
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p>
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <MyProfileActions />

            <div>
              <Button
                type="danger"
                onClick={this.handleDeleteAccount}
                style={{ margin: "10px 0px" }}
              >
                Delete Account
              </Button>
            </div>
          </div>
        );
      } else {
        //User if logged in but has no profile
        dashboardContent = (
          <React.Fragment>
            <div
              style={{
                display: "flex",
                backgroundColor: "#E6F7FF",
                flexDirection: "column",
                padding: "5px",
                margin: "0px 0px 5px",
                border: "1px solid lightblue",
                borderRadius: "4px"
              }}
            >
              <p>
                Welcome <strong>{user.name}</strong>
              </p>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile">
                <Button type="primary">Create Profile</Button>
              </Link>
            </div>
          </React.Fragment>
        );
      }
    }

    return (
      <React.Fragment>
        <div style={{ marginBottom: "150px" }}>
          <h2>
            Dashboard
            <hr
              style={{
                backgroundColor: "#dedede",
                border: "none",
                height: "1px"
              }}
            />
          </h2>
          {dashboardContent}
          <Row
            type="flex"
            justify="space-between"
            style={{
              padding: "1px",
              textAlign: "center",
              margin: "10px"
            }}
          >
            <Col style={{ width: "18.6666667%" }}>
              <NavLink to="/Inventory/receive-stock/" exact>
                <DashCard>
                  <ImageCard src={inventoryimage} alt="inventoryimage" />
                  <h3>Inventory</h3>
                </DashCard>
              </NavLink>
            </Col>
            <Col style={{ width: "18.6666667%" }}>
              <DashCard>
                <NavLink to="/suppliers/view/suppliers/" exact>
                  <ImageCard src={partnersimage} alt="partnersimage" />
                  <h3> Suppliers </h3>
                </NavLink>
              </DashCard>
            </Col>
            <Col style={{ width: "18.6666667%" }}>
              <DashCard>
                <NavLink exact to="/reports/view/reports/">
                  <ImageCard src={reportsimage} alt="reportsimage" />
                  <h3> Reports</h3>
                </NavLink>
              </DashCard>
            </Col>
            <Col style={{ width: "18.6666667%" }}>
              <DashCard>
                <ImageCard src={waybillimage} alt="waybillimage" />
                <h3> Waybills </h3>
              </DashCard>
            </Col>
            <Col style={{ width: "18.6666667%" }}>
              <DashCard>
                <ImageCard src={findimage} alt="findimage" />
                <h3> Find </h3>
              </DashCard>
            </Col>
          </Row>
          <div
            style={{
              display: "grid",
              // width: "100%",
              gridGap: "20px",
              gridTemplateColumns: "repeat(1,1fr)"
            }}
          >
            <div
              style={{
                backgroundColor: "#ffff",
                boxShadow: "3px 3px 0 #bababa",
                border: "1px solid #bababa",
                padding: "10px",
                textAlign: "center"
              }}
            >
              <ItemsChart />
            </div>
            <div
              style={{
                backgroundColor: "#ffff",
                boxShadow: "3px 3px 0 #bababa",
                border: "1px solid #bababa",
                padding: "10px",
                textAlign: "center"
              }}
            >
              <CategoriesChart />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
