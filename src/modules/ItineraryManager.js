const remoteURL = " http://localhost:8088"

export default {
  get(id) {
    return fetch(`${remoteURL}/itineraries/${id}`).then(result => result.json())
  },
  getAll(userId) {
    return fetch(`${remoteURL}/itineraries?userId=${userId}`).then(result => result.json())
  },
  getWithCountries(countrycode) {
    return fetch(`${remoteURL}/${countrycode}?_embed=countries`)
            .then(result => result.json())
  },
  delete(id) {
    return fetch(`${remoteURL}/itineraries/${id}`, {
        method: "DELETE"
    })
    .then(result => result.json())
  },
  post(newItinerary) {
    return fetch(`${remoteURL}/itineraries`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newItinerary)
    }).then(data => data.json())
  },
  update( editedItineraryId, editedItinerary) {
    return fetch(`${remoteURL}/itineraries/${editedItineraryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedItinerary)
    }).then(data => data.json());
  }
}