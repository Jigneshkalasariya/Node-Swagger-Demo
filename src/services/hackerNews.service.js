const axios = require("axios");
const { findByIdAndUpdate } = require("../models/comments.model");
// const { response } = require("express");
const Comment = require("../models/comments.model");
const HackerNewsData = require("../models/hackerNews.model");
const logger = require("../config/logger");

seed = async (req, res) => {
  storyIds: [];
  var result;
  try {
    axios
      .get("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
      .then(function (response) {
        storyIds = response.data;

        storyIds.forEach((element) => {
          axios
            .get(
              "https://hacker-news.firebaseio.com/v0/item/" +
                element +
                ".json?print=pretty"
            )
            .then(async (response) => {
              try {
                result = await HackerNewsData.findOneAndUpdate(
                  { hackerId: response.data.id },
                  {
                    title: response.data.title,
                    website: response.data.url,
                    type: "story",
                    author: response.data.by,
                    points: response.data.score,
                    timeStamp: new Date(response.data.time * 1000),
                    comments: response.data.kids,
                  },
                  {
                    upsert: true,
                  }
                );

                // update comments
                if (response.data.kids != null) {
                  var comments = response.data.kids;

                  comments.forEach((element) => {
                    // console.log("comments ids");
                    // element.data;

                    axios
                      .get(
                        " https://hacker-news.firebaseio.com/v0/item/" +
                          element +
                          ".json?print=pretty"
                      )
                      .then(async (response) => {
                        // console.log("Comment");
                        // console.log(response.data);
                        var commentResult = await Comment.findOneAndUpdate(
                          { commentId: response.data.id },
                          {
                            author: response.data.by,
                            comments: response.data.kids,
                            content: response.data.text,
                            timeStamp: new Date(response.data.time * 1000),
                            parent: response.data.parent,
                            type: "comment",
                          },
                          {
                            upsert: true,
                          }
                        );
                        // console.log("comment update status");
                        // console.log(commentResult);
                        logger.info(`New post Added from HackerNews Site`);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  });
                }
              } catch (err) {
                // save post to db handle error
                console.log(
                  "save post to db handle error................................................."
                );
                // console.log(err);
              }
            })
            .catch((err) => {
              // Fetch individual post handle error
              console.log(
                "Fetch individual post handle error........................................"
              );
              // console.log(err);
            });
        });
        res.send({
          status: "Success",
          message: "Seeding completed",
        });
        // console.log(response.data);
      })
      .catch(function (error) {
        // Fetch post ids handle error
        console.log(
          "Fetch post ids handle error........................................"
        );
        // console.log(error);
      });
  } catch (err) {
    // console.log(err);
  }
};

getList = async (req, res) => {
  logger.info(`User request for data with these params : ${req.query}`);
  var skipValue = 0;
  var limitValue = 10;

  if (req.query.skip) {
    skipValue = +req.query.skip;
  }
  if (req.query.limit) {
    limitValue = +req.query.limit;
  }

  var list = await HackerNewsData.find().skip(skipValue).limit(limitValue);

  if (!list) {
    res.status(400).send({ status: "falied", data: "" });
  } else {
    res.status(200).send({ status: "success", data: list });
  }
};

createNewPost = async (req, res) => {
  logger.info(`New post request : ${req.body}`);
  const hackernews = new HackerNewsData({
    title: req.body.title,
    website: req.body.website,
    author: req.user.username,
    timeStamp: new Date(),
  });

  try {
    const result = await hackernews.save();
    logger.info("New  Post created");
    res.status(200).send({ data: result });
  } catch (e) {
    logger.info(`New  Post creation failed : ${e}`);
    res.status(400).send({ error: "failed to upload data" });
  }
};

upvote = async (req, res) => {
  logger.info(`Upvote request : ${req.body}`);
  postId = req.body.postId;
  if (!postId) {
    return res.status(400).send({ error: "Check post details" });
  }

  var post = await HackerNewsData.findById(postId);
  if (!post) {
    return res.status(400).send({ error: "Post not found" });
  }

  var hasVoted = post.localVote.includes(req.user._id);

  if (!hasVoted) {
    post.localVote = post.localVote.concat(req.user._id);
    await post.save();
    logger.info(`Upvote Success`);
    return res.status(200).send({ status: "Success", message: "Upvoted" });
  } else {
    logger.info(`Upvote Failed : User already voted`);
    return res.status(200).send({ status: "Failed", message: "Already voted" });
  }
};

module.exports = { seed, getList, createNewPost, upvote };
