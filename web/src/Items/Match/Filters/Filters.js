import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import { AdvancedFilter, Filter } from "./Filter";
import { useSlots } from "hooks/slots";

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

const Filters = ({ onChange, filters = {} }) => {
  const classes = useFiltersStyles();

  const slots = useSlots();

  const handleSlotChange = React.useCallback(
    (value) => onChange({ slot: value }),
    [onChange]
  );

  const handleMembersChange = React.useCallback(
    (value) => onChange({ members: value }),
    [onChange]
  );

  const handleTradeableChange = React.useCallback(
    (value) => onChange({ tradeable: value }),
    [onChange]
  );

  const handleAllowanceChange = React.useCallback(
    (value) => onChange({ allowance: value }),
    [onChange]
  );

  return (
    <Box
      alignItems="baseline"
      className={classes.root}
      display="flex"
      pt={1}
      overflow="auto"
    >
      <Filter
        label="Slot"
        onChange={handleSlotChange}
        options={slots}
        value={filters.slot}
      />
      <Filter
        label="Members"
        onChange={handleMembersChange}
        options={membersOptions}
        value={filters.members}
      />
      <Filter
        label="Tradeable"
        onChange={handleTradeableChange}
        options={tradeableOptions}
        value={filters.tradeable}
      />
      <AdvancedFilter
        onChange={handleAllowanceChange}
        value={filters.allowance}
      />
    </Box>
  );
};

export default Filters;
