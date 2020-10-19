import React from "react";

import { Box, useMediaQuery } from "@material-ui/core";

const Section = ({ children, ...rest }) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const spacing = isSmall ? 6 : 12;

  return (
    <Box pb={spacing} pt={spacing} {...rest}>
      {children}
    </Box>
  );
};

export default Section;
