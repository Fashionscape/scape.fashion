import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';

import config from '../config';
import {searchFromRoute} from './Search';

import './SearchResults.css';

const searchUrl = ({color, item, isByColor, slot}) => {
  color = encodeURIComponent(color);
  item = encodeURIComponent(item);
  slot = slot || '';

  return isByColor
    ? `${config.api}/colors/${color}?slot=${slot}`
    : `${config.api}/items/${item}?slot=${slot}`;
};

const SearchResults = props => {
  const {history, location, match} = props;

  const [shouldSearch, setShouldSearch] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!shouldSearch) return;
    setShouldSearch(false);

    const fetchResults = async search => {
      const url = searchUrl(search);
      const response = await fetch(url).then(res => res.json());

      if (response.items) setResults(response.items);
    };

    const search = searchFromRoute({location, match});
    fetchResults(search);
  }, [shouldSearch, location, match]);

  useEffect(() => history.listen(() => setShouldSearch(true)), [history]);

  if (results.length === 0) return null;

  const search = searchFromRoute({location, match});

  return (
    <section className="results">
      <ol className="grid">
        {results.map(item => (
          <SearchResult key={item.name} {...item} slot={search.slot} />
        ))}
      </ol>
    </section>
  );
};

const toUrl = ({color, slot}) => {
  slot = slot ? `?slot=${slot}` : '';
  return `/colors/${encodeURIComponent(color)}${slot}`;
};

const SearchResult = ({colors, match, name, images, wiki, slot}) => {
  return (
    <li className="grid-item">
      <div className="name">{name}</div>
      <a className="image" href={wiki.link}>
        <img alt={name} src={images.detail} />
      </a>
      <div className="colors">
        {colors.map(color => (
          <Link
            className="color"
            key={color}
            to={toUrl({color, slot})}
            style={{backgroundColor: color}}>
            {color}
          </Link>
        ))}
      </div>
    </li>
  );
};

export default withRouter(SearchResults);
