const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express();

const authService = require("../services/auth.service");

/**
 * @swagger
 * definitions:
 *  Account:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: name of the user
 *     example: 'username'
 *    password:
 *     type: string
 *     description: password for the account
 *     example: 'password'
 *  Token:
 *   type: object
 *   properties:
 *    accessToken:
 *     type: string
 *     description: access token is a token given as response when the user logins or registers
 *     example: 'accessToken'
 *    refreshToken:
 *     type: string
 *     description: refresh token is a token given as response when the user logins or registers
 *     example: 'refreshToken'
 */

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *   summary: create user
 *   description: create a new user
 *   tags: [Users]
 *   requestBody:
 *      content:
 *         application/json:
 *            schema:
 *               $ref: '#/definitions/Account'
 *   responses:
 *    200:
 *     description: user created succesfully
 */
router.post("/register", authService.register);
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *   summary: user login
 *   description: register user can login
 *   tags: [Users]
 *   requestBody:
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/definitions/Account'
 *   responses:
 *    200:
 *     description: user login succesfully
 */
router.post("/login", authService.login);

/**
 * @swagger
 * /api/auth/refreshToken:
 *  post:
 *   summary: To refresh access token
 *   description: autherised users can renew their access token using refresh token
 *   tags: [Users]
 *   requestBody:
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/definitions/Token'
 *   responses:
 *    200:
 *     description: new access token generated
 */
router.post("/refreshToken", authService.refreshToken);

module.exports = router;