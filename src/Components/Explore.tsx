import Post from "./Post";
import { makeStyles, CircularProgress, Box } from "@material-ui/core";
import NewPost from "./NewPost/NewPost";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { getExplore } from "../api";

const useStyles = makeStyles((theme) => ({
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

function Explore() {
  const queryClient = useQueryClient();
  const { data, isFetching, isFetchingNextPage } = useInfiniteQuery(
    "explore",
    ({ pageParam = 1 }) => getExplore({ limit: 15, page: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next?.page,
      onSuccess(e) {
        e.pages?.map((e) => {
          e.results.forEach((item) => {
            queryClient.setQueryData(["user data", String(item.id)], item.User);
          });
        });
      }
    }
  );
  const classes = useStyles();

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <NewPost />
      </div>
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

      {(isFetching || isFetchingNextPage) && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress size={60} />
        </Box>
      )}
      {/* <div className={classes.feedColumn}>
        {dummyData.map(({ profilePic, id, username, body, contentImage }) => (
          <Post
            username={username}
            date={subDays(new Date(), 4 * id)}
            key={id}
            body={body}
            image={contentImage}
            profilePictureUrl={profilePic}
          />
        ))}
      </div> */}
    </div>
  );
}

export default Explore;
