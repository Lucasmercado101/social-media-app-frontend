import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useScrollTrigger
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useInfiniteQuery, useQuery } from "react-query";
import { useRouteMatch, useHistory } from "react-router-dom";
import {
  getMyUserData,
  getPublicUserData,
  getPublicUserPostsPaginated,
  sendFriendRequestToUser
} from "../api";
import Post from "../Components/Post";
import { useMutation } from "react-query";

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
  }),
  exploreColumnList: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    paddingBottom: 15,
    padding: 0,
    margin: 0,
    listStyleType: "none"
  }
}));

function UserProfile() {
  const history = useHistory();
  const route = useRouteMatch();
  //@ts-ignore
  const userId = route.params.userId;
  const sendFriendRequestMutation = useMutation(() =>
    sendFriendRequestToUser(userId)
  );

  const {
    data,
    isLoading: isLoadingPosts,
    isFetching
  } = useInfiniteQuery(
    ["user posts", userId],
    ({ pageParam = 1 }) =>
      getPublicUserPostsPaginated({
        limit: 15,
        page: pageParam,
        userId: userId
      }),
    {
      getNextPageParam: (lastPage) => lastPage.next?.page
    }
  );

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
  });

  const { data: myUserData, isLoading: isLoadingUserData } = useQuery(
    "my user data",
    getMyUserData
  );
  const { data: userData } = useQuery(["user data", userId], () =>
    getPublicUserData(userId)
  );

  const hasSentFriendRequest = myUserData?.friendRequestsSent.find(
    (el) => el.id === +userId
  );

  const hasPendingFriendRequest = myUserData?.friendRequestsPending.find(
    (el) => el.id === +userId
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
          {isLoadingUserData
            ? "Loading..."
            : userData?.firstName + " " + userData?.lastName}
        </Typography>
        {myUserData && myUserData?.id !== +userId && (
          <Box mt={2} display="flex" justifyContent="center">
            {hasSentFriendRequest || hasPendingFriendRequest ? (
              <Button variant="outlined" disabled>
                Friend request {hasPendingFriendRequest ? "pending" : "sent"}
              </Button>
            ) : (
              <Button
                onClick={() => sendFriendRequestMutation.mutate()}
                variant="contained"
                color="primary"
              >
                Send friend request
              </Button>
            )}
            {/* <Box clone color="error.main">
                <Button variant="outlined">Remove Friend</Button>
              </Box> */}
          </Box>
        )}
      </Box>

      <Box my={4}>
        <Typography
          style={{ textDecoration: "underline" }}
          align="center"
          variant="h5"
        >
          Posts:
        </Typography>
      </Box>

      {data && (
        <ul className={classes.exploreColumnList}>
          {data.pages.map(({ results }) =>
            results.map(
              ({
                authorId,
                content,
                createdAt,
                id,
                likes,
                dislikes,
                User: { firstName, lastName, profilePictureURL }
              }) => (
                <li key={id}>
                  <Post
                    postId={id}
                    likes={likes}
                    dislikes={dislikes}
                    authorProfilePicture={profilePictureURL}
                    author={firstName + " " + lastName}
                    authorId={authorId}
                    body={content}
                    postedAt={new Date(createdAt)}
                  />
                </li>
              )
            )
          )}
        </ul>
      )}

      {isLoadingPosts ? (
        <Box my={2} display="flex" justifyContent="center">
          <CircularProgress size={50} />
        </Box>
      ) : null}
    </div>
  );
}

export default UserProfile;
