import { useMachine } from "@xstate/react";
import { newPostMachine } from "./newPostMachine";
import {
  Paper,
  makeStyles,
  Typography,
  Avatar,
  ButtonBase
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2)
  },
  staticContainer: {
    display: "flex",
    alignItems: "center",
    gap: 15
  },
  staticPlaceHolder: {
    width: "100%",
    height: "100%",
    borderBottom: `thin solid ${theme.palette.text.secondary}`,
    display: "inline-block",
    textAlign: "left",
    paddingLeft: 5
  }
}));

function NewPost() {
  const classes = useStyles();
  const [state, send] = useMachine(newPostMachine);

  return (
    <Paper className={clsx(classes.container, classes.staticContainer)}>
      <Avatar />
      <Typography
        component={ButtonBase}
        className={classes.staticPlaceHolder}
        variant="h6"
      >
        What's on your mind?
      </Typography>
    </Paper>
  );
}

export default NewPost;
