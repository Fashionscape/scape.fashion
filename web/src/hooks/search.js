import React from "react";
import { useLocation } from "react-router-dom";

export const useQuery = () => new URLSearchParams(useLocation().search);

export const useSearch = () => {
  const query = useQuery();
  const search = Object.fromEntries(query);

  if (search.name) {
    search.item = search.name;
    delete search.name;
  }

  if (search.item && search.color) delete search.color;

  const { color, item, slot, members, tradeable, allowance } = search;

  return React.useMemo(
    () => ({
      allowance,
      ...(color && { color }),
      ...(item && { item }),
      members,
      slot,
      tradeable,
    }),
    [color, item, slot, members, tradeable, allowance]
  );
};

const removeEmpty = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([k, v]) => ![undefined, null, ""].includes(v))
  );

export const toPath = ({ color, item, ...rest }) => {
  const params = new URLSearchParams({
    ...(item && { name: item }),
    ...(color && { color }),
    ...removeEmpty(rest),
  });
  const query = params.toString();

  return `/items/match?${query}`;
};
