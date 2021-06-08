import {
  Avatar,
  Typography,
  makeStyles,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "@material-ui/core";
import { getMyUserData, logOut } from "../api";
import { useQuery } from "react-query";
import GroupIcon from "@material-ui/icons/Group";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";

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
        src={data?.profilePictureURL}
      />
      <Box mt={1}>
        <Typography align="center" variant="h4">
          {data?.firstName + " " + data?.lastName}
        </Typography>
      </Box>

      <Box clone mx={2}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Friends" />
            <ListItemSecondaryAction>
              <Box display="flex" alignItems="center">
                <ChevronRightIcon />
              </Box>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem to="/home/profile/edit" component={Link} button>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
            <ListItemSecondaryAction>
              <Box display="flex" alignItems="center">
                <ChevronRightIcon />
              </Box>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem component={Link} to="/" onClick={() => logOut()} button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
            <ListItemSecondaryAction>
              <Box display="flex" alignItems="center">
                <ChevronRightIcon />
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>

      {/*       

      {!data?.profilePictureURL ? (
        <Box px={5} my={10} display="flex" flexDirection="column">
          <Typography align="center" variant="h6">
            <i>Fill out your profile so people can easily find you.</i>
          </Typography>
          <Box clone mx="auto" mt={2}>
            <Button
              component={Link}
              to="/home/profile/edit"
              variant="contained"
              color="primary"
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            component={Link}
            to="/home/profile/edit"
            variant="contained"
            color="primary"
          >
            Edit Profile
          </Button>
        </Box>
      )} */}
    </Box>
  );
}

export default Profile;
