<template>
  <li>
    <div class="item row">
      <div class="text">
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
        <p><b>Qualification:</b> {{ user.qualification }}</p>
      </div>
      <div class="actions">
        <base-button
          title="View Details"
          link="true"
          :to="userLink"
        >
        </base-button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["user"],
  computed: {
    userLink() {
      return this.$route.path + "/" + this.user._id;
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  border-bottom: 1px solid #c4c4c4;
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    text-transform: capitalize;
  }
  p {
    text-transform: uppercase;
    b {
      text-transform: capitalize;
    }
  }
}
</style>
