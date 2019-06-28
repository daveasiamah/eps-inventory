import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Col, Row, Card, Form, Select } from "antd";
import "./Reports.css";
import Moment from "react-moment";
import styled from "styled-components";
import StockCountReport from "./StockCountReport";
import StockTransactionDetailReport from "./StockTransactionDetailReport";
// import ChartsMain from "../Charts/ChartsMain";

import baseServerUri from "../../utils/baseServerUri";

const Option = Select.Option;
const FormItem = Form.Item;

const ReportGrid = styled.div`
  /* display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px; */
  border: "1px solid black";
`;

// const ReportCard = styled(Card)`
//   width: 90vw;
//   max-height: 1000px;
// `;

// const ReportCard = styled.div`
//   background: rgba(255, 255, 255, 0.933);
//   border: 1px solid #cacaca;
//   border-radius: 3px;
//   box-shadow: 3px 3px 0px #cacaca;
// `;

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      selectedReport: "",
      error: {},
      loading: false,
      date: new Date()
    };
  }

  _isMounted = true;

  fetchReport = reportId => {
    this.setState({ loading: true });
    fetch(`${baseServerUri}/api/inventory`, { method: "GET" })
      .then(response => response.json())
      .then(report => {
        if (this._isMounted) {
          this.setState({ loading: false, reports: report });
        }
      })
      .catch(err => console.log(err));
  };

  handleReportSelect = value => {
    // let reports = this.state.reports;
    //Search for the current report in state
    // let currentReport = reports.filter(reportById => reportById._id === reportId);
    this.setState({
      selectedReport: value
    });
    // console.log(value);
    // console.log("The selected Report is: " + JSON.stringify(currentReport));

    //Map reports to get selected values
    // currentReport.map(report =>
    //   this.setState({
    //     report_name: report.report_name,
    //     description: report.description,
    //     status: report.status
    //   })
    // );
  };
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedReport } = this.state;
    const { date } = this.state;

    return (
      <React.Fragment>
        <h2 style={{ paddingLeft: "10px" }}>Reports </h2>
        <hr
          style={{
            backgroundColor: "#dedede",
            border: "none",
            height: "1px"
          }}
        />

        <Card>
          <ReportGrid>
            <div
              style={{
                float: "right",
                border: "1px solid grey",
                padding: "9px"
              }}
            >
              <Moment format="YYYY-MM-DD hh:mm:ss">{date}</Moment>
            </div>
            <Col>
              <Row>
                {/* <h3>{"ReportTitle"}</h3> */}
                <Form>
                  <FormItem label="Report Name:">
                    {getFieldDecorator("report")(
                      <Select
                        showSearch
                        autoFocus="true"
                        style={{ width: "25%" }}
                        placeholder="Select Report"
                        optionFilterProp="children"
                        onChange={this.handleReportSelect}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {/* {this.state.reports.map(report => ( */}
                        <Option key={"report1"} value={"StockCountReport"}>
                          {"Stock Count Report"}
                        </Option>
                        <Option
                          key={"report2"}
                          value={"StockTransactionDetailReport"}
                        >
                          {"Stock Transaction Detail Report"}
                        </Option>
                        {/* ))} */}
                      </Select>
                    )}
                  </FormItem>
                </Form>
              </Row>
            </Col>
          </ReportGrid>
          <Col>
            <Row>
              <div>
                {selectedReport === "StockCountReport" && <StockCountReport />}
                {selectedReport === "StockTransactionDetailReport" && (
                  <StockTransactionDetailReport />
                )}
              </div>
            </Row>
          </Col>
        </Card>
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
