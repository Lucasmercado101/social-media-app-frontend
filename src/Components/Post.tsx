import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  makeStyles
} from "@material-ui/core";
import { formatRelative } from "date-fns";

function prettyDate(date: Date) {
  const delta = +Date.now() - +date;

  const minute = 60,
    hour = minute * 60,
    day = hour * 24;

  if (delta < 30) {
    return "just now.";
  } else if (delta < minute) {
    return delta + " seconds ago.";
  } else if (delta < 2 * minute) {
    return "a minute ago.";
  } else if (delta < hour) {
    return Math.floor(delta / minute) + " minutes ago.";
  } else if (Math.floor(delta / hour) === 1) {
    return "1 hour ago.";
  } else if (delta < day) {
    return Math.floor(delta / hour) + " hours ago.";
  } else if (delta < day * 2) {
    return "yesterday";
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
  profilePictureUrl?: string;
  // username: string;
  postedAt: Date;
  image?: string;
  body: string;
  authorId: number;
  author: string;
}
const Post: React.FC<postProps> = ({
  postedAt,
  profilePictureUrl,
  author,
  image,
  body
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.postContainer}>
      <CardHeader
        avatar={<Avatar src={profilePictureUrl} />}
        title={author}
        subheader={prettyDate(postedAt)}
      />

      <CardContent>{body}</CardContent>
      {image && (
        <CardMedia style={{ height: 300 }} image={image} title="Paella dish" />
      )}
    </Card>
  );
};

export default Post;
