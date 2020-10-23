import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";

import Header from "components/Header";
import Items from "./Items";
import Page from "components/Page";
import client from "client";
import { useSearch } from "hooks/search";
import { useSlots } from "hooks/slots";

const useStyles = makeStyles({
  page: {
    paddingTop: ({ mdUp }) => (mdUp ? 80 : 128),
  },
});

const Match = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const classes = useStyles({ mdUp });
  const search = useSearch();

  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [filters, setFilters] = React.useState({});

  React.useEffect(() => {
    setLoading(true);

    client.items
      .match({ search, filters })
      .then(setItems)
      .finally(() => setLoading(false));
  }, [search, filters]);

  const handleFiltersChange = (filter) => setFilters({ ...filters, ...filter });

  return (
    <>
      <Header search={search} showSearch />
      <Page className={classes.page} loading={loading}>
        <Filters filters={filters} onChange={handleFiltersChange} />
        <Items items={items} />
      </Page>
    </>
  );
};

const membersOptions = [
  { label: "Members", value: true },
  { label: "Free to play", value: false },
];

const tradeableOptions = [
  { label: "Tradeable", value: true },
  { label: "Untradeable", value: false },
];

const useFiltersStyles = makeStyles({
  root: {
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const Filters = ({ filters, onChange }) => {
  const classes = useFiltersStyles();

  const slots = useSlots();

  const handleChange = React.useCallback(
    (key) => (value) => {
      onChange({ [key]: value });
    },
    [onChange]
  );

  return (
    <Box className={classes.root} display="flex" overflow="auto">
      <Filter
        label="Slot"
        onChange={handleChange("slot")}
        options={slots}
        value={filters.slot}
      />
      <Filter
        label="Members"
        onChange={handleChange("members")}
        options={membersOptions}
        value={filters.members}
      />
      <Filter
        label="Tradeable"
        onChange={handleChange("tradeable")}
        options={tradeableOptions}
        value={filters.tradeable}
      />
    </Box>
  );
};

const useFilterStyles = makeStyles((theme) => ({
  formControl: {
    flex: "none",
    minWidth: 120,
    marginRight: theme.spacing(1),
  },
}));

const Filter = ({ label, onChange, options, value = "" }) => {
  const classes = useFilterStyles();

  const handleChange = (event) => onChange(event.target.value);

  return (
    <FormControl
      className={classes.formControl}
      margin="dense"
      size="small"
      variant="outlined"
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        onChange={handleChange}
        variant="outlined"
        value={value}
      >
        <MenuItem value={null}>All</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Match;
