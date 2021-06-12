import { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
  Box,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  CircularProgress
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import {
  getAllTypeFriends,
  removeFriendRequestSentToUser,
  removePendingFriendRequest,
  acceptFriendRequest,
  removeBefriendedFriend
} from "../api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

function Friends() {
  const queryClient = useQueryClient();
  const removePendingFriend = useMutation(
    (userId: number) => removePendingFriendRequest(userId),
    {
      onSettled() {
        queryClient.invalidateQueries("my user friends");
      }
    }
  );
  const removeSentFriendRequest = useMutation(
    (userId: number) => removeFriendRequestSentToUser(userId),
    {
      onSettled() {
        queryClient.invalidateQueries("my user friends");
      }
    }
  );
  const acceptFriendRequestMutation = useMutation(
    (userId: number) => acceptFriendRequest(userId),
    {
      onSettled() {
        queryClient.invalidateQueries("my user friends");
      }
    }
  );
  const removeFriend = useMutation(
    (userId: number) => removeBefriendedFriend(userId),
    {
      onSettled() {
        queryClient.invalidateQueries("my user friends");
      }
    }
  );
  const history = useHistory();
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
  });

  const { data: friendsData, isLoading: isLoadingFriendsData } = useQuery(
    "my user friends",
    getAllTypeFriends
  );

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_: React.ChangeEvent<{}>, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  return (
    <div>
      <AppBar position="sticky" elevation={scrolled ? 4 : 0}>
        <Toolbar>
          <Box clone mr={1}>
            <IconButton
              onClick={() =>
                history.length > 1
                  ? history.goBack()
                  : history.push("/home/profile")
              }
              edge="start"
              color="inherit"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography variant="h6">Friends</Typography>
        </Toolbar>
      </AppBar>
      {isLoadingFriendsData ? (
        <Box mt={5} display="flex" justifyContent="center">
          <CircularProgress size={50} />
        </Box>
      ) : (
        <>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Friends" />
            <Tab label="Sent" />
            <Tab label="Pending" />
          </Tabs>
          {tabValue === 0 && (
            <List>
              {friendsData?.friends.map((friend) => (
                <FriendListItem
                  key={friend.id}
                  onRemove={() => removeFriend.mutate(friend.id)}
                  data={friend}
                />
              ))}
            </List>
          )}
          {tabValue === 1 && (
            <List>
              {friendsData?.friendRequestsSent.map((friend) => (
                <FriendListItem
                  key={friend.id}
                  data={friend}
                  onRemove={() => removeSentFriendRequest.mutate(friend.id)}
                />
              ))}
            </List>
          )}
          {tabValue === 2 && (
            <List>
              {friendsData?.friendRequestsPending.map((friend) => (
                <FriendListItem
                  key={friend.id}
                  data={friend}
                  onRemove={() => removePendingFriend.mutate(friend.id)}
                  secondaryActions={
                    <IconButton
                      onClick={() =>
                        acceptFriendRequestMutation.mutate(friend.id)
                      }
                      size="small"
                      edge="end"
                    >
                      <CheckIcon />
                    </IconButton>
                  }
                />
              ))}
            </List>
          )}
        </>
      )}
    </div>
  );
}

export default Friends;

function FriendListItem({
  data,
  secondaryActions,
  onRemove
}: {
  data: {
    firstName: string;
    lastName: string;
    profilePictureURL?: string | undefined;
    id: number;
  };
  secondaryActions?: React.ReactElement;
  onRemove: () => void;
}) {
  const { firstName, lastName, profilePictureURL, id } = data;

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={profilePictureURL} />
      </ListItemAvatar>
      <ListItemText>{firstName + "" + lastName}</ListItemText>
      <ListItemSecondaryAction style={{ display: "flex", gap: 16 }}>
        {secondaryActions}
        <IconButton onClick={onRemove} size="small" edge="end">
          <CloseIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
