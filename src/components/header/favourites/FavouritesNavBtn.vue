<template>
  <div>
    <span id="favCount" v-if="favouritesCount > 0">{{ favouritesCount }}</span>
    <button id="favBtn" class="btn btn-outline-light text-white my-2 my-sm-0" type="submit" @click="toggleShow"> <i class="fas fa-heart"></i></button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FavouritesNavBtn',
  data () {
    return {
      show: false
    }
  },
  computed: mapState([
    'favouritesCount',
    'favouritesList'
  ]),
  methods: {
    toggleShow () {
      this.show = !this.show
      this.$emit('toggle', this.show)
    }
  }
}
</script>

<style scoped>
#favBtn {
  margin-left: 20px;
}
#favBtn i {
  color: red;
}
#favCount {
  color: white;
  position: absolute;
  right: -5px;
  top: -5px;
  background: red;
  height: 18px;
  width: 18px;
  border-radius: 9px;
  font-size: 11px;
  font-weight: bolder;
  line-height: 18px;
  vertical-align: middle;
  z-index: 99;
}
</style>
