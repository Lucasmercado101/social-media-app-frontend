import { Avatar, Typography, makeStyles, Box } from "@material-ui/core";
import { getMyUserData } from "../api";
import { useQuery } from "react-query";

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    margin: "auto",
    marginTop: -75,
    width: 150,
    height: 150,
    aspectRatio: "1/1"
  },
  userBanner: ({ userBanner }: { userBanner: string }) => ({
    height: 150,
    width: "100%",
    position: "relative",
    backgroundPosition: "center",
    backgroundSize: "cover",
    ...(userBanner
      ? { backgroundImage: "url(https://picsum.photos/id/214/1000/1000)" }
      : {
          backgroundColor: theme.palette.primary.dark
        })
  })
}));

function Profile() {
  const { data } = useQuery("my user data", getMyUserData);
  const classes = useStyles({ userBanner: "" });

  return (
    <div>
      <div className={classes.userBanner} />
      <Avatar
        classes={{ root: classes.avatarRoot }}
        // src="https://picsum.photos/id/257/1000/1000"
      />
      <Box mt={1}>
        <Typography align="center" variant="h4">
          {data?.username}
        </Typography>
      </Box>
    </div>
  );
}

export default Profile;
