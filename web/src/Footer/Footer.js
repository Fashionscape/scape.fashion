import React from 'react';
import {OutboundLink} from 'react-ga';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <OutboundLink
        eventLabel="email"
        to="mailto:contact@scape.fashion"
        target="_blank">
        email
      </OutboundLink>
      <OutboundLink
        eventLabel="twitter"
        to="https://twitter.com/NickOnTheWeb"
        target="_blank">
        twitter
      </OutboundLink>
      <OutboundLink
        eventLabel="github"
        to="https://github.com/ncpierson/fashionscape-web"
        target="_blank">
        github
      </OutboundLink>
      <OutboundLink
        eventLabel="api"
        to="https://github.com/ncpierson/fashionscape-api#Documentation"
        target="_blank">
        api
      </OutboundLink>
      <span>|</span>
      <OutboundLink
        eventLabel="donate"
        to="https://ko-fi.com/nickontheweb"
        target="_blank">
        donate <span role="img" aria-label="coffee">☕</span>
      </OutboundLink>
    </footer>
  );
};

export default Footer;
