import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";

import { NavLink } from "react-router-dom";
import { Col, Row } from "antd";
import styled from "styled-components";
// import MyProfileActions from "./ProfileActions";

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
    overflow: hidden;
    margin: -5px;
    transition: all 0.1s ease-in-out;
  }
  padding: 10px;
  transition: all 0.2s ease-in-out;
`;

const ChartWrapper = styled.div`
  background-color: "#ffff";
  box-shadow: 3px 3px 0 #bababa;
  border: 1px solid #bababa;
  padding: 10px;
  /* margin: 10px 30px; */
  height: 45rem;
  width: 98vw;
`;

const ImageCard = styled.img`
  width: 70px;
  height: 70px;
`;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      errors: false,
    };
  }
  _isMounted = true;

  handleDeleteAccount = (e) => {
    e.preventDefault();

    this.props.deleteAccount();
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getCurrentProfile();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div
        style={{
          marginBottom: "150px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <h2>
          Dashboard
          <hr
            style={{
              backgroundColor: "#dedede",
              border: "none",
              height: "1px",
            }}
          />
        </h2>

        {/* DashboardContent */}

        <Row
          type="flex"
          justify="space-between"
          style={{
            padding: "1px",
            textAlign: "center",
            margin: "10px",
          }}
        >
          <Col style={{ width: "18.7%" }}>
            <NavLink to="/Inventory/receive-stock/" exact>
              <DashCard>
                <ImageCard src={inventoryimage} alt="inventoryimage" />
                <h3>Inventory</h3>
              </DashCard>
            </NavLink>
          </Col>
          <Col style={{ width: "18.7%" }}>
            <DashCard>
              <NavLink to="/suppliers/view/suppliers/" exact>
                <ImageCard src={partnersimage} alt="partnersimage" />
                <h3> Suppliers </h3>
              </NavLink>
            </DashCard>
          </Col>
          <Col style={{ width: "18.7%" }}>
            <DashCard>
              <NavLink exact to="/reports/view/reports/">
                <ImageCard src={reportsimage} alt="reportsimage" />
                <h3> Reports</h3>
              </NavLink>
            </DashCard>
          </Col>
          <Col style={{ width: "18.7%" }}>
            <DashCard>
              <NavLink exact to="/waybill/add/waybill/">
                <ImageCard src={waybillimage} alt="waybillimage" />
                <h3> Waybills </h3>
              </NavLink>
            </DashCard>
          </Col>
          <Col style={{ width: "18.7%" }}>
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
            gridTemplateColumns: "repeat(1,1fr)",
          }}
        >
          <ChartWrapper>
            <ItemsChart />
          </ChartWrapper>
          <ChartWrapper>
            <CategoriesChart />
          </ChartWrapper>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
