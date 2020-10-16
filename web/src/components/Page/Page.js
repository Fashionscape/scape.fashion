import React from 'react';

import {Container} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  root: {
    flex: '1 0 auto',
  },
};

const Page = ({children, classes}) => {
  return <Container className={classes.root}>{children}</Container>;
};

export default withStyles(styles)(Page);
