<template>
  <div v-if="res.length > 0">
    <div class="titleBar">
      <h3>{{ formattedCategory }}</h3>
    </div>
    <div class="container" :id="category">
      <div class="row">
        <template v-for="(item, index) in curPageContent">
          <div v-if="index < maxLimit" class="col-lg-2 col-md-3 col-sm-4" :key="item['id']">
            <item :item="item"></item>
          </div>
        </template>
      </div>
    </div>
    <div class='pageNav' v-if='curNav.length > 1'>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <template v-for='(i, index) in curNav'>
            <li class="page-item" v-if='i == ">"' @click='goNextPage()' :key='index'>
              <a class="page-link">{{ i }}</a>
            </li>
            <li class="page-item" v-else-if='i == "<"' @click='goPrevPage()' :key='index'>
              <a class="page-link">{{ i }}</a>
            </li>
            <li class="page-item" v-else @click='goAnyPage(i)' :class='{ active: curPage == i }' :key='index'>
              <a class="page-link">{{ i }}</a>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Item from '@/components/item/Item'

export default {
  name: 'Category',
  data () {
    return {
      maxLimit: 12,
      curPage: 1,
      curPageContent: '',
      curNav: []
    }
  },
  created () {
    this.buildHTML()
    this.updatePageNav()
  },
  components: {
    Item
  },
  props: ['category', 'res'],
  computed: {
    formattedCategory: function () {
      if (this.category.indexOf('Tv')) {
        return this.category.replace('tv', 'TV').replace('-', ' ')
      }
      return this.category.replace('-', ' ')
    }
  },
  watch: {
    res: function (val) {
      this.curPage = 1
      this.getCurPage(this.curPage)
      this.updatePageNav()
    },
    curPage: function (val) {
      this.getCurPage(val)
    },
    curPageContent: function (val) {
      this.updatePageNav()
    }
  },
  methods: {
    buildHTML () {
      this.getCurPage(this.curPage)
    },
    goPrevPage () {
      if (this.curPage === 1) return
      this.curPage--
    },
    goNextPage () {
      if (this.curPage === parseInt((this.res.length / this.maxLimit) + 1)) {
        return
      }
      this.curPage++
    },
    getCurPage (curPage) {
      this.curPageContent = this.res.slice((curPage - 1) * this.maxLimit, curPage * this.maxLimit)
    },
    goAnyPage (index) {
      this.curPage = index
    },
    updatePageNav () {
      this.curNav = []
      let totalPages = this.res.length % this.maxLimit === 0 ? parseInt(this.res.length / this.maxLimit) : parseInt(this.res.length / this.maxLimit) + 1
      if (totalPages > 7) {
        if (this.curPage <= 4) {
          if (this.curPage === 1) {
            this.curNav = [1, 2, 3, 4, '...', totalPages, '>']
          } else {
            this.curNav = ['<', 1, 2, 3, 4, 5, '...', totalPages, '>']
          }
        } else if (this.curPage + 4 > totalPages) {
          if (this.curPage === totalPages) {
            this.curNav = ['<', 1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
          } else {
            this.curNav = ['<', 1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages, '>']
          }
        } else {
          this.curNav = ['<', 1, '...', this.curPage - 1, this.curPage, this.curPage + 1, '...', totalPages, '>']
        }
      } else {
        for (let i = 1; i <= totalPages; i++) {
          this.curNav.push(i)
        }
        if (this.curPage === 1) {
          if (this.curPage === totalPages) return
          this.curNav.push('>')
        } else if (this.curPage === totalPages) {
          this.curNav.unshift('<')
        } else {
          this.curNav.unshift('<')
          this.curNav.push('>')
        }
      }
    }
  }
}
</script>

<style scoped>
.titleBar {
  position: relative;
  max-width: 1110px;
  margin: auto;
}
h3 {
  font-size: 1.3rem;
  text-align: center;
  padding-top: 5%;
  padding-bottom: 8px;
  text-transform: capitalize;
  margin: 0px auto 20px;
  border-bottom: 1px solid lightgray;
}
.pageNav nav {
  display: inline-block;
  margin: 10px auto 0px;
}
.pageNav .page-link {
  padding: .15rem .45rem;
  cursor: pointer;
}
.page-item.active .page-link {
  background-color: #343a40 !important;
  border-color: #343a40 !important;
  color: white;
}
</style>
