import moment from 'moment';

export function enumerateDaysBetweenDates (startDate, endDate) {
    var dates = "";

    var currDate = moment(startDate)
    var lastDate = moment(endDate)

    dates = dates.concat(moment(currDate).format('YYYY-MM-DD'),",")

    while(currDate.add(1, 'days').diff(lastDate) < 0) {
        let tempDate = moment(currDate).format('YYYY-MM-DD');
        dates = dates.concat(tempDate,",")
    }


    dates = dates.concat(moment(lastDate).format('YYYY-MM-DD'),",")

    return dates;
};

export function removeString(period_1,start,end) {

  const period_2 = enumerateDaysBetweenDates(start,end);

   const ret = period_1.replace(period_2,'');

   return ret;
}

export function concatString(dates, string) {
  const ret = dates.concat(string)
  return ret;
}
