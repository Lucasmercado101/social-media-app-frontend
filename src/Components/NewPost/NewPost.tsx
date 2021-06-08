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
import { useMutation, useQueryClient, useQuery } from "react-query";
import { createPost, getMyUserData } from "../../api";

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
  },
  contentLimitIndicator: ({ contentLength }: { contentLength: number }) => ({
    opacity: contentLength > 250 ? contentLength / 400 : 0,
    transition: "opacity 250ms, color 250ms",
    color:
      contentLength > 375
        ? theme.palette.warning.main
        : theme.palette.text.primary
  })
}));

function NewPost() {
  const { data } = useQuery("my user data", getMyUserData);
  const queryClient = useQueryClient();
  const createPostMutation = useMutation(
    (content: string) => createPost({ content }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("feed");
        queryClient.invalidateQueries("explore");
      }
    }
  );
  const [state, send] = useMachine(newPostMachine, {
    actions: {
      onDone: ({ content }) => createPostMutation.mutate(content)
    }
  });
  const contentLength = state.context.content.length;
  const classes = useStyles({ contentLength });

  if (state.matches("idle"))
    return (
      <Paper className={clsx(classes.container, classes.staticContainer)}>
        <Avatar src={data?.profilePictureURL} />
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
        <TextField
          value={state.context.content}
          onChange={(e) =>
            send({ type: "typed", content: e.target.value.substring(0, 400) })
          }
          placeholder="Share your thoughts..."
          autoFocus
          multiline
        />
        <Box
          display="flex"
          alignItems="center"
          pt={2}
          justifyContent="space-between"
        >
          <Button
            onClick={() => send({ type: "discard" })}
            variant="outlined"
            className={classes.discardBtn}
          >
            Discard
          </Button>
          <Typography className={classes.contentLimitIndicator}>
            {contentLength}/400
          </Typography>
          <Button
            onClick={() => send({ type: "done" })}
            disabled={state.context.content.length < 1}
            variant="contained"
            color="primary"
          >
            Share
          </Button>
        </Box>
      </Paper>
    );
  return null;
}

export default NewPost;
