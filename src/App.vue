<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@keyframes wiggle {
  0% { transform: rotate(0deg); }
  80% { transform: rotate(0deg); }
  85% { transform: rotate(10deg); }
  95% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
}
.wiggle {
  animation: wiggle 0.5s 2;
}
</style>
