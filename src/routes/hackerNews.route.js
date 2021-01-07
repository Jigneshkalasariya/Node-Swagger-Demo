const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express();

const hackernewsService = require("../services/hackerNews.service");

/**
 * @swagger
 * definitions:
 *  Post:
 *   type: object
 *   properties:
 *    title:
 *     type: string
 *     description: title of the post
 *     example: 'A half-hour to learn Rust'
 *    website:
 *     type: string
 *     description: url of the website
 *     example: 'https://fasterthanli.me/articles/a-half-hour-to-learn-rust'
 *  PostId:
 *   type: object
 *   properties:
 *    postId:
 *     type: string
 *     description: post id
 *     example: '5fed9cb195147f590469da31'
 */

/**
 * @swagger
 * /api/hackernews/seed:
 *  get:
 *   summary: Fetch data from HackerNews
 *   description: calls hackerNews api to fetch data from the server
 *   tags: [HackerNewsdata]
 *   parameters:
 *    - in: body
 *   responses:
 *    200:
 *     description: Seeding data from Hackernews
 */
router.get("/seed", hackernewsService.seed);

/**
 * @swagger
 * /api/hackernews/list?limit=5&skip=2:
 *  get:
 *   security:
 *     - ApiKeyAuth: []
 *   summary: Fetch data from our server(Protected Route)
 *   description: This API sends back the data that is stored in our server, this is a authenticated route need to pass access token, you can limit the number of results by pass limit=number in query params, same for skip
 *   tags: [HackerNewsdata]
 *   parameters:
 *    - in: body
 *   responses:
 *    200:
 *     description: Data fetch success
 */
router.get("/list", auth, hackernewsService.getList);

/**
 * @swagger
 * /api/hackernews/newpost:
 *  post:
 *   security:
 *     - ApiKeyAuth: []
 *   summary: Add a new post to our server(Protected Route)
 *   description: This API sends back the data that is stored in our server, this is a authenticated route need to pass access token, you can limit the number of results by pass limit=number in query params, same for skip
 *   tags: [HackerNewsdata]
 *   requestBody:
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/definitions/Post'
 *   responses:
 *    200:
 *     description: New post created succesfully
 */
router.post("/newpost", auth, hackernewsService.createNewPost);

/**
 * @swagger
 * /api/hackernews/upvote:
 *  post:
 *   security:
 *     - ApiKeyAuth: []
 *   summary: To upvote a specific post(Protected Route)
 *   description: user can up vote a post file they like it
 *   tags: [HackerNewsdata]
 *   requestBody:
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/definitions/PostId'
 *   responses:
 *    200:
 *     description: post upvoted   succesfully
 */
router.post("/upvote", auth, hackernewsService.upvote);

module.exports = router;
