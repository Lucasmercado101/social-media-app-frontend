import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent
} from "@material-ui/core";
import { formatRelative } from "date-fns";

function prettyDate(date: Date) {
  const delta = +Date.now() - +date;

  const minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7;

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

interface postProps {
  profilePictureUrl?: string;
  username: string;
  date: Date;
  image?: string;
  body: string;
}
const Post: React.FC<postProps> = ({
  date,
  profilePictureUrl,
  username,
  image,
  body
}) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={profilePictureUrl} />}
        title={username}
        subheader={prettyDate(date)}
      />

      <CardContent>{body}</CardContent>
      {image && (
        <CardMedia style={{ height: 300 }} image={image} title="Paella dish" />
      )}
    </Card>
  );
};

export default Post;
