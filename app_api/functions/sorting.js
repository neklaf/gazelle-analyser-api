// Sorting by date asc
function sortCloseTimeAsc(a, b) {
  return new Date(a.closeTime).getTime() - new Date(b.closeTime).getTime();
}

// Sorting by date asc
function sortDateAscending(a, b) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

// Sorting by date desc
function sortDateDescending(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

// Sorting by _id asc
function sortIdAscending(a, b) {
  return (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0);
}

// Sorting by _id desc
function sortIdDescending(a, b) {
  return (b._id > a._id) ? 1 : ((a._id > b._id) ? -1 : 0);
}

// Sorting by rating asc
function sortRatingDesc(a,b) {
  return parseFloat(b.rating) - parseFloat(a.rating);
}

// Sorting by rating desc
function sortRatingAsc(a,b) {
  return parseFloat(a.rating) - parseFloat(b.rating);
}

module.exports = {
  sortCloseTimeAsc,
  sortDateAscending,
  sortDateDescending,
  sortIdAscending,
  sortIdDescending,
  sortRatingAsc,
  sortRatingDesc
};
