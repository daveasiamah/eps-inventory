import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Col, Row } from "antd";
import styled from "styled-components";

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

// const ChartFrame = styled.div`
//   background-color: "#fff";
//   box-shadow: "3px 3px 0 #bababa";
//   border: "1px solid #bababa";
//   text-align: "center";
//   padding: "10px";
// `;

const ImageCard = styled.img`
  width: 100px;
  height: 100px;
`;

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 4,
  xl: 4
};

class Dashboard extends Component {
  render() {
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
          <Row
            type="flex"
            justify="space-between"
            style={{ padding: "10px", textAlign: "center", margin: "10px" }}
          >
            <Col {...topColResponsiveProps}>
              <NavLink to="/Inventory/receive-stock/" exact>
                <DashCard>
                  <ImageCard src={inventoryimage} alt="inventoryimage" />
                  <h2>Inventory</h2>
                </DashCard>
              </NavLink>
            </Col>
            <Col {...topColResponsiveProps}>
              <DashCard>
                <NavLink to="/suppliers/view/suppliers/" exact>
                  <ImageCard src={partnersimage} alt="partnersimage" />
                  <h2> Suppliers </h2>
                </NavLink>
              </DashCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <DashCard>
                <NavLink exact to="/reports/view/reports/">
                  <ImageCard src={reportsimage} alt="reportsimage" />
                  <h2> Reports</h2>
                </NavLink>
              </DashCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <DashCard>
                <ImageCard src={waybillimage} alt="waybillimage" />
                <h2> Waybills </h2>
              </DashCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <DashCard>
                <ImageCard src={findimage} alt="findimage" />
                <h2> Find </h2>
              </DashCard>
            </Col>
          </Row>
          <div
            style={{
              display: "grid",
              width: "100%",
              gridGap: "20px",
              gridTemplateColumns: "repeat(2,1fr)"
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
export default Dashboard;
