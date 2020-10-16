import {useEffect, useState} from 'react';

import client from 'client';

const useItems = (keys = []) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    client.items.list(keys).then(setItems);
  }, [keys]);

  return items;
};

export default useItems;
