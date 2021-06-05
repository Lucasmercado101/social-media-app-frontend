import { useMachine } from "@xstate/react";
import { newPostMachine } from "./newPostMachine";
import {
  Paper,
  makeStyles,
  Typography,
  Avatar,
  ButtonBase,
  Button,
  TextField,
  Box
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
  },
  creatingNoteContainer: {
    display: "flex",
    flexDirection: "column"
  },
  discardBtn: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main
  }
}));

function NewPost() {
  const classes = useStyles();
  const [state, send] = useMachine(newPostMachine);

  if (state.matches("idle"))
    return (
      <Paper className={clsx(classes.container, classes.staticContainer)}>
        <Avatar />
        <Typography
          onClick={() => send("start_creating_new_post")}
          component={ButtonBase}
          className={classes.staticPlaceHolder}
          variant="h6"
        >
          What's on your mind?
        </Typography>
      </Paper>
    );

  if (state.matches("creating_new_post"))
    return (
      <Paper className={clsx(classes.container, classes.creatingNoteContainer)}>
        <TextField placeholder="Share your thoughts..." autoFocus multiline />
        <Box display="flex" pt={2} justifyContent="space-between">
          <Button variant="outlined" className={classes.discardBtn}>
            Discard
          </Button>
          <Button variant="contained" color="primary">
            Share
          </Button>
        </Box>
      </Paper>
    );
  return null;
}

export default NewPost;
