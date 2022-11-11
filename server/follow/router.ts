import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FollowCollection from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as followValidator from './middleware';
import * as util from './util';

const router = express.Router();

//TODO: get all followers/following

/**
 * Create a new follow.
 *
 * @name POST /api/follow
 *
 * @param {string} following - who the current user wants to follow
 * @return {FollowResponse} - The created follow
 * @throws {403} - If the user is not logged in //TODO 
 * @throws {400} - If the follow already exists
 * @throws {404} - If the followed user does not exist
 */
 router.post(
    '/', // the username of the user to follow
    [
      userValidator.isUserLoggedIn,
      followValidator.isFollowSelf,
      followValidator.isFollowNotExists,
      followValidator.isFollowingUserExists,
    ],
    async (req: Request, res: Response) => {
      const userId = (req.session.userId as string) ?? '';
      const following = await UserCollection.findOneByUsername(req.params.username); 
      const follow = await FollowCollection.addOne(userId, following._id); 
      res.status(201).json({
        message: 'You successfully followed the user.',
        follow: util.constructFollowResponse(follow)
      });
    }
  );
  
  /**
   * Delete a follow
   *
   * @name DELETE /api/follows/:id
   *
   * @return {string} - A success message
   * @throws {403} - If the user is not logged in
   * @throws {400} - If the follow doesn't already exist
   */
  
  router.delete(
    '/', // the username of the user to unfollow 
    [
      userValidator.isUserLoggedIn,
      //followValidator.isFollowedUserExists,
      //followValidator.isFollowExists, 
    ],
    async (req: Request, res: Response) => {
      const userId = (req.session.userId as string) ?? '';
      const following = await UserCollection.findOneByUsername(req.body.username);
      const unfollow = await FollowCollection.deleteOne(userId, following._id); 
      res.status(201).json({
        message: 'You successfully unfollowed the user.'
      });
    }
  );
  
  export {router as followRouter};