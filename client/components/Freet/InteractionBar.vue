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
      likedState: this.liked, //liked, // whether freet has been liked by current user 
      numLikesState: this.numLikes //numLikes //allLikes.length // total number of likes on post 
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
      const params = {
                method: 'POST',
                message: 'Successfully liked freet!',
                body: JSON.stringify({freetId: this.freetId}),
                callback: () => {
                    this.$set(this.alerts, params.message, 'success');
                    setTimeout(() => this.$delete(this.alerts, params.message), 3000);
                }
            };
        this.request(params);

    },
    unlikeFreet(){
      /**
       * current user unlikes Freet
       */
      console.log("unliked");
      this.likedState = false;
      this.numLikesState -= 1;
      const params = {
                method: 'DELETE',
                message: 'Successfully unliked freet!',
                body: JSON.stringify({freetId: this.freetId}),
                callback: () => {
                    this.$set(this.alerts, params.message, 'success');
                    setTimeout(() => this.$delete(this.alerts, params.message), 3000);
                }
            };
        this.request(params);

    },

    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/likes/${this.freetId}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshLikes');
        this.$store.commit('refreshFreets');

        params.callback();
      } catch (e) {
      }
    }
      
  }
};
</script>

