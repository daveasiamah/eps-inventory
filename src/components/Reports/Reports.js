import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Col, Card, Form } from "antd";
import "./Reports.css";
// import styled, { css } from "styled-components";
import ChartsMain from "../Charts/ChartsMain";

class Reports extends Component {
  // constructor(props) {
  //   super(props);

  // }

  _isMounted = true;

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    // const topColResponsiveProps = {
    //   xs: 24,
    //   sm: 12,
    //   md: 12,
    //   lg: 12,
    //   xl: 6
    // };
    return (
      <React.Fragment>
        <h1>Reports</h1>
        {/* <Button>Normal Button</Button>
        <Button primary>Primary Button</Button> */}

        <div className="report-grid">
          <Col>
            <Card className="report-card">
              Lorem ipsum dolor sit amet, idque mollis consetetur at vis, eam at
              sale atqui. Sapientem qualisque reprehendunt eu his, ne sit oratio
              accusam. In has ocurreret vulputate, etiam sadipscing ut per, his
              ad regione singulis scriptorem. Sit an erroribus adipiscing. No
              amet ridens pri, duo persecuti adolescens no. 1
            </Card>
          </Col>
          <Col>
            <Card className="report-card">
              Lorem ipsum dolor sit amet, idque mollis consetetur at vis, eam at
              sale atqui. Sapientem qualisque reprehendunt eu his, ne sit oratio
              accusam. In has ocurreret vulputate, etiam sadipscing ut per, his
              ad regione singulis scriptorem. Sit an erroribus adipiscing. No
              amet ridens pri, duo persecuti adolescens no. 2
            </Card>
          </Col>
          <Col>
            <Card className="report-card">
              Lorem ipsum dolor sit amet, idque mollis consetetur at vis, eam at
              sale atqui. Sapientem qualisque reprehendunt eu his, ne sit oratio
              accusam. In has ocurreret vulputate, etiam sadipscing ut per, his
              ad regione singulis scriptorem. Sit an erroribus adipiscing. No
              amet ridens pri, duo persecuti adolescens no. 3
            </Card>
          </Col>
          <Col>
            <Card className="report-card">
              Lorem ipsum dolor sit amet, idque mollis consetetur at vis, eam at
              sale atqui. Sapientem qualisque reprehendunt eu his, ne sit oratio
              accusam. In has ocurreret vulputate, etiam sadipscing ut per, his
              ad regione singulis scriptorem. Sit an erroribus adipiscing. No
              amet ridens pri, duo persecuti adolescens no. 4
            </Card>
          </Col>
        </div>
        <ChartsMain />
      </React.Fragment>
    );
  }
}

const MainReports = Form.create({ name: "reports" })(Reports);

MainReports.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(MainReports);
