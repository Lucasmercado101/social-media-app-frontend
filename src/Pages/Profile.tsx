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
import { Link, useHistory } from "react-router-dom";

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
  const history = useHistory();

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

      <Box clone mx={2} mt={2}>
        <List>
          <ListItem to="/home/profile/friends" component={Link} button>
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

          <ListItem
            onClick={() => logOut().then(() => history.replace("/login"))}
            button
          >
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
    </Box>
  );
}

export default Profile;
