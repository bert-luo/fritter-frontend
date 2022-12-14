import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Like, PopulatedLike} from './model';

// Update this if you add a property to the Freet type!
type LikeResponse = {
    userId: String;
    parentPostId:  String; 
    dateLiked: Date;
};


/**
 * Transform a raw Follow object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Like>} like - A follow
 * @returns {LikeResponse} - The follow object formatted for the frontend
 */
const constructLikeResponse = (like: HydratedDocument<PopulatedLike>): LikeResponse => {
  const likeCopy: PopulatedLike = {
    ...like.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  
  return {
    userId: likeCopy.user.username, 
    parentPostId: String(likeCopy.parentPost._id), 
    dateLiked: likeCopy.dateLiked
  };
};

export {
  constructLikeResponse
};