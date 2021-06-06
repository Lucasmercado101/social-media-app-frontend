import Post from "./Post";
import { makeStyles, CircularProgress, Box } from "@material-ui/core";
import { subDays } from "date-fns";
import NewPost from "./NewPost/NewPost";
import { useInfiniteQuery } from "react-query";
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
    ({ pageParam = 1 }) => getExplore({ limit: 15, page: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next?.page
    }
  );
  const classes = useStyles();

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <NewPost />
      </div>
      {data &&
        data.pages.map(({ results }) => (
          <ul className={classes.exploreColumnList}>
            {results.map(({ authorId, content, createdAt, id }) => (
              <li key={id}>
                <Post
                  authorId={authorId}
                  body={content}
                  postedAt={new Date(createdAt)}
                />
              </li>
            ))}
          </ul>
        ))}

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
