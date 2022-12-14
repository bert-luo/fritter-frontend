import type {HydratedDocument, Types} from 'mongoose';
import type {Like, PopulatedLike} from './model';
import LikeModel from './model';

import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';

/**
 * This files contains a class that has the functionality to explore freets
 * stored in MongoDB, including adding, finding, updating, and deleting freets.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Freet> is the output of the FreetModel() constructor,
 * and contains all the information in Freet. https://mongoosejs.com/docs/typescript.html
 * 
 * Actions: 
 *  add new like 
 *  find by Like ID
 *  delete like by ID
 * 
 *  find all freet likes 
 *  
 */
class LikeCollection {

  /**
   * Add a Like to the collection
   *
   * @param {string} freetId - The id of the author of the freet
   * @param {string} userId - The id of the content of the freet
   * @return {Promise<HydratedDocument<Like>>} - The newly created freet
   */
  static async addOne(freetId: Types.ObjectId | string, userId: string): Promise<HydratedDocument<PopulatedLike>> {
    //const user = await UserCollection.findOneByUserId(userId);
    //const freet = await FreetCollection.findOne(freetId);
    const date = new Date();

    const newLike = new LikeModel({
      user: userId, 
      parentPost: freetId, 
      dateLiked: date
    });
    await newLike.save(); // Saves freet to MongoDB
    return newLike.populate('user', 'parentPost');
  }

  /**
   * Find a Like by likeId
   *
   * @param {string} likeId - The id of the freet to find
   * @return {Promise<HydratedDocument<Like>> | Promise<null> } - The freet with the given freetId, if any
   */
  static async findOneById(likeId: Types.ObjectId | string): Promise<HydratedDocument<PopulatedLike>> {
    return LikeModel.findOne({_id: likeId}).populate('user','parentPost','dateLiked');
  }

  /**
   * Find a Like by freetId and userId
   *
   * @param {string} freetId - The id of the Freet that was liked
   * @param {string} userId - The id of the user that liked the Freet
   * @return {Promise<HydratedDocument<Like>> | Promise<null> } - The freet with the given freetId, if any
   */
   static async findOne(freetId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<HydratedDocument<PopulatedLike>> {
    const freet = FreetCollection.findOne(freetId); 
    const user = UserCollection.findOneByUserId(userId);
    return LikeModel.findOne({parentPost: freetId, user: userId}).populate('user','parentPost');
  }

  /**
   * Find all likes for a certain freet
   *
   * @param {string} freetId - The id of the Freet that was liked
   * @return {Promise<HydratedDocument<Like>> | Promise<null> } - The freet with the given freetId, if any
   */
 static async findAll(freetId: Types.ObjectId | string): Promise<Array<HydratedDocument<PopulatedLike>>> {
  const freet = FreetCollection.findOne(freetId); 
  return LikeModel.find({parentPost: freetId}).populate('user');
}

  /**
   * Delete a Like with given likeId.
   *
   * @param {string} likeId - The freetId of freet to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */
   static async deleteOne(freetId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<boolean> {
    const like = await LikeModel.deleteOne({parentPost: freetId, user: userId});
    return like !== null;
  }


}

export default LikeCollection;
