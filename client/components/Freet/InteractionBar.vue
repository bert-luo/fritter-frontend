<template>
    <section
    class="bar"
  >
        <button 
            v-if="!liked"
            @click="likeFreet">
            ❤️ Like
        </button>
        <button 
            v-if="liked"
            @click="unlikeFreet">
            :( unlike
        </button>
        
        <p class="likecount">
            {{ this.numlikes }}
        </p>
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

beforeCreate(){
    // get num likes??
    const url =  `/api/like/${state}/freets`; //update
    const res = await fetch(url).then(async r => r.json());
    //allLikes = res;

  },

data() {
    return {
      liked: liked, // whether freet has been liked by current user 
      numLikes: numLikes //allLikes.length // total number of likes on post 
    };
  },

  methods: {
    likeFreet(){
      /**
       * current user likes Freet
       */
      this.liked = true; 
      this.numLikes += 1; 

    },
    unlikeFreet(){
      /**
       * current user unlikes Freet
       */
      this.liked = false;
      this.numLikes -= 1;

    },
  }
}

