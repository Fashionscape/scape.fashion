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
  const { InputProps, hide, onChange, value = "#ff0000" } = props;

  const colorPickerRef = React.createRef();

  const style = hide ? { display: "none" } : {};

  return (
    <FormControl fullWidth margin="normal" variant="outlined" style={style}>
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
    borderRadius: 4,
    height: "2em",
    overflow: "hidden",
    padding: 0,
    width: "2em",
    "&::-webkit-color-swatch, &::-webkit-color-swatch-wrapper": {
      border: "none",
      padding: 0,
    },
  },
});

const ColorAdornment = React.forwardRef(({ onChange, value }, ref) => {
  const classes = useStyles();
  const handleChange = React.useCallback(
    (event) => onChange(event.target.value),
    [onChange]
  );

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
