import React from "react";
import {
  FormControl,
  InputBase,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ColorSearch = React.memo((props) => {
  const { InputProps, onChange, value = "#ff0000" } = props;

  const colorPickerRef = React.createRef();

  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor="color-search">Color</InputLabel>
      <OutlinedInput
        {...InputProps}
        id="color-search"
        label="Color"
        onFocus={() => colorPickerRef.current.click()}
        readOnly
        startAdornment={
          <ColorAdornment
            onChange={onChange}
            ref={colorPickerRef}
            value={value}
          />
        }
        value={value}
      />
    </FormControl>
  );
});

const useStyles = makeStyles({
  input: {
    background: "none",
    border: 0,
    borderRadius: "0.5rem",
    height: "2em",
    overflow: "hidden",
    padding: 0,
    width: "2em",
  },
});

const ColorAdornment = React.forwardRef(({ onChange, value }, ref) => {
  const classes = useStyles();
  const handleChange = React.useCallback((e) => onChange(e.target.value), [
    onChange,
  ]);

  return (
    <InputAdornment disablePointerEvents position="start">
      <InputBase
        classes={classes}
        inputRef={ref}
        onChange={handleChange}
        type="color"
        value={value}
      />
    </InputAdornment>
  );
});

export default ColorSearch;
