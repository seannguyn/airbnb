import moment from "moment"

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

export function enumerateDaysBetweenDates(startDate, endDate) {
  var dates = ""

  var currDate = moment(startDate)
  var lastDate = moment(endDate)

  dates = dates.concat(moment(currDate).format("YYYY-MM-DD"), ",")

  while (currDate.add(1, "days").diff(lastDate) < 0) {
    let tempDate = moment(currDate).format("YYYY-MM-DD")
    dates = dates.concat(tempDate, ",")
  }

  dates = dates.concat(moment(lastDate).format("YYYY-MM-DD"), ",")

  return dates
}

export function removeString(period_1, start, end) {
  const period_2 = enumerateDaysBetweenDates(start, end)

  const ret = period_1.replace(period_2, "")

  return ret
}

export function concatString(dates, string) {
  const ret = dates.concat(string)
  return ret
}

export function findDateRange(startDate, endDate) {
  var string = ""

  let tempStartDate = moment(startDate).format("YYYY-MM-DD")
  let tempEndDate = moment(endDate).format("YYYY-MM-DD")

  const startM = monthNames[new Date(tempStartDate).getMonth()]
  const endM = monthNames[new Date(tempEndDate).getMonth()]

  const startD = new Date(tempStartDate).getDate()
  const endD = new Date(tempEndDate).getDate()

  if (startM === endM) {
    string = string.concat(startM, " ", startD, " - ", endD)
    console.log(string, "findDateRange")
  } else {
    string = string.concat(startM, " ", startD, " - ", endM, " ", endD)
    console.log(string, "findDateRange")
  }

  return string
}

export function yyyymmdd(x) {
  var y = x.getFullYear().toString()
  var m = (x.getMonth() + 1).toString()
  var d = x.getDate().toString()
  d.length === 1 && (d = "0" + d)
  m.length === 1 && (m = "0" + m)
  var yyyymmdd = y.concat("-", m, "-", d)
  return yyyymmdd
}
