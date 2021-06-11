import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  makeStyles,
  CardActions,
  IconButton,
  Typography,
  Box
} from "@material-ui/core";
import { formatRelative } from "date-fns";
import { Link } from "react-router-dom";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import {
  likePost,
  unLikePost,
  dislikePost,
  unDislikePost,
  getMyUserData
} from "../api";
import { useQuery, useMutation, useQueryClient } from "react-query";

function prettyDate(date: Date) {
  const delta = +Date.now() - +date;

  const minute = 60,
    hour = minute * 60,
    day = hour * 24;

  //TODO: show relative-to-date properly
  if (delta < 30) {
    return "just now.";
  } else if (delta < minute) {
    return delta + " seconds ago.";
  } else if (delta < 2 * minute) {
    return "a minute ago.";
  } else if (delta < hour) {
    return Math.floor(delta / minute) + " seconds ago.";
  } else if (Math.floor(delta / hour) === 1) {
    return "1 minute ago.";
  } else if (delta < day) {
    return Math.floor(delta / hour) + " minutes ago.";
    // } else if (delta < day * 2) {
    //   return "yesterday";
    // } else {
  } else {
    return formatRelative(date, Date.now());
  }
}

const useStyles = makeStyles((theme) => ({
  postContainer: {
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0
    }
  }
}));

interface postProps {
  authorProfilePicture?: string;
  postedAt: Date;
  image?: string;
  body: string;
  authorId: number;
  author: string;
  likes: { id: number }[];
  dislikes: { id: number }[];
  postId: number;
}
const Post: React.FC<postProps> = ({
  postId,
  postedAt,
  authorProfilePicture,
  author,
  image,
  authorId,
  body,
  likes = [],
  dislikes = []
}) => {
  const queryClient = useQueryClient();
  const { data: userData } = useQuery("my user data", getMyUserData);
  const dislikePostMutation = useMutation(() => dislikePost(postId), {
    onSuccess() {
      queryClient.invalidateQueries("explore");
      queryClient.invalidateQueries("user posts");
    }
  });
  const unDislikePostMutation = useMutation(() => unDislikePost(postId), {
    onSuccess() {
      queryClient.invalidateQueries("explore");
      queryClient.invalidateQueries("user posts");
    }
  });
  const likePostMutation = useMutation(() => likePost(postId), {
    onSuccess() {
      queryClient.invalidateQueries("explore");
      queryClient.invalidateQueries("user posts");
    }
  });
  const unLikePostMutation = useMutation(() => unLikePost(postId), {
    onSuccess() {
      queryClient.invalidateQueries("explore");
      queryClient.invalidateQueries("user posts");
    }
  });

  const userLikedThePost = likes.find((el) => el.id === userData?.id);
  const userDisikedThePost = dislikes.find((el) => el.id === userData?.id);

  const classes = useStyles();
  return (
    <Card className={classes.postContainer}>
      <CardHeader
        avatar={
          <Link to={`/home/user/${authorId}`}>
            <Avatar src={authorProfilePicture} />
          </Link>
        }
        title={author}
        subheader={prettyDate(postedAt)}
      />

      <CardContent>{body}</CardContent>
      {image && (
        <CardMedia style={{ height: 300 }} image={image} title="Paella dish" />
      )}
      <CardActions disableSpacing>
        <Box display="flex" alignItems="center">
          <Box clone color={userLikedThePost ? "primary.main" : ""}>
            <IconButton
              onClick={() => {
                userLikedThePost
                  ? unLikePostMutation.mutate()
                  : likePostMutation.mutate();
              }}
            >
              <ThumbUpIcon />
            </IconButton>
          </Box>
          <Typography>{likes.length}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            clone
            color={
              dislikes.find((el) => el.id === userData?.id)
                ? "primary.main"
                : ""
            }
          >
            <IconButton
              onClick={() => {
                userDisikedThePost
                  ? unDislikePostMutation.mutate()
                  : dislikePostMutation.mutate();
              }}
            >
              <ThumbDownIcon />
            </IconButton>
          </Box>
          <Typography>{dislikes.length}</Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Post;
