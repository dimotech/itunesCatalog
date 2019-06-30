<template>
  <div class="hello">
    <app-header></app-header>
    <main-section :formattedData="formattedRes"></main-section>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { lazyloadFavoritesMixin } from '@/mixins/lazyloadFavoritesMixin'
import { mapState } from 'vuex'
import { FetchApi } from '@/FetchApi.js'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import MainSection from '@/components/main/MainSection'

export default {
  name: 'MainPage',
  components: {
    AppHeader: Header,
    AppFooter: Footer,
    MainSection
  },
  mixins: [lazyloadFavoritesMixin],
  data () {
    return {}
  },
  mounted () {
    this.fetchITunesData()
  },
  created () {
    setTimeout(() => {
      this.updateFavourites()
    }, 1000)
  },
  computed: mapState([
    'formattedRes'
  ]),
  methods: {
    async fetchITunesData () {
      const FetchApiInst = new FetchApi(this.$axios)
      let data = await FetchApiInst.fetch()
      this.$store.state.formattedRes = data
    }
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: 30px;
  font-size: 28px;
}
</style>
