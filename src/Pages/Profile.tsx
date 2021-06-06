import { Avatar, Typography, makeStyles, Box, Button } from "@material-ui/core";
import { getMyUserData } from "../api";
import { useQuery } from "react-query";

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

function Profile() {
  const { data } = useQuery("my user data", getMyUserData);
  const classes = useStyles({ userBanner: "" });

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
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

      <Box px={5} my={10} display="flex" flexDirection="column">
        <Typography align="center" variant="h6">
          <i>Fill out your profile so people can easily find you.</i>
        </Typography>
        <Box clone mx="auto" mt={2}>
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
