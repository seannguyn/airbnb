export default function starCalculator(reviews) {
  let avgRating = 0

  for (let key in reviews) {
    if (reviews.hasOwnProperty(key)) {
      avgRating = avgRating + reviews[key].star
    }
  }
  return avgRating / reviews.length
}
