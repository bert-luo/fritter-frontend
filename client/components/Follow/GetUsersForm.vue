<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetUsersForm',
  mixins: [InlineForm],
  data() {
    return {value: this.$store.state.userFilter}; // change
  },
  methods: {
    async submit() {
      const url = this.value ? `/api/freets?author=${this.value}` : '/api/freets'; // change
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateUserFilter', this.value); // change
        
      } catch (e) {
        if (this.value === this.$store.state.userFilter) { // change
          // This section triggers if you filter to a user but they
          // change their username when you refresh
          this.$store.commit('updateUserFilter', null); //change bottom 3 
          this.value = ''; // Clear filter to show all users' freets
          this.$store.commit('refreshUsersShown');
        } else {
          // Otherwise reset to previous fitler
          this.value = this.$store.state.userFilter; // change
        }

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
