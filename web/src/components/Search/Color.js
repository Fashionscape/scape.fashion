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
  const { InputProps, onChange, value } = props;

  const colorPickerRef = React.useRef();

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
    borderRadius: 4,
    cursor: "pointer",
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
  const [color, setColor] = React.useState(value);

  React.useEffect(() => {
    setColor(value);
  }, [value]);

  React.useEffect(() => {
    const colorEl = ref.current;
    const handleChange = (event) => onChange(event.target.value);
    colorEl.addEventListener("change", handleChange);

    return () => colorEl.removeEventListener("change", handleChange);
  }, [onChange, ref]);

  const handleChange = React.useCallback(
    (event) => setColor(event.target.value),
    [setColor]
  );

  return (
    <InputAdornment position="start">
      <InputBase
        classes={classes}
        inputRef={ref}
        name="color"
        onChange={handleChange}
        type="color"
        value={color}
      />
    </InputAdornment>
  );
});

export default ColorSearch;
