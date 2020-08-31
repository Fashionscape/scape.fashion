import React from 'react';

import config from '../config';

import './Header.css';

const Header = () => {
  return config.release === 'runescape' ? (
    <RunescapeHeader />
  ) : (
    <OldSchoolHeader />
  );
};

const OldSchoolHeader = () => {
  return (
    <div className="header">
      <h1 className="title">
        <a href="https://scape.fashion">scape.fashion</a>
      </h1>
      <p className="subtitle">
        A fashionscape tool for Old School Runescape{' '}
        <img
          alt="gnome scarf"
          src="https://oldschool.runescape.wiki/images/3/3a/Gnome_scarf.png?2d77d"
        />
      </p>
    </div>
  );
};

const RunescapeHeader = () => {
  return (
    <div className="header">
      <h1 className="title">
        <a href="https://rune.scape.fashion">rune.scape.fashion</a>
      </h1>
      <p className="subtitle">
        A fashionscape tool for Runescape{' '}
        <img
          alt="gnome scarf"
          src="https://runescape.wiki/images/3/3a/Gnome_scarf.png?5a375"
        />
      </p>
    </div>
  );
};

export default Header;
