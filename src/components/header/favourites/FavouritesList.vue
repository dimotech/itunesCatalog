<template>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
    <div class="container" id="favouritesList" v-if="show">
      <div class="adjustPadding" v-if="favouritesCount > 0">
        <template class="adjustPadding" v-for="item in favouritesList">
          <item-favourites :key="item.id" :item="item"></item-favourites>
        </template>
      </div>
      <div class="adjustPadding" v-else>
        <p class="hint">You haven't picked any.</p>
        <p class="hint">Search for your favourites.</p>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import ItemFavourites from '@/components/item/ItemFavourites'
import Velocity from 'velocity-animate'

export default {
  name: 'FavouritesList',
  components: {
    ItemFavourites
  },
  props: ['show'],
  computed: mapState([
    'favouritesCount',
    'favouritesList'
  ]),
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el) {
      Velocity(el, 'fadeIn', { duration: 200 })
    },
    leave: function (el) {
      Velocity(el, 'fadeOut', { duration: 200 })
    }
  }
}
</script>

<style scoped>
#favouritesList {
  border: 1px solid #fbfbfb;
  position: absolute;
  right: 0px;
  background: #343a40;
  width: 241px;
  border-radius: 0.25rem;
  z-index: 9;
  min-height: 91px;
  max-height: 360px;
  overflow: scroll;
}
.hint {
  color: white;
}
.adjustPadding {
  padding: 10px;
}
</style>
