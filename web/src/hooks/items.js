import { useEffect, useState } from "react";

import client from "client";

let itemsCache = [];

const fetchItems = async (keys) => {
  if (itemsCache.length > 0) return Promise.resolve(itemsCache);

  const items = await client.items.list(keys);
  itemsCache = items;

  return items;
};

const useItems = (keys = []) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems(keys).then(setItems);
  }, [keys]);

  return items;
};

export default useItems;
