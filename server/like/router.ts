import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import LikeCollection from '../like/collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as likeValidator from '../like/middleware';
import * as util from './util';


const router = express.Router();

router.get(
  '/:freetId?',
  async (req: Request, res: Response) => {
    const FreetId = (req.params.freetId as string) ?? ''; //should be query parameter
    const likes = await LikeCollection.findAll(FreetId); // modify get all freets route: likecount bool liked

    res.status(200).json({
      message: 'Here are all likes for the given Freet',
      result: likes
    });
  }
)

/**
 * Create a new Like / like a Freet .
 *
 * @name POST /api/like
 *
 * @return {FreetResponse} - The created freet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.post(
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    likeValidator.isFreetExists,
    likeValidator.isFreetNotLiked
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const like = await LikeCollection.addOne(req.params.freetId, userId);
    res.status(201).json({
      message: 'You have successfully liked this Freet.',
      freet: util.constructLikeResponse(like)
    });
  }
);

/**
 * Delete a Like / unlike a Freet 
 *
 * @name DELETE /api/freets/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
router.delete(
  '/',
  [
    userValidator.isUserLoggedIn,
    likeValidator.isFreetExists,
    likeValidator.isFreetLiked
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    //const like = await LikeCollection.addOne(req.params.freetId, userId);
    const unlike = await LikeCollection.deleteOne(req.params.freetId, userId);
    res.status(200).json({
      message: 'You have successfully unliked this Freet.'
    });
  }
);


export {router as likeRouter};
