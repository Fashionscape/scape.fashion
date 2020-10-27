import React from "react";
import {
  ClickAwayListener,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Popper,
  Select,
  Slider,
  Typography,
  lighten,
  makeStyles,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

const useFilterStyles = makeStyles((theme) => ({
  formControl: {
    flex: "none",
    minWidth: 120,
    marginRight: theme.spacing(1),
  },
}));

const Filter = ({ label, onChange, options, value = "" }) => {
  const classes = useFilterStyles();

  const handleChange = (event) => {
    if (event.target.value === value) return;
    onChange(event.target.value);
  };

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
        <MenuItem value="">All</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const useAdvancedStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
    fontSize: "inherit",
    lineHeight: "24px",
    marginLeft: theme.spacing(1),
    flex: "none",
    textTransform: "none",
    "&:hover,&:focus": {
      color: theme.palette.secondary.main,
    },
  },
  icon: {
    verticalAlign: "middle",
  },
  paper: {
    background: lighten("#121212", 0.05),
    maxWidth: 300,
    padding: theme.spacing(1),
  },
}));

const AdvancedFilter = ({ onChange, value: initialValue = 0.5 }) => {
  const classes = useAdvancedStyles();
  const linkEl = React.useRef();
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event) => setValue(event.target.value);
  const handleChangeCommitted = (_, value) => onChange(value);

  const handleClickAway = (event) =>
    event.target !== linkEl.current && setIsOpen(false);

  return (
    <>
      <Link
        className={classes.root}
        component="button"
        onClick={() => setIsOpen((o) => !o)}
        ref={linkEl}
        underline="none"
      >
        Advanced
        <ExpandMoreIcon className={classes.icon} />
      </Link>
      <Popper anchorEl={linkEl?.current} open={isOpen} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper className={classes.paper} variant="outlined">
            <Typography variant="h6">Allowance</Typography>
            <Typography gutterBottom variant="body2">
              How much weight to give secondary and tertiary colors. (e.g. ‘0’
              means to only match primary color)
            </Typography>
            <Slider
              min={0}
              max={1}
              onChange={handleChange}
              onChangeCommitted={handleChangeCommitted}
              step={0.1}
              value={value}
              valueLabelDisplay="auto"
            />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

const MemoFilter = React.memo(Filter);
const MemoAdvanced = React.memo(AdvancedFilter);

export { MemoFilter as Filter };
export { MemoAdvanced as AdvancedFilter };
