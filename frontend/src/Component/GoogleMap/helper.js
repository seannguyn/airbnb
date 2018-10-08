import axios from 'axios';

export function addPlaceMaker(AllHostingList) {
  const places = []
  for (let i = 0; i < AllHostingList.length; i++) {
    const accommodation = AllHostingList[i].accommodation
    axios.get(`/accommodation/${accommodation}/`).then(response => {
      const info = {
        id: response.data.id,
        lat: response.data.latitude,
        lng: response.data.longitude,
        price: AllHostingList[i].price,
        name: response.data.title,
        description: response.data.description,
        address: response.data.address
      }
      places.push(info)
    })
  }
  return places
}
