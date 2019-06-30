/**
 * This is related to fetching the 'liked' status from the localStorage to the page
 * It will process, when
 * 1) a user close the browser and reopen it
 * 2) a user have a new search
 *
 * @type {{methods: {like(*): void, updateFavInHeader(*=): void, updateFavourites(): void, updateFavInMainSection(*=): void}}}
 * @author Di Mo(luckydmcareer@gmail.com)
 * @version 1.0
 */
export const lazyloadFavoritesMixin = {
  methods: {
    like (classList) {
      classList.remove('far')
      classList.add('fas')
      classList.add('red')
    },
    updateFavourites () {
      let storage = localStorage.getItem('iTunesFavouritesListDM')
      this.updateFavInHeader(storage)
      this.updateFavInMainSection(storage)
    },
    updateFavInHeader (storage) {
      if (storage != null && storage.length) {
        this.$store.commit('updateFavourites', {favouritesList: JSON.parse(storage)})
      }
    },
    updateFavInMainSection (storage) {
      if (storage != null && storage.length) {
        let arr = Object.keys(JSON.parse(storage))
        document.querySelectorAll('.itemDiv').forEach((node) => {
          if (arr.includes(node.id)) {
            let targetNodeList = node.querySelector('.like').classList
            this.like(targetNodeList)
          }
        })
      }
    }
  }
}
