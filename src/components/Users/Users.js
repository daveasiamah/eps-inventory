import React, { Component, Fragment } from "react";
import { Spin, Icon, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
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
      if (Object.keys(profile).length > 1) {
        dashboardContent = (
          <div>
            <p>
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
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
        if (Object.keys(profile).length === 1) {
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
                <p>You have not yet setup a profile, please add some info.</p>
                <Link to="/create-profile">
                  <Button type="primary">Create Profile</Button>
                </Link>
              </div>
            </React.Fragment>
          );
        }
      }
    }
    return (
      <Fragment>
        <div>
          <h1>Users Page</h1>
          {dashboardContent}
        </div>
      </Fragment>
    );
  }
}

// export default Users;

Users.propTypes = {
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
)(Users);
