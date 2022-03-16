<template>
<the-header></the-header>
 <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
      </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
export default {
  components: {
    TheHeader
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://css.gg/trash.css');

* {
  box-sizing: border-box;
}

li {list-style: none;}

a {transition: .5s ease all;}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
    opacity: 0;
    transform: translateY(-30px);
}
.route-leave-to{
    opacity: 0;
    transform: translateY(30px);
}
.route-enter-active{
    transition: .3s ease all;
}
.route-leave-active{
    transition: .3s ease all;
}
.route-enter-to,
.route-leave-from{
    opacity: 1;
    transform: translateY(0);
}
</style>
