import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  line-height: 47px;
  width: 100%;
  text-align: center;
  z-index: 999;
  margin-top: 10px;
  /* padding-top: 30px; */
  background-color: white;
  /* boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.065)"  */
`;

const Footer = () => {
  return (
    <StyledFooter>
      Powered by <strong>&nbsp;David Asiamah&nbsp;</strong> Copyright &copy;
      2019. All rights reserved.
    </StyledFooter>
  );
};

export default Footer;
