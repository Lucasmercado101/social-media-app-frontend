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
import { useInfiniteQuery, useQuery } from "react-query";
import { useRouteMatch, useHistory } from "react-router-dom";
import { getPublicUserData, getPublicUserPostsPaginated } from "../api";
import Post from "../Components/Post";

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

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery(
    "explore",
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
  //TODO: do something if this profile is the logged in user's one
  // redirect them to their own, and in Post.jsx
  // prevent them from redirecting here
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
  });

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
                User: { firstName, lastName, profilePictureURL }
              }) => (
                <li key={id}>
                  <Post
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
    </div>
  );
}

export default UserProfile;
