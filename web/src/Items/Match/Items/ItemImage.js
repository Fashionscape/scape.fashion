import React from "react";
import {
  CardActionArea,
  CardMedia,
  Skeleton,
  darken,
  lighten,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mediaContainer: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? lighten("#121212", 0.05)
        : darken("#fff", 0.05),
    display: "flex",
    padding: theme.spacing(2.5),
    flex: "auto",
  },
  media: {
    objectFit: "contain",
  },
}));

const ItemImage = ({ images, loading, wiki }) => {
  const classes = useStyles();

  const wrapper = loading
    ? "button"
    : React.forwardRef(({ children, ...props }, ref) => (
        <a href={wiki.link} ref={ref} {...props}>
          {children}
        </a>
      ));

  if (loading)
    return <Skeleton height={280} variant="rectangular" width="100%" />;

  return (
    <CardActionArea className={classes.mediaContainer} component={wrapper}>
      <CardMedia
        className={classes.media}
        component="img"
        height="240"
        image={images.detail}
      />
    </CardActionArea>
  );
};

export default ItemImage;
