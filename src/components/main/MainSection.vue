<template>
  <div id="mainSection">
    <div v-if="!noResults">
      <template v-for="kind in Object.keys(formattedData)">
        <category :category="kind" :res="formattedData[kind]" :key="kind"></category>
      </template>
    </div>
    <div v-else>
      <p class="noMatched">There is no results matched.</p>
    </div>
  </div>
</template>

<script>
import Category from '@/components/category/Category'

export default {
  name: 'MainSection',
  components: {
    Category
  },
  computed: {
    noResults: function () {
      return Object.keys(this.$store.state.formattedRes).length === 0
    }
  },
  props: ['formattedData', 'name']
}
</script>

<style scoped>
#mainSection {
  max-width: 1200px;
  margin: 20px auto 60px;
}
.noMatched {
  margin-top: 200px;
  font-weight: bolder;
  font-size: 18px;
}
</style>
