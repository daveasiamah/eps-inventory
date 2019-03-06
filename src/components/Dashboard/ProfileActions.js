import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const MyProfileActions = () => {
  return (
    <div>
      <Link to="/edit-profile">
        <Button type="primary">Edit Profile</Button>
      </Link>
    </div>
  );
};

export default MyProfileActions;
