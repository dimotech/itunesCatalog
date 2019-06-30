/**
 * This is related to a 'heart' icon is 'clicked'
 *
 * @type {{data(): *, methods: {addShakeEffect(): void, toggleFavourites(*, *): void, like(*): void, updateIconGlobal(*, *=): void, toggleIcon(*=, *=): void, unlike(*): void}}}
 * @author Di Mo(luckydmcareer@gmail.com)
 * @version 1.0
 */
export const favouritesMixin = {
  data () {
    return {
      itemDetails: {
        id: this.item['id'],
        url: this.item['url'],
        artwork: this.item['artwork'],
        name: this.item['name'],
        genre: this.item['genre']
      }
    }
  },
  methods: {
    toggleFavourites (obj, event) {
      // "like" button is clicked and saved this item into localStorage
      let id = obj.id
      let storage = localStorage.getItem('iTunesFavouritesListDM')
      let tmp
      if (storage != null) {
        tmp = JSON.parse(storage)
        if (tmp[id]) {
          delete tmp[id]
        } else {
          tmp[id] = obj
        }
      } else {
        tmp = {}
        tmp[id] = obj
      }
      let payload = {favouritesList: tmp}
      this.$store.commit('updateFavourites', payload)
      localStorage.setItem('iTunesFavouritesListDM', JSON.stringify(tmp))
      // if 'liked', then "like" button updated to "liked"
      this.toggleIcon(event.target, payload.favouritesList)
    },
    like (classList) {
      // if 'liked', update to red heart
      classList.remove('far')
      classList.add('fas')
      classList.add('red')
    },
    unlike (classList) {
      // if unlike 'liked', update to gray empty heart
      classList.remove('fas')
      classList.remove('red')
      classList.add('far')
    },
    toggleIcon (target, data) {
      // when 'heart' icon is clicked, toggle button css
      // update this new entity status across the site
      if (target.classList.contains('far')) {
        this.like(target.classList)
      } else {
        this.unlike(target.classList)
      }
      this.updateIconGlobal(target, data)
      this.addShakeEffect()
    },
    addShakeEffect () {
      // give an effect to let user know the action is being processed
      document.getElementById('favBtn').classList.add('wiggle')
      setTimeout(() => {
        document.getElementById('favBtn').classList.remove('wiggle')
      }, 1000)
    },
    updateIconGlobal (target, data) {
      // case 1. when the page refresh, the favourite item should be marked as like
      // case 2. when the item is "unmark" in the favourite list, it should update the item in main section
      let arr = Object.keys(data)
      if (target.parentNode.classList.contains('itemDiv')) {
        document.querySelectorAll('.itemDiv').forEach((node) => {
          if (arr.includes(node.id)) {
            let targetNodeList = node.querySelector('.like').classList
            this.like(targetNodeList)
          }
        })
      } else {
        document.querySelectorAll('.itemDiv').forEach((node) => {
          if (!arr.includes(node.id)) {
            let targetNodeList = node.querySelector('.like').classList
            this.unlike(targetNodeList)
          }
        })
      }
    }
  }
}
