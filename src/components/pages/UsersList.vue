<template>
  <div>
    <base-container>
      <section>
        <h1>User List</h1>
        <div class="search-wrapper">
          <label>Search Name:</label>
          <input type="text" v-model="search" placeholder="Search name.." />
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else>
          <user-item v-for="user in filteredList" :key="user.id" :user="user">
          </user-item>
        </ul>
      </section>
    </base-container>
  </div>
</template>

<script>
import UserItem from "../users/UserItem.vue";

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      search: "",
    };
  },
  created() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("fetchUsers");
      } catch (error) {
        this.error = error.message || "Failed to fetch users";
      }
      this.isLoading = false;
    },
  },
  computed: {
    loadedUsers() {
      return this.$store.getters.users;
    },
    filteredList() {
      return this.loadedUsers.filter((user) => {
        if (user.firstName) {
          return (
            user.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
            user.lastName.toLowerCase().includes(this.search.toLowerCase())
          );
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  padding: 15px 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  label {
    font: inherit;
    font-weight: 500;
    margin-right: 15px;
  }
  input {
    height: 35px;
    padding: 10px;
    border: none;
    outline: none;
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.1);
  }
}
h1 {
  text-align: center;
}
ul {
  padding: 0;
}
</style>
