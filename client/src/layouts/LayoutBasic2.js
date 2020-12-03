import React from "react";

import { Container } from "semantic-ui-react";

const LayoutBasic2 = (props) => {
  const { children } = props;
  return (
    <>
      <Container className="layout-basic"></Container>
      {children}
    </>
  );
};

export default LayoutBasic2;
