import React from 'react';

import Search from 'components/Search';

const SearchForm = () => {
  const [search, setSearch] = React.useState();

  return <Search.Combo onChange={setSearch} value={search} />;
};

export default SearchForm;
