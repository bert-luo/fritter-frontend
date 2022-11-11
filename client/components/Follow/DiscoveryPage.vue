<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
        
      <button>
      View Following
      </button>
    </section>
    <section v-else>
      <header>
        <h2>Welcome to Fritter!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login">
            Sign in
          </router-link>
          to create, edit, and delete freets.
        </h3>
      </article>
    </section>

    <!-- Body starts here -->
    <section>
      <header>
        <div class="left">
          <h2>
            Viewing all users
            <span v-if="$store.state.filter">
              by @{{ $store.state.filter }}
            </span>
          </h2>
        </div>
        <div class="right">
          <GetUsersForm
            ref="getUsersForm"
            value="username"
            placeholder="🔍 Filter by username (optional)"
            button="🔄 Get users"
          />
        </div>
      </header>
      <section
        v-if="$store.state.freets.length"
      >
        <UserComponent
          v-for="user in $store.state.usersShown"
          :key="user.username"
          :user="user"
        />
      </section>
      <article
        v-else
      >
        <h3>No users found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import UserComponent from '@/components/Follow/UserComponent.vue';
import GetUsersForm from '@/components/Follow/GetUsersForm.vue';

export default {
  name: 'DiscoveryPage',
  components: {UserComponent, GetUsersForm},
  mounted() {
    this.$refs.GetUsersForm.submit();
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
