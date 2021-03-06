const remoteURL = "https://www.travel-advisory.info/api"

export default {
  getCountry(countryCode) {
    return fetch(`${remoteURL}?countrycode=${countryCode}`).then(result => result.json())
  },
  getAllCountries() {
    return fetch(`${remoteURL}`).then(result => result.json())
  },
}