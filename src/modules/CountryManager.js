const remoteURL = "https://www.travel-advisory.info/api"

export default {
  getCountry(countryCode) {
    return fetch(`${remoteURL}?countrycode=${countryCode}`).then(result => result.json())
  },
  getAllCountries(countrycode) {
    return fetch(`${remoteURL}/${countrycode}`).then(result => result.json())
  },
  delete(id) {
    return fetch(`${{remoteURL}}/${id}`, {
        method: "DELETE"
    })
    .then(result => result.json())
  },
  post(newCountry) {
    return fetch(`${remoteURL}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCountry)
    }).then(data => data.json())
  },
  findCountry(countrycode) {
    return fetch(`${remoteURL}/?countrycode=${countrycode}`).then(result => result.json())
  }
  // there is no edit because data is coming from the API
}