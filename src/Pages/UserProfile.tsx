import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useScrollTrigger
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useQuery } from "react-query";
import { useRouteMatch, useHistory } from "react-router-dom";
import { getPublicUserData } from "../api";

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    margin: "0 auto",
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

function UserProfile() {
  const history = useHistory();
  const route = useRouteMatch();
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
  });
  //@ts-ignore
  const userId = route.params.userId;

  const { data: userData } = useQuery(["user data", userId], () =>
    getPublicUserData(userId)
  );
  const classes = useStyles({ userBanner: "" });
  return (
    <div>
      <AppBar position="sticky" elevation={scrolled ? 4 : 0}>
        <Toolbar>
          <Box clone mr={1}>
            <IconButton
              onClick={() =>
                history.length > 1
                  ? history.goBack()
                  : history.push("/home/explore")
              }
              edge="start"
              color="inherit"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography variant="h6">Edit profile</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.userBanner} />
      <Avatar
        classes={{ root: classes.avatarRoot }}
        src={userData?.profilePictureURL}
      />
      <Box mt={1}>
        <Typography align="center" variant="h4">
          {userData?.firstName + " " + userData?.lastName}
        </Typography>
      </Box>
    </div>
  );
}

export default UserProfile;
