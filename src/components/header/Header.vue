<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">{{ topic }}</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <app-search></app-search>
        <ul class="navbar-nav mt-2 mt-lg-0">
          <li class="nav-item">
            <app-favourites-nav-btn v-on:toggle="toggle"></app-favourites-nav-btn>
         </li>
        </ul>
      </div>
    </nav>
    <app-favourites-list :show="show"></app-favourites-list>
  </header>
</template>

<script>
import Search from '@/components/header/search/Search'
import FavouritesNavBtn from '@/components/header/favourites/FavouritesNavBtn'
import FavouritesList from '@/components/header/favourites/FavouritesList'

export default {
  name: 'Header',
  components: {
    AppSearch: Search,
    AppFavouritesNavBtn: FavouritesNavBtn,
    AppFavouritesList: FavouritesList
  },
  data () {
    return {
      topic: 'iTunes Catalog',
      show: false
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>
header {
  position: relative;
}
.navbar-brand {
  color: white !important;
}
.nav-item {
  position: relative;
}
</style>
