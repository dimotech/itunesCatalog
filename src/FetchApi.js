/**
 * This is a customized API call to fetch data iTunes.com
 * Basically it will take two parameters from outside to do the API call
 * 1) term
 * 2）limit
 * After getting the response back, this API call will process the response data into "kind" based object as follows,
 * {
 * 'song': [{
 *    id: Integer, // trackId (ID of entity)
 *    name: String, // name of entity
 *    artwork: String, // URL of the artwork
 *    genre: String, // Genre of entity
 *    url: String // trackViewUrl
 *  },
 *  ...
 *  ]
 * }
 *
 * @class {FetchApi}
 * @author Di Mo(luckydmcareer@gmail.com)
 * @version 1.0
 */
export const FetchApi = class {
  constructor (axiosInstance) {
    this.axiosInstance = axiosInstance
    this.term = 'popular' // term set by default 'popular'
    this.limit = 50 // limit set by default 'limit'
  }
  get termGetter () {
    return this.term
  }
  get limitGetter () {
    return this.limit
  }
  set termSetter (term) {
    let temp = term
    if (!this.termIsValid(term)) {
      temp = 'popular'
    }
    this.term = temp
  }
  set limitSetter (limit) {
    let temp = limit
    if (!this.limitIsValid(limit)) {
      temp = 50
    }
    this.limit = temp
  }
  termIsValid (term) {
    return term !== ''
  }
  limitIsValid (limit) {
    return Number.isInteger(limit)
  }
  apiRootPath () {
    return '/api/search'
  }
  apiFullPath () {
    return `${this.apiRootPath()}?term=${this.termGetter}&limit=${this.limitGetter}`
  }
  process (data) {
    // process the original response data into required format
    return data.reduce((acc, cur) => {
      if (cur.kind !== undefined) {
        if (acc[cur.kind] !== undefined) {
          let obj = {
            id: cur['trackId'],
            name: cur['trackName'],
            artwork: cur['artworkUrl100'],
            genre: cur['primaryGenreName'],
            url: cur['trackViewUrl']
          }
          acc[cur.kind].push(obj)
        } else {
          acc[cur.kind] = []
        }
      }
      return acc
    }, {})
  }
  fetch () {
    // main api, it will be called when the page loads and user does a search
    let data = this.axiosInstance.get(this.apiFullPath())
      .then(res => res['data'])
      .then(res => {
        let formattedData = this.process(res['results'])
        return formattedData
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .finally(function () {
        // always executed
      })
    return data
  }
}
