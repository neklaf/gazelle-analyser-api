// Calculating date of latest scheduled update.
function hoursToQuery() {
  let hoursToQuery = 24;
  let date = new Date();
  // If today is Sunday
  if (date.getDay() === 0) {
    hoursToQuery = 48;
  } else {
    // If today is Monday
    if (date.getDay() === 1) {
      hoursToQuery = 72;
    }
  }
  return hoursToQuery;
}

module.exports = {
  hoursToQuery
};
