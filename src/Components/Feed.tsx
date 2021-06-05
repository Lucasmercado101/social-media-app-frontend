import Post from "./Post";
import { makeStyles } from "@material-ui/core";
import { subDays } from "date-fns";

const useStyles = makeStyles((theme) => ({
  feedColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    paddingBottom: 15
  }
}));

const dummyData = [
  {
    userId: 2,
    id: 2,
    username: "Samantha",
    media: "https://picsum.photos/id/167/1000/1000",
    contentImage: "https://picsum.photos/id/187/1000/1000",
    body: "qui est esse"
  },
  {
    username: "Ervin Howell",
    userId: 1,
    id: 1,
    profilePic: "https://source.unsplash.com/200x200/?face",
    body: "The Industrial Revolution and its consequences have been a disaster for the human race. They have greatly increased the life-expectancy of those of us who live in “advanced” countries, but they have destabilized society, have made life unfulfilling, have subjected human beings to indignities, have led to widespread psychological suffering (in the Third World to physical suffering as well) and have inflicted severe damage on the natural world. The continued development of technology will worsen the situation."
  },
  {
    userId: 3,
    username: "Patricia Lebsack",
    id: 3,
    profilePic: "https://picsum.photos/id/237/100/100",
    contentImage: "https://picsum.photos/id/217/1000/1000",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  }
];

function Feed() {
  const classes = useStyles();

  return (
    <div className={classes.feedColumn}>
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
    </div>
  );
}

export default Feed;
