<template>
    <section>
        <button 
            v-if="!likedState"
            @click="likeFreet">
            ❤️ Like
        </button>
        <button 
            v-if="likedState"
            @click="unlikeFreet">
            :( unlike
        </button>
        
        {{ numLikesState }}
    
    </section>
</template>


<script>
export default {
  name: 'InteractionBar',
  props: {
    // Data from the stored freet
    freetId: {
      type: String,
      required: true
    },
    liked: {
      type: Boolean,
      required: true
    },
    numLikes: {
      type: Number,
      required: true
    }
  },


data() {
    return {
      likedState: false, //this.liked, //liked, // whether freet has been liked by current user 
      numLikesState: 0//this.numLikes //numLikes //allLikes.length // total number of likes on post 
    };
  },

  methods: {
    likeFreet(){
      /**
       * current user likes Freet
       */
      console.log("liked");
      this.likedState = true; 
      this.numLikesState += 1; 

    },
    unlikeFreet(){
      /**
       * current user unlikes Freet
       */
      console.log("unliked");
      this.likedState = false;
      this.numLikesState -= 1;

    },
  }
}

