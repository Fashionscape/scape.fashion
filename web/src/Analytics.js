import React from "react";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";

const Analytics = ({ children }) => {
  const location = useLocation();

  React.useEffect(() => {
    const { pathname, search } = location;

    ReactGA.pageview(pathname + search);
  }, [location]);

  return children;
};

export default Analytics;
