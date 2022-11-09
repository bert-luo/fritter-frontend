<template>
  <article
    class="user"
  >
    <header>
      <h3 class="username">
        @{{ user.username }}
      </h3>
    </header>
    
    <button
        v-if="!followed"
        @click="follow">

    </button>
    <button
        v-if="followed"
        @click="unfollow">

    </button>

  </article>
</template>


<script>
export default {
  name: 'UserComponent',
  props: {
    // Data from the stored freet
    user: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      followed: false
    };
  },
  methods: {
      follow(){
          this.followed = true; 
      },
      
      unfollow(){
          this.followed = false; 
      }
  }
}
  </script>

<style scoped>
.user {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}
</style>