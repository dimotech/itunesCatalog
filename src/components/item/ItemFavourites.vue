<template>
  <div class="row favouritesItem">
    <div class="col-md-3 adjustPadding"><img :src="itemDetails.artwork"></div>
    <div class="col-md-7 adjustPadding">
      <p class="name">{{ itemDetails.name }}</p>
      <p class="genre">{{ itemDetails.genre }}</p>
      <p class="viewDetails"><a :href="itemDetails.url" target="_blank">View Details</a></p>
    </div>
    <div class="col-md-2">
      <i class="fas fa-heart like red" @click="toggleFavourites(itemDetails, $event)"></i>
    </div>
  </div>
</template>

<script>
import { favouritesMixin } from '@/mixins/favoritesMixin'

export default {
  name: 'ItemFavourites',
  props: ['item'],
  mixins: [favouritesMixin]
}
</script>

<style scoped>
.favouritesItem {
  border: 1px solid #eaeefb;
  margin-bottom: 10px;
  border-radius: 0.25rem;
  padding: 2px;
  color: white;
}
.favouritesItem p {
  font-size: 12px;
  margin-bottom: 0px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}
p.name {
  margin-top: -5px;
  font-weight: bolder;
}
p.genre {
  margin-top: -3px;
  color: gray;
}
.favouritesItem:hover p.name {
  color: black;
}
.favouritesItem:hover {
  background: white;
}
.favouritesItem img {
  width: 100%;
  max-height: 43px;
}
.adjustPadding {
  padding: 5px;
}
.red {
  color: red;
}
.gray {
  color: gray;
}
i.gray:hover {
  color: #007bff;
}
</style>
