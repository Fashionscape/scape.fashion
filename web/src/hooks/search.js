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
  const value = query.get(key);
  return React.useMemo(() => ({ searchBy, value }), [searchBy, value]);
};

const removeEmpty = (obj) =>
  Object.keys(obj).forEach((key) => obj[key] === "" && delete obj[key]) || obj;

export const toParams = ({ searchBy, value, ...rest }) => {
  const key = keyMap[searchBy];
  const params = removeEmpty(rest);
  return new URLSearchParams({ [key]: value, ...params });
};

export const toPath = ({ searchBy, value }) => {
  const key = keyMap[searchBy];
  const params = new URLSearchParams({ [key]: value });
  const query = params.toString();
  return `/items/match?${query}`;
};
