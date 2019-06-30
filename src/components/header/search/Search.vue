<template>
  <form class="form-inline ml-auto my-2 my-lg-0">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" v-model.lazy="term">
    <button id="searchBtn" class="btn btn-outline-light text-white my-2 my-sm-0" @click="doFetch">Search</button>
  </form>
</template>

<script>
import { FetchApi } from '@/FetchApi.js'
import { lazyloadFavoritesMixin } from '@/mixins/lazyloadFavoritesMixin'

export default {
  name: 'Search',
  data () {
    return {
      term: ''
    }
  },
  mixins: [lazyloadFavoritesMixin],
  methods: {
    async doFetch (e) {
      e.preventDefault()
      const FetchApiInst = new FetchApi(this.$axios)
      FetchApiInst.termSetter = this.term
      let data = await FetchApiInst.fetch()
      this.$store.state.formattedRes = data
      this.term = ''
      setTimeout(() => {
        this.updateFavourites()
      }, 1000)
    }
  }
}
</script>

<style scoped>
.form-control:focus {
  border-color: white !important;
  box-shadow: 0 0 0 0.2rem #495057 !important;
}
#searchBtn:hover {
  color: black !important;
}
</style>
