<template>
  <div :id="itemDetails.id" class="itemDiv">
    <i class="far fa-heart like" @click="toggleFavourites(itemDetails, $event)"></i>
    <div class="col imageDiv">
      <a target="_blank" :href="itemDetails.url">
        <img class="artwork" :src="itemDetails.artwork"/>
      </a>
    </div>
    <p class="name">{{ itemDetails.name }}</p>
    <p class="genre">{{ itemDetails.genre }}</p>
    <p class="viewDetails"><a target="_blank" :href="itemDetails.url">View Details</a></p>
  </div>
</template>

<script>
import { favouritesMixin } from '@/mixins/favoritesMixin'

export default {
  name: 'Item',
  props: ['item'],
  mixins: [favouritesMixin]
}
</script>

<style scoped>
.itemDiv {
  border: 1px solid #eaeefb;
  box-shadow: 0 1px 2px hsla(0,0%,39%,.2);
  padding: 20px 1px 10px;
  position: relative;
  border-radius: 5px;
  background-color: #fbfbfb;
  margin-bottom: 15px;
}
.itemDiv img {
  border-radius: 0.25rem;
  width: 100%;
  max-width: 100px;
  max-height: 100px;
}
.itemDiv:hover {
  background: #efefef;
}
.itemDiv:hover img {
  -moz-transform: scale(1.05);
  -webkit-transform: scale(1.05);
  -o-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -webkit-transform: scale(1.05);
  transform: scale(1.05);

  -webkit-transition: transform .2s ease-in-out;
  -moz-transition:transform .2s ease-in-out;
  -ms-transition:transform .2s ease-in-out;
}
.imageDiv {
  min-height: 100px;
}
p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
  margin: 0px auto 1px;
}
p.name {
  font-weight: bolder;
  font-size: 15px;
  margin-top: 10px;
}
p.genre {
  color: gray;
  font-size: 12px;
  margin-top: 1px;
}
p.viewDetails {
  font-size: 12px;
}
i.like {
  position: absolute;
  top: 5px;
  right: 5px;
  color: lightgray;
  cursor: pointer;
}
.red {
  color: red !important;
}
</style>
