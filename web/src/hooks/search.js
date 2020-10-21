import React from "react";
import { useLocation } from "react-router-dom";

const keyMap = {
  color: "color",
  item: "name",
  name: "item",
};

export const useQuery = () => new URLSearchParams(useLocation().search);

export const useSearch = () => {
  const query = useQuery();
  const searchBy = query.has("name") ? "item" : "color";
  const key = keyMap[searchBy];
  const search = query.get(key);
  return React.useMemo(() => ({ search, searchBy }), [search, searchBy]);
};

export const toParams = ({ searchBy, search }) => {
  const key = keyMap[searchBy];
  return new URLSearchParams({ [key]: search });
};

export const toPath = ({ search, searchBy }) => {
  const key = keyMap[searchBy];
  const params = new URLSearchParams({ [key]: search });
  const query = params.toString();
  return `/items/match?${query}`;
};
