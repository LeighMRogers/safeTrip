const remoteURL = " http://localhost:8088"

export default {
    delete(id) {
        return fetch(`${remoteURL}/${id}`, {
            method: "DELETE"
        })
        .then(result => result.json())
      },
    post(newCountry) {
        return fetch(`${remoteURL}/itineraryCountries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCountry)
        }).then(data => data.json())
    },
    getRelated(id) {
        console.log("itineary country Id", id)
        return fetch(`${remoteURL}/itineraryCountries?itineraryId=${id}`)
        .then(data => data.json())
    },
    update(id, editedItinerary) {
        console.log("edited itinerary", editedItinerary)
        return fetch(`${remoteURL}/itineraryCountries/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedItinerary)
        }).then(data => data.json());
    }
      // there is no edit because data is coming from the API
}