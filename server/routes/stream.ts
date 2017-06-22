import { Request, Response, Router } from "express";

const streamRouter: Router = Router();

streamRouter.get("/:searchTerm", (req, res, next) => {
  const searchTerm = req.params.searchTerm;
  console.log("Search term set to: " + searchTerm);
  res.twitterConnection.stream("statuses/filter", {track: searchTerm}, (stream) => {
    stream.on("data", (data) => {
      data.location = data.geo ? data.geo.coordinates : [];
      const tweet = {
        created_at: data.created_at,
        text: data.text,
        username: data.user ? data.user.screen_name : "",
        followers_count: data.user ? data.user.followers_count : "",
        following_count: data.user ? data.user.friends_count : "",
        statuses_count: data.user ? data.user.statuses_count : "",
        profile_image_url: data.user ? data.user.profile_image_url : "",
        coordinates: data.location
      };
      console.log("Tweet found at " + data.created_at);
      res.io.emit("tweet", tweet);
    });
    stream.on("error", (error) => {
      throw error;
    });
  });
});

export { streamRouter };
