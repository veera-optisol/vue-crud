<template>
    <button v-if="!link">{{ title }}</button>
    <router-link v-else :to="to">
        <slot></slot>
        {{ title }}
    </router-link>
</template>

<script>
export default {
    props: ['title', 'link', 'to'],
}
</script>

<style lang="scss" scoped>
 button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #ff2549;
  border: 1px solid #ff2549;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  transition: .5s ease all;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #52101b;
  border-color: #52101b;
}
</style>