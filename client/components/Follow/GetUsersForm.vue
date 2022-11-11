<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetUsersForm',
  mixins: [InlineForm],
  data() {
    return {value: this.$store.state.userFilter}; 
  },
  methods: {
    async submit() {
      const url = `/api/follows/`; // change to make dynamic 
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateUserFilter', this.value); 
        
      } catch (e) {
        if (this.value === this.$store.state.userFilter) { 
          // This section triggers if you filter to a user but they
          // change their username when you refresh
          this.$store.commit('updateUserFilter', null); //change bottom 3 
          this.value = ''; // Clear filter to show all users' freets
          this.$store.commit('refreshUsersShown');
        } else {
          // Otherwise reset to previous filter
          this.value = this.$store.state.userFilter; 
        }

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
