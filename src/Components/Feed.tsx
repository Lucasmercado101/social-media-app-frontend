import Post from "./Post";
import {
  makeStyles,
  Typography,
  CircularProgress,
  Box
} from "@material-ui/core";
import NewPost from "./NewPost/NewPost";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { getFeed } from "../api";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

const useStyles = makeStyles((theme) => ({
  feedColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    paddingBottom: 15,
    padding: 0,
    margin: 0,
    listStyleType: "none"
  }
}));

function Feed() {
  const queryClient = useQueryClient();
  const { data, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      "feed",
      ({ pageParam = 1 }) => getFeed({ limit: 15, page: pageParam }),
      {
        getNextPageParam: (lastPage) => lastPage.next?.page,
        onSuccess(e) {
          e.pages?.map((e) => {
            e.results.forEach((item) => {
              queryClient.setQueryData(
                ["user data", String(item.User.id)],
                item.User
              );
            });
          });
        }
      }
    );

  useBottomScrollListener(fetchNextPage);
  const classes = useStyles();

  return (
    <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 15 }}>
        <NewPost />
      </div>
      {/* <EmptyPlaceHolder /> */}
      {data && (
        <ul className={classes.feedColumn}>
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

      {(isFetching || isFetchingNextPage) && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress size={60} />
        </Box>
      )}
    </div>
  );
}

function EmptyPlaceHolder() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        margin: "auto"
      }}
    >
      <Typography
        component="h2"
        align="center"
        style={{ fontStyle: "italic", opacity: 0.75 }}
        variant="h5"
      >
        You have no friends! <br />
        Go and add some
      </Typography>
    </div>
  );
}

export default Feed;
