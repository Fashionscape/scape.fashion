import React from 'react';

import { Box } from '@material-ui/core';

const Section = ({children}) => (
  <Box pb="3rem" pt="3rem">
    {children}
  </Box>
);

export default Section;
