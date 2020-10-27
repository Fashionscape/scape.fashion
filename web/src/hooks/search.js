import React from "react";
import { useLocation } from "react-router-dom";

export const useQueryParams = () => new URLSearchParams(useLocation().search);

export const useQuery = () => {
  const queryParams = useQueryParams();
  const query = Object.fromEntries(queryParams);

  if (query.name) {
    query.item = query.name;
    delete query.name;
  }

  if (query.item && query.color) delete query.color;

  const searchBy = query.hasOwnProperty("color") ? "color" : "item";

  const { allowance, color, item, members, slot, tradeable } = query;

  const filters = React.useMemo(
    () => ({ allowance, members, slot, tradeable }),
    [allowance, members, slot, tradeable]
  );

  const search = React.useMemo(
    () => ({
      ...(color && { color }),
      ...(item && { item }),
      by: searchBy,
    }),
    [color, item, searchBy]
  );

  return React.useMemo(() => ({ filters, search }), [filters, search]);
};

const removeEmpty = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([k, v]) => ![undefined, null, ""].includes(v))
  );

export const toPath = ({ filters = {}, page, search }) => {
  const params = new URLSearchParams({
    ...(search.by === "item" && { name: search.item }),
    ...(search.by === "color" && { color: search.color }),
    ...(page !== undefined && { page }),
    ...removeEmpty(filters),
  });
  const query = params.toString();

  return `/items/match?${query}`;
};
