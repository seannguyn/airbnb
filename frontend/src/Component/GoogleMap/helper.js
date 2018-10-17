export function addPlaceMaker(AllHostingList, HouseList) {
  const places = []
  for (let i = 0; i < AllHostingList.length; i++) {
    const accommodation = AllHostingList[i].accommodation
    for (let j = 0; j < HouseList.length; j++) {
      if (HouseList[j].id === accommodation) {
        const info = {
          id: HouseList[j].id,
          lat: HouseList[j].latitude,
          lng: HouseList[j].longitude,
          price: AllHostingList[i].price,
          name: HouseList[j].title,
          description: HouseList[j].description,
          address: HouseList[j].address,
          Accomodation_Type: HouseList[j].Accomodation_Type
        }
        places.push(info)
      }
    }
  }
  return places
}
